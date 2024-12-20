import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { useGetStudentDetailsQuery } from "../../api/apiSlice";
import Button from "./Button";
import InfoBox from "./InfoBox";
import StudentClearanceCard from "./StudentClearanceCard";

const Profile = () => {
  const [selected, setSelected] = useState("1");
  // handle function for button state
  const handleSelect = (id) => {
    setSelected(id);
  };

  const id = useParams().id;
  const {
    data: studentDetails,
    isLoading,
    isError,
  } = useGetStudentDetailsQuery(id);

  if (isLoading && !isError) return "Loading...";

  return (
    <div>
      <h2> Student / Profile</h2>
      <div className="w-full p-5 mx-5 mt-5 mb-1 rounded-md bg-white dark:bg-dark-card flex flex-wrap justify-between ">
        <div className="flex flex-wrap justify-between items-center w-[50%]">
          <div className="w-[20%] mr-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 dark:bg-blue-500  flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-gray-600 dark:text-white">
                {studentDetails?.data?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="w-[75%]">
            <h1 className="font-poppins text-2xl dark:text-dark-text-color font-semibold">
              {studentDetails?.data?.name}
            </h1>
            <h3 className="text-[15px] font-medium  text-[#686767] dark:text-dark-text-color">
              {studentDetails?.data?.department?.name}
            </h3>
            <h3 className="text-[15px] mt-2 font-semibold  text-[#3c3c3c] dark:text-dark-text-color">
              Board Roll : {studentDetails?.data?.boardRoll}
            </h3>
            <h3 className="text-[15px] font-medium  text-[#3c3c3c]  dark:text-dark-text-color">
              {/* {`Website : ${website_url}`} */}
              Registration No : {studentDetails?.data?.registrationNo}
            </h3>
          </div>
          {/* <div className="w-[40px] cursor-pointer  h-[40px] flex flex-col justify-center align-middle items-center rounded-full bg-[#85858512] mr-2">
            <Link to={`/company/update/${data._id}`}>
              <FiEdit />
            </Link>
          </div> */}
        </div>
        <div className="w-[50%] border-l-2 border-dotted border-[#cacaca]">
          <InfoBox title="Shift" data={studentDetails?.data?.shift} />
          <InfoBox title="Group" data={studentDetails?.data?.group} />
          <InfoBox title="Session" data={studentDetails?.data?.session} />
          <InfoBox title="District" data={studentDetails?.data?.district} />
          <InfoBox title="Upazila" data={studentDetails?.data?.upazila} />
          <InfoBox
            title="Birth Date"
            data={new Date(
              studentDetails?.data?.birthDate
            ).toLocaleDateString()}
          />
          <InfoBox title="Phone" data={studentDetails?.data?.phoneNumber} />
        </div>
      </div>

      <div className="w-full mx-5 rounded-md bg-white dark:bg-dark-card flex flex-wrap ">
        <Button
          button_id="1"
          isActive={selected == "1"}
          handleSelect={handleSelect}
          title={"Clearance"}
        />
        <Button
          button_id="2"
          isActive={selected == "2"}
          handleSelect={handleSelect}
          title={"Report"}
        />
      </div>

      {/* {selected == "1" && <AboutCard employeeDetails="sdf" />}
      {selected == "2" && <JobDetails employeeDetails="sdf" />}
      {selected == "3" && <SalarySettingsForm />} */}
      {selected == "1" && (
        <StudentClearanceCard
          studentId={id}
          instituteId={studentDetails?.data?.institute_id}
        />
      )}
    </div>
  );
};

export default Profile;
