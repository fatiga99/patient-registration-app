import { Request, Response, NextFunction } from 'express';
import { PatientService } from '../services/patientService';
import { CreatePatientDTO } from '../interfaces/DTOs/createPatientDTO';
import { Patient } from '@prisma/client';
import { PatientWithBase64DTO } from '../interfaces/DTOs/patientWithBase64DTO';

export class PatientController {
    private patientService: PatientService;

    constructor(patientService: PatientService){
        this.patientService = patientService;
    }

    public async getPatients(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const patients = await this.patientService.getPatientsWithPagination({ page, limit });

            const patientsWithBase64Images = this.convertPatientsToBase64(patients.data);

            res.status(200).json({
                patients,
                data: patientsWithBase64Images});
        } catch (error) {
            next(error); 
        }
    }

    public async createPatient(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const patientData: CreatePatientDTO = {
                fullName: req.body.fullName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                documentPhoto: req.file ? new Uint8Array(req.file.buffer) : null,
            }

            const newPatient = await this.patientService.createPatient(patientData);
            res.status(201).json(newPatient);
        } catch(error) {
            next(error);
        }
    }

    private convertPatientsToBase64(patients: Patient[]): PatientWithBase64DTO[] {
        return patients.map(patient => {
            const documentPhotoBase64 = patient.documentPhoto
                ? `data:image/jpeg;base64,${Buffer.from(patient.documentPhoto).toString("base64")}` 
                : null;
    
            return {
                ...patient,
                documentPhoto: documentPhotoBase64,
            };
        });
    }
}