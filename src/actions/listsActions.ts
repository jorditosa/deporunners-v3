import { isAxiosError } from 'axios';
import { apiClient } from '../api/client';
import { ListAddingForm, Training } from '../interfaces/lists.interface';

export const listsActions = {

    getAllTrainingsLists: async (): Promise<Training[] | undefined> => {
        try {
            const { data } = await apiClient.get(`trainings?pagination[pageSize]=100`);
            const sorted = data.data.sort((a: Training, b: Training) => a.id - b.id);
            return sorted
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
        }
    },

    getAllTrekkingsLists: async (): Promise<Training[] | undefined> => {
        try {
            const { data } = await apiClient.get(`trekkings?pagination[pageSize]=100`);
            const sorted = data.data.sort((a: Training, b: Training) => a.id - b.id);
            return sorted
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
        }
    },

    addTraining: async (formData: ListAddingForm): Promise<unknown> => {
        try {
            const { data } = await apiClient.get(`trainings`, formData);
            return data
        } catch (error) {
             if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
        }
    },

    deleteTraining: async (id: string ): Promise<unknown> => {
        try {
            const { data } = await apiClient.delete(`trainings/${id}`);
            return data
        } catch (error) {
             if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
        }
    },

    addTrekking: async (formData: ListAddingForm): Promise<unknown> => {
        try {
            const { data } = await apiClient.get(`trekkings`, formData);
            return data
        } catch (error) {
             if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
        }
    },

    deleteTrekking: async (id: string ): Promise<unknown> => {
        try {
            const { data } = await apiClient.delete(`trekkings/${id}`);
            return data
        } catch (error) {
             if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
        }
    },
}