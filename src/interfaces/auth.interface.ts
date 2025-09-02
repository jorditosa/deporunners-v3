export interface JWTPayload {
  id: number;
  iat: number;
  exp: number;
}


export interface LoginFormData {
  email: string;
  password: string;
}

export type LoginApiResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    confirmed?: boolean;
    blocked?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
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

export interface ResetFormData {
  code: string;
  password: string;
  repeatPassword: string;
}