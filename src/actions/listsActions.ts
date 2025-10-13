import { isAxiosError } from 'axios';
import { apiClient } from '../api/client';
import { ListAddingForm, ListItem } from '../interfaces/lists.interface';

export const listsActions = {

    getAllList: async (): Promise<ListItem[] | undefined> => {
        try {
            const { data } = await apiClient.get(`curses?pagination[pageSize]=400`);
            return data.data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
        }
    },

    addToList: async (formData: ListAddingForm): Promise<unknown> => {
        try {
            const { data } = await apiClient.post(`curses`, formData);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
        }
    },

    deleteFromList: async (id: string): Promise<unknown> => {
        try {
            const { data } = await apiClient.delete(`curses/${id}`);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
        }
    },
}