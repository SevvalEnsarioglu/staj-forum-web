import apiClient from './apiService';
import type { RegisterRequest, LoginRequest, AuthResponse } from '../types/auth';

interface User {
    id: number;
    name: string;
    email: string;
}

export const authService = {
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/register', data);
        return response.data as AuthResponse;
    },

    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', data);
        return response.data as AuthResponse;
    },

    getUser: async (id: number): Promise<User> => {
        const response = await apiClient.get<User>(`/users/${id}`);
        return response.data as User;
    }
};