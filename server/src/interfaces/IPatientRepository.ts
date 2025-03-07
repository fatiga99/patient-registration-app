import { Prisma, Patient } from "@prisma/client";
import { IPaginationParameters } from "./IPaginationParameters";

export interface IPatientRepository {
 
    createPatient(patient: Prisma.PatientCreateInput): Promise<Patient>;

    getAllPatientsWithPagination(
        parameters: IPaginationParameters
    ): Promise<{ data: Patient[]; total: number }>;
}