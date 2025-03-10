"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import PatientDetails from '../components/patientDetails';

const PatientsDetailsPage: React.FC = () => {
    const params = useParams();
    const patientId = params.id ? parseInt(params.id as string, 10): null;

    if(!patientId) {
        return <p>Invalid patient ID.</p>;
    }

    return (
        <div>
            <PatientDetails patientId = {patientId}/>
        </div>
    )
};

export default PatientsDetailsPage;