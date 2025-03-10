"use client";

import { useRouter } from "next/navigation";
import { Patient } from "../interfaces/ipatient";


interface PatientItemProps {
  patient: Patient;
}

const PatientItem: React.FC<PatientItemProps> = ({ patient }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/patients/${patient.id}`);
    }

    return (
        <div
            onClick={handleClick}
            className="max-w-2xl w-full  h-[103px] bg-[#FBEEFF] rounded-[30px] text-center cursor-pointer flex hover:shadow-lg transition-shadow"
        >
            <div className="ml-[16px] mt-[26px]">
                <h2 className="text-[20px] font-redhat font-bold leading-[26.46px] text-[#000000]">
                    {patient.fullName}
                </h2>
                <p className="text-[12.8px] font-public-sans font-normal leading-[15.04px] text-[#000000] mt-[10px]">
                    {patient.phoneNumber}
                </p>
            </div>
        </div>
    );
    };

export default PatientItem;
