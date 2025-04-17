import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, FileText, Paperclip, X, LogOut } from "lucide-react";

const UserDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [laporanList, setLaporanList] = useState(() => {
    const saved = localStorage.getItem("laporanList");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    judul: "",
    kategori: "",
    deskripsi: "",
    lampiran: null,
  });

  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    localStorage.setItem("laporanList", JSON.stringify(laporanList));
  }, [laporanList]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "lampiran") {
      setFormData({ ...formData, lampiran: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLaporan = {
      ...formData,
      tanggal: new Date().toLocaleString(),
      status: "Dikirim",
      statusUpdatedAt: new Date().toLocaleString(),
      id: Date.now(),
    };
    setLaporanList([newLaporan, ...laporanList]);
    setFormData({ judul: "", kategori: "", deskripsi: "", lampiran: null });
    setShowForm(false);
    alert("Laporan berhasil dikirim!");
  };

  const handleApprove = () => {
    const updated = laporanList.map((item) =>
      item.id === reviewData.id
        ? { ...item, status: "Disetujui", statusUpdatedAt: new Date().toLocaleString() }
        : item
    );
    setLaporanList(updated);
    setReviewData(null);
  };

  const handleReject = () => {
    const updated = laporanList.map((item) =>
      item.id === reviewData.id
        ? { ...item, status: "Ditolak", statusUpdatedAt: new Date().toLocaleString() }
        : item
    );
    setLaporanList(updated);
    setReviewData(null);
  };

  const handleLogout = () => {
    alert("Logout berhasil!");
    // Tambahkan logika logout asli jika diperlukan
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-red-700 flex items-center gap-2">
          <FileText size={24} /> Dashboard Pengguna
        </h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow transition"
          >
            <Plus size={18} /> Request
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      {/* Formulir */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl mx-4 relative"
            >

              <div className="space-y-4">
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleInputChange}
                  required
                  placeholder="Judul"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                />

                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  required
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                >
                  <option value="">-- Pilih Kategori --</option>
                  <option value="Kerusakan">Kerusakan</option>
                  <option value="Kehilangan">Kehilangan</option>
                  <option value="Permintaan Barang">Permintaan Barang</option>
                </select>

                <textarea
                  name="deskripsi"
                  rows="4"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  required
                  placeholder="Deskripsi"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                />

                <input
                  type="file"
                  name="lampiran"
                  onChange={handleInputChange}
                  className="w-full"
                />

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-sm"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    Kirim
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="absolute top-3 right-4 text-gray-400 hover:text-red-600 text-xl"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabel Histori */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">History</h2>
        {laporanList.length === 0 ? (
          <p className="text-gray-500">Belum ada Request yang dibuat.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-red-700 text-white">
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Judul</th>
                  <th className="px-4 py-2">Kategori</th>
                  <th className="px-4 py-2">Tanggal Dibuat</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {laporanList.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{item.judul}</td>
                    <td className="px-4 py-2">{item.kategori}</td>
                    <td className="px-4 py-2">{item.tanggal}</td>
                    <td className="px-4 py-2">
                      {item.status}
                      <br />
                      <span className="text-xs text-gray-500">{item.statusUpdatedAt}</span>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => setReviewData(item)}
                        className="text-sm bg-gray-700 text-white px-3 py-1 rounded"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Review Modal */}
      <AnimatePresence>
        {reviewData && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg mx-4 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800">Detail</h2>
              <p><strong>Judul:</strong> {reviewData.judul}</p>
              <p><strong>Kategori:</strong> {reviewData.kategori}</p>
              <p><strong>Deskripsi:</strong> {reviewData.deskripsi}</p>
              <p><strong>Tanggal Dibuat:</strong> {reviewData.tanggal}</p>
              <p><strong>Status:</strong> {reviewData.status} {reviewData.statusUpdatedAt}</p>
              {reviewData.lampiran && (
                <p className="mt-2 flex items-center gap-2">
                  <Paperclip size={16} />{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    {reviewData.lampiran.name}
                  </span>
                </p>
              )}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Batal
                </button>
                <button
                  onClick={handleApprove}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Setuju
                </button>
              </div>
              <button
                onClick={() => setReviewData(null)}
                className="absolute top-3 right-4 text-gray-400 hover:text-red-600"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDashboard;
