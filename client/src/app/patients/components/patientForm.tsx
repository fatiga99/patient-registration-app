"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { patientValidationSchema } from "../schemas/patientFormValidation";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { createPatient } from "../patientService";
import BaseInput from "@/app/components/baseInput";
import BaseButton from "@/app/components/baseButton";
import Modal from "@/app/components/Modal"; 

const PatientForm: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [modalState, setModalState] = useState<{ isOpen: boolean; title: string; message: string; variant: "success" | "error" }>(
    { isOpen: false, title: "", message: "", variant: "success" }
  );

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        countryCode: "+598",
        phoneNumber: "",
      },
      validationSchema: patientValidationSchema,
      onSubmit: async (values, { setSubmitting }) => {
        try {
          const formattedPhoneNumber = `${values.countryCode}${values.phoneNumber}`;

          const patientData = {
            fullName: values.fullName,
            email: values.email,
            phoneNumber: formattedPhoneNumber,
          };

          await dispatch(createPatient(patientData));
          setModalState({
            isOpen: true,
            title: "Success",
            message: "Patient successfully registered!",
            variant: "success",
          });
          setTimeout(() => router.push("/patients"), 2000);
        } catch (error) {
          setModalState({
            isOpen: true,
            title: "Error",
            message: "Failed to register patient. Please try again.",
            variant: "error",
          });
        }
        setSubmitting(false);
      },
    });

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full px-4 sm:px-8 lg:px-16 mt-4"
      >
        <div className="flex flex-col">
          <label className="text-[20px] font-bold">Full Name</label>
          <BaseInput
            variant="patientForm"
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.fullName && errors.fullName && (
            <div className="text-red-500 text-sm">{errors.fullName}</div>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-[20px] font-bold">Email</label>
          <BaseInput
            variant="patientForm"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-[20px] font-bold">Phone Number</label>
          <div className="flex gap-2">
            <BaseInput
              variant="patientForm"
              type="text"
              name="countryCode"
              value={values.countryCode}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-1/4"
            />
            <BaseInput
              variant="patientForm"
              type="text"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-3/4"
            />
          </div>
          {touched.phoneNumber && errors.phoneNumber && (
            <div className="text-red-500 text-sm">{errors.phoneNumber}</div>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-center mt-8">
          <BaseButton 
            variant="back"
            onClick={() => router.push("/patients")}
          >
            Back
          </BaseButton>
          <BaseButton 
            type="submit" 
            className="ml-4"
            disabled={isSubmitting} 
            variant="primary"
          >
            Register Patient
          </BaseButton>
        </div>
      </form>

      <Modal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        message={modalState.message}
        variant={modalState.variant}
      />
    </>
  );
};

export default PatientForm;
