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

export interface CVAnalysisResponse {
    analysis: string;
}

export const analyzeCV = async (cvText: string): Promise<CVAnalysisResponse> => {
    const response = await apiClient.post('/chat/analyze-cv', { cvText });
    return response.data;
};
