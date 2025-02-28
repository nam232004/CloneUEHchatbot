export interface User {
    id: string;
    username?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}