export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}
