import { PrismaClient, Prisma, Patient } from "@prisma/client";
import { IPatientRepository } from "../interfaces/IPatientRepository";
import { IPaginationParameters } from "../interfaces/IPaginationParameters";

const prisma = new PrismaClient();

export class PatientRepository implements IPatientRepository {
    
    public async createPatient(patient: Prisma.PatientCreateInput): Promise<number> {
        const createdPatient = await prisma.patient.create({
            data: patient,
        });
        return createdPatient.id;
    }

    public async getAllPatientsWithPagination(
        parameters: IPaginationParameters
    ): Promise<{ data: Patient[]; total: number }> {
        const { page, limit } = parameters;
        const offset = (page - 1) * limit;

        const data = await prisma.patient.findMany({
            skip: offset, 
            take: limit,
            orderBy: {
                createdAt: "desc", 
            },
        });

        const total = await prisma.patient.count();

        return { data, total };
    }
}
