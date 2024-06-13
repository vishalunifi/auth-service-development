export interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    dob: string;
    mail: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface IRegisterRequest {
    firstName: string;
    lastName: string;
    dob: string;
    mail: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface ILoginRequest {
    mail: string;
    password: string;
  }
  
  export interface IUpdateEmailRequest {
    mail: string;
  }
  
  export interface IResetPasswordRequest {
    password: string;
    confirmPassword: string;
  }
  