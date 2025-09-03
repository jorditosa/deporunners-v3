import { isAxiosError } from 'axios';
import { apiOldClient } from '../api/client';
import { Event } from '../interfaces/events.interface';

export const eventsActions = {


    getAllEvents: async (): Promise<Event[]> => {
                    console.log('🍎 Direct fetch starting...');

        try {
            const { data } = await apiOldClient.get(`events`);
            console.log('🍎 Fetch response:', data);

            return data.events || []
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
            throw new Error('Error desconocido al obtener eventos');
        }
    },

    geteventById: async (id: string): Promise<Event> => {
        try {
            const { data } = await apiOldClient.get(`events/${id}`);
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
            throw new Error('Error desconegut al obtenir esedeveniments');
        }
    },

    getAllRaces: async (): Promise<Event[]> => {
        try {
            const { data } = await apiOldClient.get(`events`);
            const races = data.events
                .filter((event: Event) => event.categories[0].name === 'Curses')
            return races || []
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
            throw new Error('Error desconocido al obtener eventos');
        }
    }
}