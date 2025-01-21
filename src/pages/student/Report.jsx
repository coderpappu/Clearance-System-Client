import React from "react";
import { useParams } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import {
  useGetStudentBaseClearanceQuery,
  useGetStudentDetailsQuery,
} from "../../api/apiSlice";

const ClearanceForm = () => {
  const { id } = useParams();
  const { data: studentBaseClearance } = useGetStudentBaseClearanceQuery(id);

  const {
    data: studentDetails,
    isLoading,
    isError,
  } = useGetStudentDetailsQuery(id);

  const { toPDF, targetRef } = usePDF({
    filename: "page.pdf",
    margin: 40,
  });

  // Split the departments into two groups for two columns
  const departmentEntries = Object.entries(studentBaseClearance?.data || {});
  const half = Math.ceil(departmentEntries.length / 2);
  const firstHalf = departmentEntries.slice(0, half);
  const secondHalf = departmentEntries.slice(half);

  return (
    <div className="w-[85%] mx-auto p-4">
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
          <h3 className="text-lg">Bangladesh Goverment</h3>
          <h3 className="font-semibold text-base">Principle Section</h3>
          <h1 className="text-2xl font-bold">
            Chittagong Polytechnic Institute
          </h1>
          <h4>Nasirabad , Chattogram </h4>
          <p className="text-md my-2 font-bold underline">
            Student Clearance Form
          </p>
        </header>
        {/* application format  */}

        <div className="text-base">
          {`  Name : ${studentDetails?.data?.name}, Father's Name : ${studentDetails?.data?.father_name} , Mother's Name : ${studentDetails?.data?.mother_name} . This student is a regular student of Chittagong Polytechnic Institute. He has completed all the courses of the 8th semester of the 2025 academic year.`}
        </div>
        <div className="flex justify-end my-8">
          <div>
            <div className="w-56 border-b border-gray-500"></div>
            <p className="text-center text-base">
              Principle
              <p /> <p> Chattogram Polytechnic Institute</p>
              <p> Nasirabad , Chattogram</p>
            </p>
          </div>
        </div>
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

        <div className="my-3">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim cum
            praesentium minus fugiat iusto vero quasi nihil neque quis dolore
          </p>
        </div>

        <div className="flex justify-end my-16">
          <div>
            <div className="w-56 border-b border-gray-500"></div>
            <p className="text-center text-base">
              Principle
              <p /> <p> Chattogram Polytechnic Institute</p>
              <p> Nasirabad , Chattogram</p>
            </p>
          </div>
        </div>

        <div className="my-3">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim cum
            praesentium minus fugiat iusto vero quasi nihil neque quis dolore
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-sm text-gray-700">
          <div className="flex justify-between">
            <div>
              <p>Date:</p>
              <div className="w-48 border-b border-gray-500"></div>
            </div>

            <div className="flex justify-end my-8">
              <div>
                <div className="w-56 border-b border-gray-500"></div>
                <p className="text-center text-base">
                  Student Signature
                  <p />
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ClearanceForm;
