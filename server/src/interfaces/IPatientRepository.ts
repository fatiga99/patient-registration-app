import { CreatePatientDTO } from "./DTOs/createPatientDTO";
import Patient from "../models/patient";

export interface IPatientRepository {
    createPatient(patient: CreatePatientDTO): Promise<Patient>;
    getAllPatients(): Promise<Patient[]>;
}
