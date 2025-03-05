import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useGetInstituteDetailsQuery } from "../../api/apiSlice";
import InstituteRegistrationForm from "../IntituteRegistration";
import InfoBox from "../student/InfoBox";

// import ConfirmDialog from "../../../helpers/ConfirmDialog";
// import FormSkeleton from "../../../skeletons/FormSkeleton";
// import ErrorMessage from "../../../utils/ErrorMessage";

const InstituteCard = () => {
  const { data: instituteDetails } = useGetInstituteDetailsQuery();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectInstitute, setSelectInstitute] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (data = null) => {
    setIsPopupOpen(true);
    setSelectInstitute(data);
  };

  return (
    <>
      <div>
        <div className="flex flex-wrap justify-between">
          <div
            className={`w-8 ${
              instituteDetails && "hidden"
            } h-8 bg-green-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer`}
            onClick={() => handleOpen()}
          >
            <IoAdd color="#fff" />
          </div>
        </div>
        <div className="w-full relative p-5  mt-5 mb-1 rounded-md bg-white dark:bg-dark-card flex flex-wrap justify-between">
          <div className="flex flex-wrap justify-between items-center w-full md:w-[50%]">
            <div className="w-full md:w-[20%] mr-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 dark:bg-blue-500 flex items-center justify-center mb-4"></div>
            </div>
            <div className="w-full md:w-[75%]">
              <h1 className="font-poppins text-2xl dark:text-dark-text-color font-semibold">
                <span className="text-2xl font-bold text-gray-600 dark:text-white">
                  {instituteDetails?.name}
                </span>
              </h1>
              <h3 className="text-[15px] font-medium text-[#686767] dark:text-dark-text-color">
                Email : {instituteDetails?.email}
              </h3>
              <h3 className="text-[15px] font-medium text-[#686767] dark:text-dark-text-color">
                Phone : {instituteDetails?.phone}
              </h3>
              <h3 className="text-[15px] font-medium text-[#3c3c3c] dark:text-dark-text-color">
                {/* Registration No : {studentDetails?.data?.registrationNo} */}
              </h3>
            </div>
            <div className="w-[40px] absolute cursor-pointer right-0 top-2 h-[40px] flex flex-col justify-center align-middle items-center rounded-full bg-[#85858512] mr-2">
              <Link onClick={() => handleOpen(instituteDetails)}>
                <FiEdit />
              </Link>
            </div>
          </div>
          <div className="w-full md:w-[50%] border-t-2 md:border-t-0 md:border-l-2 border-dotted border-[#cacaca] mt-4 md:mt-0">
            <InfoBox title="Post Office" data={instituteDetails?.postOffice} />
            <InfoBox title="Post Code" data={instituteDetails?.postCode} />
            <InfoBox title="District" data={instituteDetails?.district} />
            <InfoBox title="Country" data={instituteDetails?.country} />
            {/*  <InfoBox title="Upazila" data={studentDetails?.data?.upazila} />
            <InfoBox
              title="Birth Date"
              data={new Date(
                studentDetails?.data?.birthDate
              ).toLocaleDateString()}
            />
            <InfoBox title="Phone" data={studentDetails?.data?.phoneNumber} /> */}
          </div>
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 w-full max-w-4xl">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  {instituteDetails ? "Update Institute" : "Add Institute"}
                </h3>

                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => onClose()}
                >
                  <RxCrossCircled fontSize={20} />
                </button>
              </div>
              <div className="mt-4">
                <InstituteRegistrationForm
                  institute={selectInstitute}
                  onClose={onClose}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InstituteCard;
