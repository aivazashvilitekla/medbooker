export enum Roles {
  Doctor = 1100000222,
  Patient = 1000000005,
}
export interface User {
  firstName: string;
  lastName: string;
  entityNo: number;
}
// API MODELS
export interface Patient{
  entityNo: number;
  firstName: string;
  lastName: string;
}
export interface Doctor{
  entityNo: number;
  firstName: string;
  lastName: string;
  practiceName: string;
  practiceNo: string;
}