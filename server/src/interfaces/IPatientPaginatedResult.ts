import { Patient } from "@prisma/client";

export interface IPatientPaginatedResult {
    data: Patient[];
    total: number;
    currentPage: number;
    totalPages: number;
}