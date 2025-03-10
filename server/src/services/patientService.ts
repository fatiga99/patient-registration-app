import { IPatientRepository } from "../interfaces/IPatientRepository";
import { CreatePatientDTO } from "../interfaces/DTOs/createPatientDTO";
import Patient from "../models/patient";
import { EmailService } from "./emailService"; 

export class PatientService {
    private patientRepository: IPatientRepository;
    private emailService: EmailService;

    constructor(patientRepository: IPatientRepository) {
        this.patientRepository = patientRepository;
        this.emailService = new EmailService(); 
    }

    async createPatient(patientData: CreatePatientDTO): Promise<Patient> {
        const newPatient = await this.patientRepository.createPatient(patientData);

        this.emailService.sendConfirmationEmail(newPatient.email, newPatient.fullName)
            .catch((error) => console.error("Error sending confirmation email:", error));

        return newPatient;
    }

    async getAllPatients(): Promise<Patient[]> {
        return await this.patientRepository.getAllPatients();
    }
}
