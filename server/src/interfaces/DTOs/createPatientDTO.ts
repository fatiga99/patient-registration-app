export interface CreatePatientDTO {
    fullName: string;
    email: string;
    phoneNumber: string;
    documentPhoto: Uint8Array | null; 
}