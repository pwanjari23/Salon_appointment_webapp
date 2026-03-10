const axios = require("axios");
const Payment = require("../models/Payment");
const generateInvoice = require("../services/invoiceService");
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Service = require("../models/Service");
require("dotenv").config();

exports.createOrder = async (req, res) => {
  try {
    const { appointmentId, amount, email, phone } = req.body;

    const orderId = "order_" + Date.now();

    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/orders",
      {
        order_id: orderId,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: "cust_" + appointmentId,
          customer_email: email,
          customer_phone: phone,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2022-09-01",
        },
      },
    );

    await Payment.create({
      appointmentId,
      amount,
      orderId,
      status: "pending",
    });

    res.status(200).json({
      orderId: orderId,
      paymentSessionId: response.data.payment_session_id,
    });
  } catch (error) {
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const response = await axios.get(
      `https://sandbox.cashfree.com/pg/orders/${orderId}`,
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2022-09-01",
        },
      },
    );

    const orderStatus = response.data.order_status;

    const payment = await Payment.findOne({ where: { orderId } });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.status === "paid") {
      return res.json({
        message: "Payment already verified",
      });
    }

    if (orderStatus !== "PAID") {
      return res.json({
        message: "Payment not completed",
        status: orderStatus,
      });
    }

    const appointment = await Appointment.findByPk(payment.appointmentId, {
      include: [User, Service],
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const user = appointment.User;
    const service = appointment.Service;

    payment.status = "paid";
    await payment.save();

    appointment.status = "confirmed";
    await appointment.save();

    const invoicePath = generateInvoice(appointment, user, service);

    return res.json({
      message: "Payment verified, appointment confirmed, invoice generated",
      invoicePath,
    });
  } catch (error) {
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
};
