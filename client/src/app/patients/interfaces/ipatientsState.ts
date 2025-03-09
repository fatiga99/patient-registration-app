import { Patient } from "./ipatient";

export interface PatientsState {
    patients: Patient[];
    loading: boolean;
    error: string | null;
}