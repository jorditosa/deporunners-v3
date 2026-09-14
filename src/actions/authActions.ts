import { AxiosResponse, isAxiosError } from 'axios';
import { apiAuthClient, apiClient } from '../api/client';
import { ForgotFormData, JWTPayload, LoginApiResponse, LoginFormData, RegisterFormData, ResetFormData } from '../interfaces/auth.interface';
import { jwtDecode } from "jwt-decode";
import { isTokenValidFormat } from '../helpers/jwt';
import { Preferences } from '@capacitor/preferences';
import { MemberLookup } from '../interfaces/wordpres.interface';

export const authActions = {

    login: async (formData: LoginFormData): Promise<LoginApiResponse> => {
        const { email, password } = formData;
        try {
            const { data } = await apiClient.post<LoginApiResponse>(
                `auth/local`,
                {
                    identifier: email,
                    password: password
                }
            );
            await Preferences.set({
                key: 'depotoken',
                value: data.jwt
            })
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.error?.message ?? "Login error");
            }
            throw error
        }
    },

    createAccount: async (formData: RegisterFormData): Promise<RegisterFormData> => {
        const { email, password } = formData;
        try {

            let member: MemberLookup;
            try {
                const res = await apiClient.get<MemberLookup>(`wp/member`, { params: { email } });
                member = res.data;
            } catch (e) {
                if (isAxiosError(e) && e.response?.status === 404) {
                    throw new Error(`No s'ha trobat l'usuari.`);
                }
                throw e;
            }
            if (!member) {
                throw new Error(`No s'ha trobat l'usuari.`);
            }

            const { data } = await apiClient.post(
                `auth/local/register`,
                {
                    username: member.username,
                    email,
                    password,
                    soci_id: member.soci_id,
                    avatar: member.avatar,
                }
            );
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                const errorMessage = error.response.data?.error?.message;

                if (errorMessage === "Email or Username are already taken") {
                    throw new Error("Ja estàs d'alta a la App");
                }

                throw new Error(errorMessage ?? "Error de registre");
            }
            throw error
        }
    },

    confirmAccount: async (formData: Pick<RegisterFormData, 'email' | 'confirmCode'>): Promise<AxiosResponse> => {
        const { email, confirmCode } = formData;
        try {
            const response = await apiClient.post(
                `auth/local`,
                {
                    email,
                    confirmCode
                }
            );
            return response
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.error?.message ?? "Register error");
            }
            throw error
        }
    },

    forgotPassword: async (formData: Pick<ForgotFormData, 'email'>): Promise<AxiosResponse> => {
        const { email } = formData;
        try {
            const response = await apiClient.post(
                `auth/forgot-password`,
                {
                    email
                }
            );
            return response
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.error?.message ?? "Forgot password error");
            }
            throw error
        }
    },

    resetPassword: async (formData: ResetFormData): Promise<AxiosResponse> => {
        const { code, password, repeatPassword } = formData;
        try {
            const response = await apiClient.post(
                `auth/reset-password`,
                {
                    code: code.trim(),
                    password,
                    passwordConfirmation: repeatPassword
                }
            );
            return response
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.error?.message ?? "Reset password error");
            }
            throw error
        }
    },

    getUser: async (token: string) => {
        try {
            if (!isTokenValidFormat(token)) {
                await Preferences.remove({ key: 'depotoken' });
                throw new Error('Token expirado o mal formato');
            }

            const decoded = jwtDecode<JWTPayload>(token);
            const userId = decoded.id;

            if (!userId) {
                throw new Error('Token no contiene ID de usuario válido');
            }

            const { data } = await apiAuthClient.get(`users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return data;

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.error?.message ?? 'Session error');
            }
            throw error;
        }
    },

    deleteUser: async (id: string): Promise<AxiosResponse> => {
        try {
            const respone = await apiClient.delete(`users/${id}`);
            return respone;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.error?.message ?? 'Delete account error');
            }
            throw error;
        }
    }
}