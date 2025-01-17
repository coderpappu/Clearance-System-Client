import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useCreateDueStuPaymentMutation } from "../../api/apiSlice";
import BkashScanner from "../../assets/bkash-scanner.png";
import BkashImg from "../../assets/bkash.png";
import Nagad from "../../assets/nagad.png";

const StudentPaymentCard = ({ studentId, due, onClose }) => {
  const [dueStuPayment] = useCreateDueStuPaymentMutation();

  const initialValues = {
    transactionNumber: "",
    transactionId: "",
  };

  const validationSchema = Yup.object({
    transactionNumber: Yup.string().required("Transaction Number is required"),
    transactionId: Yup.string().required("Transaction ID is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dueStuPayment({ ...values, due, studentId }).unwrap();
      setSubmitting(false);
      onClose();
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-start gap-1">
        <div className="w-[100px] h-auto">
          <img src={BkashImg} alt="" srcSet="" />
        </div>
        <div className="w-[100px] h-auto">
          <img src={Nagad} alt="" srcSet="" />
        </div>
        <div className="w-[100px] max-h-[]">
          <img src={BkashImg} alt="" srcSet="" />
        </div>
        <div className="w-[100px] h-auto">
          <img src={Nagad} alt="" srcSet="" />
        </div>
        <div className="w-[100px] h-auto">
          <img src={BkashImg} alt="" srcSet="" />
        </div>
        <div className="flex flex-wrap justify-between w-full">
          <div className="w-[70%] bg-white p-2 my-3 shadow-md rounded-md">
            <h2 className="text-base font-medium mb-3">Bkash Payment</h2>

            <h2 className="text-sm font-medium mb-1">
              Account Type : Personal{" "}
            </h2>
            <h2 className="text-sm font-medium mb-1">Bkash No : 0188481592 </h2>
            <h2 className="text-sm font-medium mb-1">
              Total Due Amount : {due}
            </h2>
          </div>
          <div className="w-[30%] ">
            <img src={BkashScanner} className="w-full " />
          </div>
        </div>
        {/* student transactions data  */}
        <div className="w-full">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="transactionNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Transaction Number
                  </label>
                  <Field
                    type="text"
                    name="transactionNumber"
                    id="transactionNumber"
                    placeholder="01884815992"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="transactionNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="transactionId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Transaction ID
                  </label>
                  <Field
                    type="text"
                    name="transactionId"
                    id="transactionId"
                    placeholder="A82X923S435XC353X"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="transactionId"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-wrap justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mb-4 px-3 py-2 bg-blue-500 text-white rounded cursor-pointer text-sm"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default StudentPaymentCard;
