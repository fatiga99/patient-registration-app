import { Request, Response, NextFunction } from "express";
import { PatientService } from "../services/patientService";
import { CreatePatientDTO } from "../interfaces/DTOs/createPatientDTO";

export class PatientController {
    private patientService: PatientService;

    constructor(patientService: PatientService) {
        this.patientService = patientService;
    }

    public async getPatients(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const patients = await this.patientService.getAllPatients();

            res.status(200).json(patients);
        } catch (error) {
            console.error("❌ Error en getPatients:", error);
            next(error);
        }
    }

    public async createPatient(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const patientData: CreatePatientDTO = {
                fullName: req.body.fullName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber
            };

            const newPatient = await this.patientService.createPatient(patientData);
            res.status(201).json(newPatient);
        } catch (error) {
            next(error);
        }
    }
}
