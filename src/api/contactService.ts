import apiClient from './apiService';

export interface CreateContact {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
    isRead: boolean;
}
export interface CreateTopic {
    title: string;
    content: string;
    authorName: string;
}

export interface TopicMessage {
    id: number;
    title: string;
    content: string;
    authorName: string;
    createdAt: string;
}
export const sendContactMessage = async (contact: CreateContact): Promise<ContactMessage> => {
    const response = await apiClient.post<ContactMessage>('/contact', contact);
    return response.data;
};


export const sendTopicMessage = async (topic: CreateTopic): Promise<TopicMessage> => {
    const response = await apiClient.post<TopicMessage>('/forum/topics', topic);
    return response.data;
};

