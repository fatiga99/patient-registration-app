"use client"

import React from "react";
import PatientForm from "@/app/patients/components/patientForm";

export default function CreatePatientPage() {
    return (
        <div className="relative w-full max-w-[1368px] md:h-auto bg-[#F8F8F8] rounded-[30px] mx-auto mt-[88px] p-4 md:p-8 flex flex-col items-center pb-20">
            <PatientForm />
        </div>
    )
}