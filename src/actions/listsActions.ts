import { isAxiosError } from 'axios';
import { apiClient } from '../api/client';
import { Training } from '../interfaces/lists.interface';

export const listsActions = {

    getAllTrainingsLists: async (): Promise<Training[] | undefined> => {
        try {
            const { data } = await apiClient.get(`trainings?pagination[pageSize]=100`);
            const sorted = data.data.sort((a: Training, b: Training) => a.id - b.id);
            return sorted
        } catch (error) {
            if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        }
    }
}