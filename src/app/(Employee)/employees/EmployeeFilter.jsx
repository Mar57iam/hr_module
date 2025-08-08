'use client';

import { IoMdSearch, IoMdCloudUpload, IoMdDownload } from "react-icons/io";
import Link from "next/link";
import React, { useState } from 'react';
import { exportToCSV } from "@/utils/csv";

export default function EmployeeFilter({ onFilterChange, data, cols }) {
  const [filters, setFilters] = useState({
    status: '',
    department: '',
    position: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value.toLowerCase() };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      status: '',
      department: '',
      position: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const handleImport = () => {
    alert("Import clicked");
  };

  const handleExport = () => {
    exportToCSV(data, cols)
    alert("Employee Data Exported")
  };

  return (
    <div className="bg-white mt-3.5 flex flex-col justify-center w-full max-w-[99%] mb-6 p-4">
      <div className="relative flex flex-col md:flex-row md:items-center gap-2 mt-2 w-full">

        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="w-full md:w-52 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          name="department"
          value={filters.department}
          onChange={handleChange}
          className="w-full md:w-52 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
        >
          <option value="">All Departments</option>
          <option value="HR">HR</option>
          <option value="It">Engineering</option>
        </select>

        <select
          name="position"
          value={filters.position}
          onChange={handleChange}
          className="w-full md:w-52 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
        >
          <option value="">All Positions</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
        </select>

        <button
          onClick={handleReset}
          className="px-6 py-2 ml-0 md:ml-1.5 rounded-lg bg-[#B79031] text-white hover:bg-[#b79039] text-sm w-fit whitespace-nowrap cursor-pointer"
        >
          Reset Filters
        </button>

        <div className="flex justify-end mt-2 w-full">
          <div className="flex w-full md:w-auto">
            <input
              type="search"
              placeholder="Search by name"
              className="h-10 w-full md:w-[350px] px-4 pe-2 text-sm text-gray-900 border border-gray-300 rounded-s-lg bg-white focus:outline-none"
            />
            <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-e-lg border border-l-0 border-gray-300 bg-[#B79031] text-white text-sm hover:bg-[#a07f2d] transition-colors duration-300 cursor-pointer">
              Search
              <IoMdSearch />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-end md:flex-row flex-wrap items-center gap-3 mt-4">
        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={handleImport}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-800 hover:bg-[#B79031] hover:text-white transition-colors duration-300 w-full md:w-auto cursor-pointer"
          >
            <IoMdCloudUpload className="text-lg" />
            Import
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-800 hover:bg-[#B79031] hover:text-white transition-colors duration-300 w-full md:w-auto cursor-pointer"
          >
            <IoMdDownload className="text-lg" />
            Export
          </button>

          <Link
            href="/addEm"
            className="px-4 py-2 rounded-md border bg-[#B79031] border-gray-200 text-white hover:bg-[#B79031] hover:text-white transition-colors duration-300 w-full md:w-auto text-center"
          >
            Add Employee
          </Link>
        </div>
      </div>
    </div>
  );
}
