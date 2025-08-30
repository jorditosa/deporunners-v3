import { isAxiosError } from "axios";
import { apiWPClient } from "../api/client";


export const postsActions = {

    getAllPosts: async () => {

        try {
            const { data } = await apiWPClient.get(`posts`);
            return data
        } catch (error) {
            if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        }
    },
}