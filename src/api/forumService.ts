import apiClient from './apiService';

export interface Topic {
    id: number;
    title: string;
    content: string;
    authorName: string;
    createdAt: string;
    updatedAt: string | null;
    viewCount: number;
    replyCount: number;
}

export interface CreateTopic {
    title: string;
    content: string;
    authorName: string;
}

export interface PagedResult<T> {
    data: T[];
    pagination: {
        page: number;
        pageSize: number;
        totalCount: number;
        totalPages: number;
    };
}

// Konuları listele
export const getTopics = async (
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = 'newest',
    search?: string
): Promise<PagedResult<Topic>> => {
    const response = await apiClient.get('/forum/topics', {
        params: { page, pageSize, sortBy, search },
    });
    return response.data;
};

// Konu detayı getir
export const getTopicById = async (id: number): Promise<Topic> => {
    const response = await apiClient.get(`/forum/topics/${id}`);
    return response.data;
};

// Yeni konu oluştur
export const createTopic = async (topic: CreateTopic): Promise<Topic> => {
    const response = await apiClient.post('/forum/topics', topic);
    return response.data;
};

// --- Yanıt (Reply) İşlemleri ---

export interface Reply {
    id: number;
    topicId: number;
    content: string;
    authorName: string;
    createdAt: string;
    updatedAt: string | null;
}

export interface CreateReply {
    content: string;
    authorName: string;
}

// Yanıtları listele
export const getReplies = async (
    topicId: number,
    page: number = 1,
    pageSize: number = 20,
    sortBy: string = 'oldest'
): Promise<PagedResult<Reply>> => {
    const response = await apiClient.get(`/forum/topics/${topicId}/replies`, {
        params: { page, pageSize, sortBy },
    });
    return response.data;
};

// Yeni yanıt oluştur
export const createReply = async (topicId: number, reply: CreateReply): Promise<Reply> => {
    const response = await apiClient.post(`/forum/topics/${topicId}/replies`, reply);
    return response.data;
};

// Kullanıcının konularını getir
export const getUserTopics = async (
    userId: number,
    page: number = 1,
    pageSize: number = 10
): Promise<PagedResult<Topic>> => {
    const response = await apiClient.get(`/forum/users/${userId}/topics`, {
        params: { page, pageSize },
    });
    return response.data;
};

// Kullanıcının yorumlarını getir
export const getUserReplies = async (
    userId: number,
    page: number = 1,
    pageSize: number = 10
): Promise<PagedResult<Reply>> => {
    const response = await apiClient.get(`/forum/users/${userId}/replies`, {
        params: { page, pageSize },
    });
    return response.data;
};

// Topic güncelle
export const updateTopic = async (id: number, title: string, content: string): Promise<Topic> => {
    const response = await apiClient.put(`/forum/topics/${id}`, { title, content });
    return response.data;
};

// Topic sil
export const deleteTopic = async (id: number): Promise<void> => {
    await apiClient.delete(`/forum/topics/${id}`);
};

// Reply güncelle
export const updateReply = async (id: number, content: string, authorName: string): Promise<Reply> => {
    const response = await apiClient.put(`/forum/replies/${id}`, { content, authorName });
    return response.data;
};

// Reply sil
export const deleteReply = async (id: number): Promise<void> => {
    await apiClient.delete(`/forum/replies/${id}`);
};
