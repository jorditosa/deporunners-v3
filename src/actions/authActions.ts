import { AxiosResponse, isAxiosError } from 'axios';
import { apiClient } from '../api/client';
import { LoginApiResponse, LoginFormData, RegisterFormData } from '../interfaces/auth.interface';

export const authActions = {


    login: async (formData: LoginFormData): Promise<AxiosResponse<LoginApiResponse>> => {
        const {email, password} = formData;
        try {
            const response = await apiClient.post<LoginApiResponse>(
                `auth/local?filters[email][$eq]=${email}?populate=*`,
                {
                    identifier:email,
                    password: password
                }
            );
            return response
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error.message ?? "Login error");
            }
            throw error
        }
    },

    createAccount: async (formData: Pick<RegisterFormData, 'email' | 'password' | 'repeatPassword'>): Promise<AxiosResponse> => {
        const {email, password, repeatPassword} = formData;
        try {
            const response = await apiClient.post(
                `auth/local?filters[email][$eq]=${email}?populate=*`,
                {
                    email
                }
            );
            return response
        } catch (error) {
             if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error.message ?? "Register error");
            }
            throw error
        }
    },

    confirmAccount: async (formData: Pick<RegisterFormData, 'email' | 'confirmCode'>): Promise<AxiosResponse> => {
        const {email, confirmCode} = formData;
        try {
            const response = await apiClient.post(
                `auth/local?filters[email][$eq]=${email}?populate=*`,
                {
                    email
                }
            );
            return response
        } catch (error) {
             if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error.message ?? "Register error");
            }
            throw error
        }
    }
}