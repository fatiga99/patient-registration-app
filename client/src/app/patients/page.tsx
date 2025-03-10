"use client";

import { useRouter } from "next/navigation";
import PatientsList from "./components/patientsList";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPatients } from "./patientService";


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
    <section>
        <h1>Lista de Pacientes</h1>
        <div className="flex flex-wrap flex-col gap-4 mt-9 w-full justify-start">
                {loading && <p>Loading Patients...</p>}
                {error && <p>Error loading patients: {error}</p>}
                {patients && <PatientsList patients={patients} />}
            </div>
    </section>
    );
};

export default PatientsPage;