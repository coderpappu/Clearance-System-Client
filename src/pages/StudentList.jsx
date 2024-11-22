import React from "react";

// Placeholder student data with department, group, and shift information
const students = [
  {
    id: 1,
    name: "John Doe",
    department: "Computer Science",
    group: "A",
    shift: "Morning",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Mechanical Engineering",
    group: "B",
    shift: "Evening",
  },
  {
    id: 3,
    name: "Mike Johnson",
    department: "Mathematics",
    group: "C",
    shift: "Night",
  },
  {
    id: 4,
    name: "Anna Lee",
    department: "Physics",
    group: "A",
    shift: "Morning",
  },
];

const StudentList = () => {
  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Student List
      </h2>
      <table className="w-full mt-4 table-auto border-collapse text-left">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Group</th>
            <th className="px-4 py-2">Shift</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="px-4 py-2">{student.name}</td>
              <td className="px-4 py-2">{student.department}</td>
              <td className="px-4 py-2">{student.group}</td>
              <td className="px-4 py-2">{student.shift}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
