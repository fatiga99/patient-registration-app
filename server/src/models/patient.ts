class Patient {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;

    constructor({ id, fullName, email, phoneNumber, createdAt }: 
        { id: number; fullName: string; email: string; phoneNumber: string; createdAt: Date }) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.createdAt = createdAt;
    }
}

export default Patient;
