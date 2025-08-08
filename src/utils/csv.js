"use client";
import React from "react";

export const exportToCSV = (data, columns = null) => {
    let headers = null;
    let rows = null;
    console.log(data)
    console.log(columns)
    if (columns) {
        // Filter out columns you don’t want in CSV (e.g., Actions)
        const exportableColumns = columns.filter(col => col.key !== "actions");
        
        headers = exportableColumns.map(col => col.label);
        rows = data.map(row =>
            exportableColumns.map(col => row[col.key] ?? "")
        );
    } else {
        // Convert array of objects to CSV string
        headers = Object.keys(data[0]);
        rows = data.map(row => Object.values(row));
    }

    let csvContent =
        headers.join(",") + "\n" + rows.map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "table_data.csv";
    link.click();
};

export const importFromCSV = () => {
};