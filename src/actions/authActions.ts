import { isAxiosError } from 'axios';
import { apiClient } from '../api/client';
import { LoginFormData } from '../interfaces/auth.interface';

export const authActions = {


    login: async (formData: LoginFormData): Promise<any> => {
        const {email, password} = formData;
        try {
            const {data} = await apiClient.post(
                `auth/local?filters[email][$eq]=${email}?populate=*`,
                {
                    identifier:email,
                    password: password
                }
            );
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
        }
    }
}