import React, { useState } from "react";
import logo from "../assets/logo.png";

const initialRequests = [
  {
    id: 1,
    title: "Perbaikan AC",
    createdBy: "Alul",
    tanggal: "2025-04-15",
    kategori: "Kerusakan",
    deskripsi: "AC di ruang kelas tidak dingin.",
    lampiran: "lampiran-ac.pdf",
    status: "Request Dibuat",
    assignedTo: null,
  },
  {
    id: 2,
    title: "Ganti Lampu",
    createdBy: "Gilang",
    tanggal: "2025-04-14",
    kategori: "Permintaan Barang",
    deskripsi: "Lampu aula mati total.",
    lampiran: "lampiran-lampu.jpg",
    status: "Request Dibuat",
    assignedTo: null,
  },
];

const AdminDashboard = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedTab, setSelectedTab] = useState("Semua");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [assignMode, setAssignMode] = useState(false);
  const [selectedAnggota, setSelectedAnggota] = useState("");

  const anggotaList = ["Putri", "Wawa", "Dhita"];

  const filteredRequests = requests.filter((req) => {
    if (selectedTab === "Semua") return true;
    if (selectedTab === "Dibuat") return req.status === "Request Dibuat";
    if (selectedTab === "Progres") return req.status === "On Progress";
    if (selectedTab === "Selesai") return req.status === "Selesai";
    return true;
  });

  const handleKirim = () => {
    setAssignMode(true);
  };

  const handleAssign = () => {
    const updatedRequests = requests.map((req) =>
      req.id === selectedRequest.id
        ? { ...req, status: "On Progress", assignedTo: selectedAnggota }
        : req
    );
    setRequests(updatedRequests);
    setSelectedRequest(null);
    setAssignMode(false);
    setSelectedAnggota("");
  };

  const handleSelesai = (reqId) => {
    const updatedRequests = requests.map((req) =>
      req.id === reqId ? { ...req, status: "Selesai" } : req
    );
    setRequests(updatedRequests);
    setSelectedRequest(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="w-full flex justify-between items-center mb-6 p-4 bg-white shadow-md rounded">
        <img src={logo} alt="logo" className="h-8" />
      </header>

      {/* Tabs */}
      <div className="mb-4 flex space-x-3">
        {["Semua", "Dibuat", "Progres", "Selesai"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedTab === tab
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Header */}
      <div className="bg-red-600 text-white rounded-t-lg p-4 font-semibold grid grid-cols-5 gap-4">
        <div>No.</div>
        <div>Judul Request</div>
        <div>Dibuat Oleh</div>
        <div>Status</div>
        <div>Aksi</div>
      </div>

      {/* Requests */}
      <div className="bg-white divide-y divide-gray-200 rounded-b-lg">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req, index) => (
            <div key={req.id} className="grid grid-cols-5 gap-4 items-center p-4 text-sm">
              <div>{index + 1}</div>
              <div>{req.title}</div>
              <div>{req.createdBy}</div>
              <div>
                <span className="border border-gray-500 px-3 py-1 rounded-full text-xs">
                  {req.status}
                </span>
              </div>
              <div>
                <button
                  className="bg-gray-800 text-white text-xs px-3 py-1 rounded"
                  onClick={() => {
                    setSelectedRequest(req);
                    setAssignMode(false);
                    setSelectedAnggota("");
                  }}
                >
                  Detail
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-gray-500 text-sm">Tidak ada request.</div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl relative">
            <button
              onClick={() => setSelectedRequest(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-lg"
            >
              ×
            </button>

            {!assignMode ? (
              <>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Detail Request
                </h2>
                <div className="space-y-2 text-sm">
                  <p><strong>Judul:</strong> {selectedRequest.title}</p>
                  <p><strong>Dibuat Oleh:</strong> {selectedRequest.createdBy}</p>
                  <p><strong>Tanggal:</strong> {selectedRequest.tanggal}</p>
                  <p><strong>Kategori:</strong> {selectedRequest.kategori}</p>
                  <p><strong>Deskripsi:</strong> {selectedRequest.deskripsi}</p>
                  <p><strong>Lampiran:</strong> {selectedRequest.lampiran}</p>
                  <p><strong>Status:</strong> {selectedRequest.status}</p>
                  {selectedRequest.assignedTo && (
                    <p><strong>Ditugaskan ke:</strong> {selectedRequest.assignedTo}</p>
                  )}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  {selectedRequest.status === "Request Dibuat" && (
                    <>
                      <button
                        onClick={() => setSelectedRequest(null)}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-sm"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleKirim}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                      >
                        Kirim
                      </button>
                    </>
                  )}

                  {selectedRequest.status === "On Progress" && (
                    <button
                      onClick={() => handleSelesai(selectedRequest.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                    >
                      Tandai Selesai
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Pilih Anggota
                </h2>
                <select
                  value={selectedAnggota}
                  onChange={(e) => setSelectedAnggota(e.target.value)}
                  className="w-full border px-3 py-2 rounded mb-4"
                >
                  <option value="">-- Pilih Anggota --</option>
                  {anggotaList.map((anggota) => (
                    <option key={anggota} value={anggota}>
                      {anggota}
                    </option>
                  ))}
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setAssignMode(false)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-sm"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleAssign}
                    disabled={!selectedAnggota}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                  >
                    Tugaskan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
