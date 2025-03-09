import { IPatientRepository } from "../interfaces/IPatientRepository";
import { CreatePatientDTO } from "../interfaces/DTOs/createPatientDTO";
import Patient from "../models/patient";
import pool from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class PatientRepository implements IPatientRepository {
    async createPatient(patientData: CreatePatientDTO): Promise<Patient> {
        const connection = await pool.getConnection();
        try {
            const { fullName, email, phoneNumber } = patientData;

            const [result] = await connection.execute<ResultSetHeader>(
                `INSERT INTO patients (fullName, email, phoneNumber) VALUES (?, ?, ?)`,
                [fullName, email, phoneNumber]
            );

            return new Patient({
                id: result.insertId,
                fullName,
                email,
                phoneNumber,
                createdAt: new Date()
            });
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }

    async getAllPatients(): Promise<Patient[]> { 
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute<RowDataPacket[]>(
                `SELECT id, fullName, email, phoneNumber, createdAt FROM patients ORDER BY createdAt DESC`
            );

            console.log("🛠️ Filas devueltas por MySQL:", rows);

            return rows.map(row => 
                new Patient({
                    id: row.id as number,
                    fullName: row.fullName as string,
                    email: row.email as string,
                    phoneNumber: row.phoneNumber as string,
                    createdAt: new Date(row.createdAt as string),
                })
            );
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }
}
