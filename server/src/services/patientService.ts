import { IPatientRepository } from "../interfaces/IPatientRepository";
import { CreatePatientDTO } from "../interfaces/DTOs/createPatientDTO";
import Patient from "../models/patient";

export class PatientService {
    private patientRepository: IPatientRepository;

    constructor(patientRepository: IPatientRepository) {
        this.patientRepository = patientRepository;
    }

    async createPatient(patientData: CreatePatientDTO): Promise<Patient> {
        return await this.patientRepository.createPatient(patientData);
    }

    async getAllPatients(): Promise<Patient[]> {
        return await this.patientRepository.getAllPatients();
    }
}
