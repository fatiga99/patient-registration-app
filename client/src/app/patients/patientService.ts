import axiosInstance from '@/utils/axiosConfig';
import { handleAxiosError } from '@/utils/axiosErrorHandler';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPatients = createAsyncThunk(
    "patients/fetchPatients",
    async (_, thunkAPI) => {
      try {
        const response = await axiosInstance.get("/api/patients");
        return response.data; 
      } catch (error) {
        return thunkAPI.rejectWithValue(handleAxiosError(error));
      }
    }
  );

  export const createPatient = createAsyncThunk(
    "patients/createPatient",
    async (patientData: { fullName: string; email: string; phoneNumber: string }, thunkAPI) => {
      try {
        const response = await axiosInstance.post("/api/patients", patientData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(handleAxiosError(error));
      }
    }
  );