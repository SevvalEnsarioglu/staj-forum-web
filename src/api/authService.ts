import apiClient from './apiService';
import type { RegisterRequest, LoginRequest, AuthResponse } from '../types/auth';

export const authService = {
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', data);
        return response.data;
    },

    getUser: async (id: number): Promise<any> => {
        const response = await apiClient.get(`/users/${id}`);
        return response.data;
    }
};
