"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";

export default function AddDocumentModal({ isOpen, onClose, onSuccess }) {
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef(null);

 
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  
  useEffect(() => {
    if (!isOpen) return;
    const onClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isOpen, onClose]);

 
  const handleFileChange = (e) => {
    setError("");
    const f = e.target.files[0];
    if (!f) return setFile(null);

    const allowed = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
    if (!allowed.includes(f.type)) {
      setError("Allowed types: PDF, PNG, JPG.");
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      setError("File must be smaller than 8MB.");
      return;
    }
    setFile(f);
  };

  const resetForm = () => {
    setTitle("");
    setEmployeeId("");
    setFile(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) return setError("Title is required.");
    if (!file) return setError("Please choose a file.");
    if (!employeeId.trim()) return setError("Employee ID is required.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("document", file);
    formData.append("employee_id", employeeId);

    try {
      setIsSubmitting(true);

      const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/documents`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || `Request failed with status ${res.status}`);
      }

      resetForm();
      onClose();
      if (typeof onSuccess === "function") onSuccess();
    } catch (err) {
      console.error("Add document error:", err);
      setError(err.message || "Failed to add document.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" />

      <div
        ref={modalRef}
        className="relative z-50 w-full max-w-md mx-4 bg-white rounded-lg shadow-lg"
        role="dialog"
        aria-modal="true"
      >
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Add Document</h3>
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#B79031]"
                placeholder="Enter document title"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Employee ID</span>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#B79031]"
                placeholder="EMP00012 or employee id"
              />
              <p className="text-xs text-gray-400 mt-1">اكتبي ID الموظف المرتبط بالمستند</p>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Document</span>
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-700"
              />
              <p className="text-xs text-gray-400 mt-1">PDF أو صورة (max 8MB)</p>
            </label>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 rounded bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded bg-[#B79031] text-white text-sm hover:bg-[#a07f2d] disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
