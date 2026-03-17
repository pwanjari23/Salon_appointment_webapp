import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Scissors,
  Plus,
  Search,
  Trash2,
  Edit3,
  Menu,
  X,
  ChevronRight,
  Bell,
} from "lucide-react";

import {
  getAppointments,
  cancelAppointment,
  confirmAppointment,
  getServices,
  createService,
  updateService,
  deleteService,
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../api/adminApi";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);

  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [stats, setStats] = useState({
    appointments: 0,
    services: 0,
    staff: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const menuItems = [
    { id: "appointments", icon: Calendar, label: "Appointments" },
    { id: "services", icon: Scissors, label: "Services" },
    { id: "staff", icon: Users, label: "Staff" },
  ];

  /* FETCH DATA */

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const appointmentRes = await getAppointments();
      const serviceRes = await getServices();
      const staffRes = await getStaff();

      setAppointments(appointmentRes.data);
      setServices(serviceRes.data);
      setStaff(staffRes.data);

      setStats({
        appointments: appointmentRes.data.length,
        services: serviceRes.data.length,
        staff: staffRes.data.length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelAppointment = async (id) => {
    try {
      await cancelAppointment(id);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (activeTab === "services") {
        const payload = {
          name: formData.name,
          description: formData.description,
          duration: Number(formData.duration),
          price: Number(formData.price),
        };

        console.log("Service Payload:", payload);

        if (editingId) {
          await updateService(editingId, payload);
        } else {
          await createService(payload);
        }
      }

      if (activeTab === "staff") {
        const payload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          specialization: formData.specialization,
        };

        if (editingId) {
          await updateStaff(editingId, payload);
        } else {
          await createStaff(payload);
        }
      }

      setEditingId(null);
      setFormData({});
      fetchData();
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
    }
  };

  /* DELETE */

  const handleDelete = async (id) => {
    try {
      if (activeTab === "services") {
        await deleteService(id);
      }

      if (activeTab === "staff") {
        await deleteStaff(id);
      }

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  /* EDIT */

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
  };

  /* SIDEBAR */

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-extrabold ">FYNA</h1>
          <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] mt-1">
            Professional Admin
          </p>
        </div>

        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden text-stone-400"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="space-y-1.5 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all ${
              activeTab === item.id
                ? "bg-rose-50 text-amber-800"
                : "text-stone-500 hover:bg-stone-50"
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  const data =
    activeTab === "appointments"
      ? appointments
      : activeTab === "services"
        ? services
        : staff;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentData = data.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-900 font-sans">
      {/* SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 w-64 hidden lg:block border-r">
        <SidebarContent />
      </aside>

      {/* MAIN */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* HEADER */}
        <header className="sticky top-0 bg-white border-b px-8 py-4 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center space-x-4">
            <Bell size={20} />

            <button
              onClick={() => {
                setEditingId(null);
                setFormData({});
                setShowModal(true);
              }}
              className="flex items-center space-x-2 bg-amber-900 text-white px-6 py-2 rounded-full"
            >
              <Plus size={18} />
              <span>Add {activeTab.slice(0, -1)}</span>
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-8 max-w-7xl mx-auto w-full">
          <h2 className="text-3xl font-bold capitalize mb-8">{activeTab}</h2>

          <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
            <div className="divide-y divide-stone-50">
              {currentData.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-4 items-center px-6 py-5 hover:bg-stone-50"
                >
                  {/* DETAILS */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 overflow-hidden">
                      <img
                        src={`https://i.pravatar.cc/150?u=${item.id}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="font-bold text-sm">
                        {activeTab === "staff"
                          ? `${item.name} - ${item.specialization}`
                          : item.User?.name || item.name}
                      </p>
                      <p className="text-xs">
                        {activeTab === "staff"
                          ? `${item.phone} - ${item.email}`
                          : item.User?.name || item.name}
                      </p>

                      <p className="text-xs text-stone-400">
                        {item.User?.email || item.time}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block text-sm text-stone-500">
                    {item.description || "-"}
                  </div>

                  <div className="flex items-center gap-3">
                    {activeTab === "appointments" && (
                      <>
                        {item.status !== "cancelled" && (
                          <button
                            onClick={() => handleCancelAppointment(item.id)}
                            className="px-3 py-1 text-xs rounded-full bg-red-50 text-amber-900 hover:bg-red-100"
                          >
                            Cancel
                          </button>
                        )}

                        <span
                          className={`px-3 py-1 rounded-full text-xs
                             ${
                               item.status === "cancelled"
                                 ? "bg-red-50 text-amber-900"
                                 : item.status === "confirmed"
                                   ? "bg-emerald-50 text-emerald-600"
                                   : "bg-yellow-50 text-yellow-600"
                             }`}
                        >
                          {item.status || "pending"}
                        </span>
                        <span className="ml-auto px-3 py-1 rounded-full text-xs whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex justify-end space-x-2">
                    {(activeTab === "services" || activeTab === "staff") && (
                      <>
                        <button
                          onClick={() => {
                            handleEdit(item);
                            setShowModal(true);
                          }}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 hover:bg-red-50 rounded text-amber-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}

                    <ChevronRight size={18} className="md:hidden" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* PAGINATION */}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 py-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded
          ${currentPage === i + 1 ? "bg-amber-900 text-white" : "border"}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-3xl p-8 w-[90%] max-w-md">
            <h3 className="text-xl font-bold mb-6 capitalize">
              {editingId ? "Edit" : "Add"} {activeTab.slice(0, -1)}
            </h3>

            {/* SERVICE FORM */}

            {activeTab === "services" && (
              <div className="space-y-4">
                <input
                  placeholder="Service Name"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  placeholder="Description"
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  type="number"
                  placeholder="Duration"
                  value={formData.duration || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-xl"
                />
              </div>
            )}

            {/* STAFF FORM */}

            {activeTab === "staff" && (
              <div className="space-y-4">
                <input
                  placeholder="Name"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  placeholder="Email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  placeholder="Phone"
                  value={formData.phone || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  placeholder="Specialization"
                  value={formData.specialization || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialization: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-xl"
                />
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleSubmit();
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-amber-900 text-white rounded-xl"
              >
                {editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
