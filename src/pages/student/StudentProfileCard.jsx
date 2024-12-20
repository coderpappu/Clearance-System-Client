import React from "react";
import { useParams } from "react-router-dom";
import { useGetStudentDetailsQuery } from "../../api/apiSlice";
import StudentProfileCard from "./Profile";

const StudentProfile = () => {
  const id = useParams().id;
  const {
    data: studentDetails,
    isLoading,
    isError,
  } = useGetStudentDetailsQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !studentDetails?.data) {
    return <div>Failed to fetch student data.</div>;
  }

  console.log(studentDetails);

  return (
    <div>
  
      <StudentProfileCard student={studentDetails.data} />
    </div>
  );
};

export default StudentProfile;
