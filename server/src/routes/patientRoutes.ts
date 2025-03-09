import express from "express";
import { PatientRepository } from "../repositories/patientRepository";
import { PatientService } from "../services/patientService";
import { PatientController } from "../controllers/patientController";

const patientRouter = express.Router();
const patientRepository = new PatientRepository();
const patientService = new PatientService(patientRepository);
const patientController = new PatientController(patientService);

patientRouter.get('/', patientController.getPatients.bind(patientController));
patientRouter.post('/', patientController.createPatient.bind(patientController));

export default patientRouter;
