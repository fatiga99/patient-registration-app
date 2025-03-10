import * as Yup from 'yup';

export const patientValidationSchema = Yup.object({
  fullName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Full name can only contain letters")
    .required("Full name is required"),
  
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Only Gmail addresses are allowed")
    .required("Email is required"),

  phoneNumber: Yup.string()
    .matches(/^\d{6,15}$/, "Phone number must be between 6 and 15 digits")
    .required("Phone number is required"),

});
