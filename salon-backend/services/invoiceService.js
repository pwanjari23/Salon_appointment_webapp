const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateInvoice = (appointment, user, service) => {
  const doc = new PDFDocument();

  const fileName = `invoice_${appointment.id}.pdf`;
  const filePath = path.join(__dirname, `../invoices/${fileName}`);

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Salon Appointment Invoice", { align: "center" });

  doc.moveDown();

  doc.fontSize(14).text(`Invoice ID: ${appointment.id}`);
  doc.text(`Customer Name: ${user.name}`);
  doc.text(`Service: ${service.name}`);
  doc.text(`Price: ₹${service.price}`);
  doc.text(`Appointment Date: ${appointment.date}`);
  doc.text(`Appointment Time: ${appointment.time}`);

  doc.moveDown();

  doc.text("Thank you for choosing our salon!");

  doc.end();

  return filePath;
};

module.exports = generateInvoice;
