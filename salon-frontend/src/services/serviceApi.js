import API from "./api";

export const getServices = () => API.get("/services");

export const getStaff = () => API.get("/staff");

export const getSlots = (staffId, date) =>
  API.get(`/appointments/available-slots?staffId=${staffId}&date=${date}`);

export const bookAppointment = (data) => API.post("/appointments", data);

export const createOrder = (data) => API.post("/payments/create-order", data);

export const verifyPayment = (orderId) =>
  API.post("/payments/verify-payment", { orderId });
