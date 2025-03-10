import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PatientsState } from "./interfaces/ipatientsState";
import { Patient } from "./interfaces/ipatient";
import { createPatient, fetchPatients } from "./patientService";

const initialState: PatientsState = {
    patients: [],
    loading: false,
    error: null
}

const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        setPatients: (state, action: PayloadAction<Patient[]>) => {
            state.patients = action.payload;
          },
          addPatient: (state, action: PayloadAction<Patient>) => {
            state.patients.push(action.payload);
          },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchPatients.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchPatients.fulfilled, (state, action) => {
            state.loading = false;
            state.patients = action.payload; 
          })
          .addCase(fetchPatients.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          })
          .addCase(createPatient.fulfilled, (state, action: PayloadAction<Patient>) => {
            state.patients.push(action.payload);
          });
      }
});

export const { setPatients, addPatient } = patientsSlice.actions;
export default patientsSlice.reducer;