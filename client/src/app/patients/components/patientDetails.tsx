"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { useRouter } from 'next/navigation';
import { fetchPatients } from '../patientService';
import { formatDate } from '@/utils/formatDate';
import BaseButton from '@/app/components/baseButton';

interface PatientDetailsProps {
    patientId: number;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patientId }) => {
    const router = useRouter();

    const patients = useSelector((state: RootState) => state.patients.patients);

    const patient = patients.find((p) => String(p.id) === String(patientId));

    if (!patient) {
        return <p>Patient not found.</p>;
    }

    return(
    <div className="relative w-full max-w-[920px] h-auto bg-[#F8F8F8] rounded-[30px] mx-auto mt-8 md:mt-[88px] flex flex-col items-center px-4 md:px-10 py-8 md:py-12">
        <h2 className="font-redhat text-[24px] md:text-[30px] font-bold leading-[39.69px] text-black mt-4 md:mt-[38px]">
            {patient.fullName}
        </h2>

        <div className="w-full mt-6 md:mt-10 space-y-6">
            <div>
                <h3 className="font-redhat text-[18px] md:text-[20px] font-bold leading-[26.46px]">
                    Email
                </h3>
                <p className="font-public-sans text-[16px] font-normal leading-[25.6px] text-[#99879D] mt-2">
                    {patient.email}
                </p>
            </div>
            <div>
                <h3 className="font-redhat text-[18px] md:text-[20px] font-bold leading-[26.46px]">
                    Phone
                </h3>
                <p className="font-public-sans text-[16px] font-normal leading-[25.6px] text-[#99879D] mt-2">
                    {patient.phoneNumber}
                </p>
            </div>
            <div>
                <h3 className="font-redhat text-[18px] md:text-[20px] font-bold leading-[26.46px]">
                    Creation Date
                </h3>
                <p className="font-public-sans text-[16px] font-normal leading-[25.6px] text-[#99879D] mt-2">
                    {formatDate(patient.createdAt.toString())}
                </p>
            </div>

            <BaseButton 
                variant="back"
                onClick={() => router.push("/patients")}
            >
                Back
            </BaseButton>
        </div>
    </div>
    )
};

export default PatientDetails;