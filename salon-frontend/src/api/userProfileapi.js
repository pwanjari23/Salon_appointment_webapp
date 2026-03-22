import axios from "axios";

const API = axios.create({
  baseURL: "http://3.89.139.86:5000",
});

// ✅ GET PROFILE
export const getProfile = () => {
  return API.get("/api/users/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// ✅ GET APPOINTMENTS
export const getMyAppointments = () => {
  return API.get("/api/users/appointments/my", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// ✅ UPDATE PROFILE
export const updateProfile = (data) => {
  return API.put("/api/users/profile", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const cancelAppointment = async (id) => {
  const token = localStorage.getItem("token");

  return axios.put(
    `http://3.89.139.86:5000/api/appointments/cancel/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
