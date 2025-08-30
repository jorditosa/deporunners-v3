import { isAxiosError } from 'axios';
import { apiOldClient } from '../api/client';
import { Event } from '../interfaces/events.interface';

export const eventsActions = {


    getAllEvents: async (): Promise<Event[] | undefined> => {
        try {
            const { data } = await apiOldClient.get(`events`);
            return data.events
        } catch (error) {
            if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        }
    }
}