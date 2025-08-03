'use client';

import React, { useState } from 'react';
import { FiCheck, FiX, FiMessageSquare } from 'react-icons/fi';

export default function PendingLeavves() {
  // بيانات تجريبية فقط للـ UI
  const [requests, setRequests] = useState([
    {
      id: 1,
      employeeName: 'Ahmed Mohamed',
      leaveType: 'Sick Leave',
      startDate: '2024-08-01',
      endDate: '2024-08-03',
      status: 'Pending',
      rejectReason: '',
      showReasonInput: false,
    },
    {
      id: 2,
      employeeName: 'Sara Ali',
      leaveType: 'Vacation',
      startDate: '2024-08-10',
      endDate: '2024-08-15',
      status: 'Pending',
      rejectReason: '',
      showReasonInput: false,
    },
  ]);

  const handleApprove = (id) => {
    setRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status: 'Approved' } : req)
    );
  };

  const handleShowReject = (id) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, showReasonInput: true } : req
      )
    );
  };

  const handleReject = (id) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: 'Rejected', showReasonInput: false } : req
      )
    );
  };

  const handleReasonChange = (id, value) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, rejectReason: value } : req
      )
    );
  };

  return (
    <section className="min-h-screen  flex flex-col px-4 pt-10 md:ml-[280px]">
      <div className="md:ml-30 md:mb-12">
        <h1 className="text-3xl font-bold text-gray-700">Pending Leave Requests</h1>
      </div>

      <div className="overflow-x-auto w-full max-w-6xl mx-auto bg-white shadow-md rounded-xl">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600  text-xs">
            <tr>
              <th className="px-6 py-3">Employee</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">Start Date</th>
              <th className="px-6 py-3">End Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id} className=" hover:bg-gray-50">
                <td className="px-6 py-4">{request.employeeName}</td>
                <td className="px-6 py-4">{request.leaveType}</td>
                <td className="px-6 py-4">{request.startDate}</td>
                <td className="px-6 py-4">{request.endDate}</td>
                <td className="px-6 py-4 font-semibold">{request.status}</td>
                <td className="px-6 py-4 flex flex-col gap-2">
                  {request.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="flex items-center gap-1 text-green-600 hover:underline"
                      >
                        <FiCheck /> Approve
                      </button>
                      <button
                        onClick={() => handleShowReject(request.id)}
                        className="flex items-center gap-1 text-red-600 hover:underline"
                      >
                        <FiX /> Reject
                      </button>
                      {request.showReasonInput && (
                        <div className="mt-2 flex flex-col gap-2">
                          <textarea
                            value={request.rejectReason}
                            onChange={(e) => handleReasonChange(request.id, e.target.value)}
                            placeholder="Enter rejection reason..."
                            className="border border-gray-300 rounded-lg p-2 text-sm"
                          />
                          <button
                            onClick={() => handleReject(request.id)}
                            className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 w-fit"
                          >
                            Confirm Reject
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  {request.status !== 'Pending' && (
                    <span className="text-xs text-gray-500">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
