import React, { useState } from "react";
import logo from "../assets/logo.png";

const initialTasks = [
  {
    id: 1,
    title: "Perbaikan AC",
    createdBy: "Alul",
    status: "Dalam Pengerjaan",
    detail: "AC di ruang 204 tidak dingin, perlu dicek.",
    lampiran: "",
  },
  {
    id: 2,
    title: "Ganti Lampu Aula",
    createdBy: "Gilang",
    status: "Progres Diperbarui",
    detail: "Lampu aula mati 3 buah, perlu diganti.",
    lampiran: "",
  },
  {
    id: 3,
    title: "Cek Jaringan Lab",
    createdBy: "Putri",
    status: "Dalam Review",
    detail: "Jaringan di lab lemot, kemungkinan kabel bermasalah.",
    lampiran: "",
  },
];

const AnggotaDashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    createdBy: "",
    detail: "",
    lampiran: "",
    status: "",
  });

  const handleUpdateClick = (task) => {
    setSelectedTask(task);
    setEditData({
      title: task.title,
      createdBy: task.createdBy,
      detail: task.detail,
      lampiran: task.lampiran || "",
      status: task.status,
    });
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !editData.title ||
      !editData.createdBy ||
      !editData.detail ||
      !editData.status
    ) {
      alert("Semua field wajib diisi.");
      return;
    }

    // Simpan perubahan
    setTasks((prev) =>
      prev.map((t) =>
        t.id === selectedTask.id ? { ...t, ...editData } : t
      )
    );

    alert("Data berhasil diperbarui!");
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between mb-6">
        <img src={logo} alt="logo" className="h-8" />
      </header>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-red-700 text-white font-semibold text-sm p-4">
          <div>No.</div>
          <div>Judul Request</div>
          <div>Dibuat Oleh</div>
          <div>Aksi</div>
        </div>

        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`grid grid-cols-4 items-center p-4 text-sm ${
              index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
            }`}
          >
            <div>{index + 1}</div>
            <div>{task.title}</div>
            <div>{task.createdBy}</div>
            <div>
              <button
                onClick={() => handleUpdateClick(task)}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Update Form */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Update Request</h2>

            <label className="block mb-2 text-sm font-medium">Judul</label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mb-3"
            />

            <label className="block mb-2 text-sm font-medium">Dibuat Oleh</label>
            <input
              type="text"
              name="createdBy"
              value={editData.createdBy}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mb-3"
            />

            <label className="block mb-2 text-sm font-medium">Deskripsi</label>
            <textarea
              name="detail"
              rows="3"
              value={editData.detail}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mb-3"
            />

<label className="block mb-2 text-sm font-medium">Lampiran</label>
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditData({ ...editData, lampiran: imageUrl });
    }
  }}
  className="w-full border p-2 rounded mb-3"
/>

{/* Preview jika sudah upload */}
{editData.lampiran && (
  <img
    src={editData.lampiran}
    alt="Lampiran"
    className="w-32 h-32 object-cover mt-2 rounded"
  />
)}


            <label className="block mb-2 text-sm font-medium">Status</label>
            <select
              name="status"
              value={editData.status}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="Dibuat">Dibuat</option>
              <option value="On Progress">On Progress</option>
              <option value="Selesai">Selesai</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-1 border rounded"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-1 bg-red-600 text-white rounded"
              >
                Kirim ke User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnggotaDashboard;
