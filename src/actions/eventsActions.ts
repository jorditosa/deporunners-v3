import { isAxiosError } from 'axios';
import { apiOldClient } from '../api/client';
import { Event } from '../interfaces/events.interface';

export const eventsActions = {


    getAllEvents: async (): Promise<Event[]> => {
        try {
            const { data } = await apiOldClient.get(`events`);
            return data.events || []
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
            throw new Error('Error desconocido al obtener eventos');
        }
    }
}