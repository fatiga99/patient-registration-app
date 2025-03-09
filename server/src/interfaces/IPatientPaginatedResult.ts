import Patient from "../models/patient";


export interface IPatientPaginatedResult {
    data: Patient[];
    total: number;
    currentPage: number;
    totalPages: number;
}