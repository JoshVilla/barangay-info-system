import mongoose from "mongoose";

const ResidentSchema = new mongoose.Schema({
  firstname: String,
  middlename: String,
  lastname: String,
  age: Number,
  birthdate: String,
  nationality: String,
  suffix: String,
  gender: String,
  civilStatus: String,
  religion: String,
  contactNumber: String,
  email: String,
  fatherName: String,
  motherName: String,
  spouseName: String,
  numberOfChildren: Number,
});

export const ResidentModel =
  mongoose.models.Resident || mongoose.model("Resident", ResidentSchema);
