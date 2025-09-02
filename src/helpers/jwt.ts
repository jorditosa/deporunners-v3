import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "../interfaces/auth.interface";

export const isTokenValidFormat = (token: string): boolean => {
    try {
        if (!token) return false;
        const decoded = jwtDecode<JWTPayload>(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime && !!decoded.id;
    } catch {
        return false;
    }
};