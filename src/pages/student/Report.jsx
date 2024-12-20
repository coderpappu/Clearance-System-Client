import React from "react";
import { usePDF } from "react-to-pdf";

const ClearanceForm = () => {
  const data = [
    {
      department: "Workshop Technology",
      labs: ["Senior Workshop", "Initial Workshop"],
      verified: [true, false],
    },
    {
      department: "Electrical Technology",
      labs: ["Basic Electrical Workshop", "Advanced Electrical Workshop"],
      verified: [true, true],
    },
    {
      department: "Library",
      labs: ["Books Section", "Study Section"],
      verified: [true, false],
    },
    {
      department: "Mechanical Technology",
      labs: ["Mechanical Lab 1", "Mechanical Lab 2"],
      verified: [true, true],
    },
  ];

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

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
        {data.map((dept, index) => {
          const isEvenIndex = index % 2 === 0;
          if (!isEvenIndex) return null;

          const dept1 = data[index];
          const dept2 = data[index + 1] || null;

          return (
            <div key={index} className="flex flex-wrap justify-between  ">
              {/* First Department */}
              <div className="w-[50%] flex flex-wrap justify-start gap-0 font-semibold text-gray-700 ">
                <div className="w-[30%]  border border-gray-300 p-2">
                  {dept1.department}
                </div>
                <div className="w-[30%] border border-gray-300 p-2">
                  <ul className="list-disc list-inside">
                    {dept1.labs.map((lab, i) => (
                      <li key={i}>{lab}</li>
                    ))}
                  </ul>
                </div>
                <div className="w-[20%] border border-gray-300 p-2">
                  {dept1.verified.every(Boolean)
                    ? "✔ All Verified"
                    : dept1.verified.map((v, i) => (
                        <div key={i}>{v ? "✔" : "✖"}</div>
                      ))}
                </div>
                <div className="w-[20%] border border-gray-300 p-2">
                  <div className="h-8 border-b border-gray-400"></div>
                  <p className="text-center text-xs">Head Signature</p>
                </div>
              </div>

              {/* Second Department */}
              {dept2 ? (
                <div className="w-[50%] flex flex-wrap justify-between gap-0  font-semibold text-gray-700 ">
                  <div className="w-[30%]  border border-gray-300 p-2">
                    {dept2.department}
                  </div>
                  <div className="w-[30%] border border-gray-300 p-2">
                    <ul className="list-disc list-inside">
                      {dept2.labs.map((lab, i) => (
                        <li key={i}>{lab}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-[20%] border border-gray-300 p-2">
                    {dept2.verified.every(Boolean)
                      ? "✔ All Verified"
                      : dept2.verified.map((v, i) => (
                          <div key={i}>{v ? "✔" : "✖"}</div>
                        ))}
                  </div>
                  <div className="w-[20%] border border-gray-300 p-2">
                    <div className="h-8 border-b border-gray-400"></div>
                    <p className="text-center text-xs">Head Signature</p>
                  </div>
                </div>
              ) : (
                <div className="w-[50%] flex flex-wrap justify-between gap-0 bg-gray-200 text-gray-400 font-semibold p-2 border border-gray-300">
                  No Data
                </div>
              )}
            </div>
          );
        })}

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
