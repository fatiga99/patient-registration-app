"use client";

import { useRouter } from "next/navigation";
import PatientsList from "./components/patientsList";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPatients } from "./patientService";
import BaseButton from "../components/baseButton";


 const PatientsPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const patients = useSelector((state: RootState) => state.patients.patients);
    const loading = useSelector((state: RootState) => state.patients.loading);
    const error = useSelector((state: RootState) => state.patients.error);
    
    const handleCreateClick = () => {
        router.push("/patients/create");
    };

    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full px-6 py-15">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#120E21] my-8">
                Patient List
            </h1>
            <BaseButton 
                onClick={handleCreateClick} 
                variant="primary" 
            >
                Add Patient
            </BaseButton>
            <div className="w-full ">
                    {loading && <p>Loading Patients...</p>}
                    {error && <p className="text-red-500">Error loading patients: {error}</p>}
                    {patients && <PatientsList patients={patients} />}
            </div>
        </div>
    </section>
    );
};

export default PatientsPage;