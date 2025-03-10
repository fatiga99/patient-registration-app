import { InputHTMLAttributes } from "react";

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: 'patientForm'; 
    className?: string; 
};