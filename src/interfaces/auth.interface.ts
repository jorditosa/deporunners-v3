

export interface LoginFormData {
    email: string;
    password: string;
}

export type LoginApiResponse = {
  data: unknown | null;
  error: unknown | null;
};


export interface RegisterFormData {
    email: string;
    confirmCode: number;
    password: string;
    repeatPassword: string;
}


export interface ForgotFormData {
    email: string;
}