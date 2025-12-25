import apiClient from './apiService';

export interface ChatRequest {
    message: string;
    conversationId?: string;
}

export interface ChatResponse {
    response: string;
    conversationId: string;
    timestamp: string;
}

export const sendChatMessage = async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await apiClient.post('/chat', request);
    return response.data;
};
