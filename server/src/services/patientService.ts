import { Patient } from "@prisma/client";
import { IPaginationParameters } from "../interfaces/IPaginationParameters";
import { IPatientRepository } from "../interfaces/IPatientRepository";
import { IPatientPaginatedResult } from "../interfaces/IPatientPaginatedResult";
import { CreatePatientDTO } from "../interfaces/DTOs/createPatientDTO";
import { CustomError } from "../utils/customError";
import axios from "axios";

export class PatientService {
    private patientRepository: IPatientRepository;

    constructor(patientRepository: IPatientRepository){
        this.patientRepository = patientRepository;
    }

    public async createPatient(patientData: CreatePatientDTO): Promise<Patient>{
        patientData.documentPhoto = await this.normalizeDocumentPhoto(patientData.documentPhoto);

        const patient = await this.patientRepository.createPatient(patientData);

        return patient;
    }

   

    public async getPatientsWithPagination(
        parameters: IPaginationParameters
    ): Promise<IPatientPaginatedResult> {
        const { page, limit } = parameters;

        const { data, total } = await this.patientRepository.getAllPatientsWithPagination(parameters);

        return {
            data,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        };
    }

    private async downloadAndConvertDocumentPhoto(documentPhoto: string): Promise<Uint8Array> {
        try {
            const response = await axios.get(documentPhoto, { responseType: "arraybuffer" });
            const responseUnit8Array =  new Uint8Array(response.data); 
            return responseUnit8Array;
        } catch (error) {
            throw new CustomError("Error downloading image from Cloudinary", 500);
        }
    }

    private async normalizeDocumentPhoto(documentPhoto: string | Buffer | Uint8Array | null): Promise<Uint8Array | null> {
        if (typeof documentPhoto === "string") {
            return await this.downloadAndConvertDocumentPhoto(documentPhoto);
        }

        if (documentPhoto instanceof Buffer) {
            return new Uint8Array(documentPhoto);
        }

        return documentPhoto;
    }
}