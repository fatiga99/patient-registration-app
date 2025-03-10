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

const PatientForm: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting } =
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
          await dispatch(createPatient(values)); 
          setSubmitStatus("success");
          setTimeout(() => router.push("/patients"), 2000);
        } 
        catch (error) {
          console.error("Error creating patient:", error);
          setSubmitStatus("error");
        }
        setSubmitting(false);
      },
    });


  return (
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
        <BaseButton type="submit" 
            className="ml-4"
            disabled={isSubmitting} 
            variant="primary">
          Register Patient
        </BaseButton>
      </div>

      {submitStatus === "success" && (
        <div className="col-span-2 text-green-500 text-center mt-4 transition-opacity animate-fadeIn">
          Patient successfully registered! Redirecting...
        </div>
      )}
      {submitStatus === "error" && (
        <div className="col-span-2 text-red-500 text-center mt-4 transition-opacity animate-fadeIn">
          Error registering patient. Please try again.
        </div>
      )}
    </form>
  );
};

export default PatientForm;
