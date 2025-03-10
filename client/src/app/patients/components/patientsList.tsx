"use client";

import React from 'react';
import PatientItem from "./patientItem";
import { Patient } from "../interfaces/ipatient";

interface PatientListProps {
    patients: Patient[];
}

 const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-6 w-full">
            {patients.length > 0 ? (
                
                patients.map((patient) => (
                    <div
                        className="basis-full sm:basis-[calc(50%-20px)] sm:max-w-[calc(50%-20px)] max-w-full"
                        key={patient.id}
                    >
                        <PatientItem key={patient.id} patient={patient} />
                    </div>
                ))
            ) : (
                <p>There are no patients registered.</p>
            )}
        </div>
  );
};

export default PatientList;