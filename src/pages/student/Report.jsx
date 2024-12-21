import React from "react";
import { useParams } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { useGetStudentBaseClearanceQuery } from "../../api/apiSlice";

const ClearanceForm = () => {
  const { id } = useParams();
  const { data: studentBaseClearance } = useGetStudentBaseClearanceQuery(id);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  // Split the departments into two groups for two columns
  const departmentEntries = Object.entries(studentBaseClearance?.data || {});
  const half = Math.ceil(departmentEntries.length / 2);
  const firstHalf = departmentEntries.slice(0, half);
  const secondHalf = departmentEntries.slice(half);

  return (
    <div>
      <button
        onClick={() => toPDF()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        Download PDF
      </button>
      <div
        ref={targetRef}
        className="w-full mx-auto p-5 border border-gray-300 rounded-lg bg-white"
      >
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold">
            Chittagong Polytechnic Institute
          </h1>
          <p className="text-sm font-medium">Student Clearance Form</p>
          <p className="text-sm">
            Complete all sections. Clearance cannot proceed without proper
            verification.
          </p>
        </header>
        <div className="flex flex-wrap justify-between ">
          <div className="w-[50%] flex flex-wrap justify-start gap-0 font-semibold text-gray-700 ">
            <div className="w-[30%]  border border-gray-300 p-2">
              Department Name
            </div>
            <div className="w-[30%] border border-gray-300 p-2">
              <h2>Lab </h2>
            </div>
            <div className="w-[20%] border border-gray-300 p-2">
              <h2>Clearance</h2>
            </div>
            <div className="w-[20%] border border-gray-300 p-2">
              <p className="text-center text-xs">Head Signature</p>
            </div>
          </div>
          <div className="w-[50%] flex flex-wrap justify-start gap-0 font-semibold text-gray-700 ">
            <div className="w-[30%]  border border-gray-300 p-2">
              Department Name
            </div>
            <div className="w-[30%] border border-gray-300 p-2">
              <h2>Lab </h2>
            </div>
            <div className="w-[20%] border border-gray-300 p-2">
              <h2>Clearance</h2>
            </div>
            <div className="w-[20%] border border-gray-300 p-2">
              <p className="text-center text-xs">Head Signature</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex flex-wrap justify-between">
          <div className="w-[50%]">
            {firstHalf.map(([departmentName, clearances]) => (
              <div
                className="flex flex-wrap justify-start gap-0 font-semibold text-gray-700"
                key={departmentName}
              >
                <div className="w-[30%] border border-gray-300 p-2">
                  {departmentName}
                </div>
                <div className="w-[30%] border border-gray-300 p-2">
                  <ul className="list-disc list-inside">
                    {clearances.map((clearance) => (
                      <li key={clearance.id}>
                        {clearance.clearanceCategory.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-[20%] border border-gray-300 p-2">
                  {clearances.every(
                    (clearance) => clearance.status === "APPROVED"
                  )
                    ? "✔"
                    : clearances.map((clearance) => (
                        <div key={clearance.id}>
                          {clearance.status === "APPROVED" ? "✔" : "✖"}
                        </div>
                      ))}
                </div>
                <div className="w-[20%] border border-gray-300 p-2">
                  <div className="h-8 border-b border-gray-400"></div>
                  <p className="text-center text-xs">Head Signature</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-[50%]">
            {secondHalf.map(([departmentName, clearances]) => (
              <div
                className="flex flex-wrap justify-start gap-0 font-semibold text-gray-700"
                key={departmentName}
              >
                <div className="w-[30%] border border-gray-300 p-2">
                  {departmentName}
                </div>
                <div className="w-[30%] border border-gray-300 p-2">
                  <ul className="list-disc list-inside">
                    {clearances.map((clearance) => (
                      <li key={clearance.id}>
                        {clearance.clearanceCategory.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-[20%] border border-gray-300 p-2">
                  {clearances.every(
                    (clearance) => clearance.status === "APPROVED"
                  )
                    ? "✔"
                    : clearances.map((clearance) => (
                        <div key={clearance.id}>
                          {clearance.status === "APPROVED" ? "✔" : "✖"}
                        </div>
                      ))}
                </div>
                <div className="w-[20%] border border-gray-300 p-2">
                  <div className="h-8 border-b border-gray-400"></div>
                  <p className="text-center text-xs">Head Signature</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-sm text-gray-700">
          <p className="mb-4">
            Visit:{" "}
            <a
              href="https://ctgpoly.gov.bd/clearance"
              className="text-blue-600 underline"
            >
              https://ctgpoly.gov.bd/clearance
            </a>
          </p>
          <div className="flex justify-between">
            <div>
              <p>Signature:</p>
              <div className="w-48 border-b border-gray-500"></div>
            </div>
            <div>
              <p>Date:</p>
              <div className="w-48 border-b border-gray-500"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ClearanceForm;
