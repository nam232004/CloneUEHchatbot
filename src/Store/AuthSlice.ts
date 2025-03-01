import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User } from '../Components/Types/Auth';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';
const USERS_KEY = 'users_db';

const initializeUsersDB = () => {
    if (!localStorage.getItem(USERS_KEY)) {
        localStorage.setItem(USERS_KEY, JSON.stringify([]));
    }
};
initializeUsersDB();

const getUsers = (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem(USER_DATA_KEY) || 'null'),
    token: localStorage.getItem(AUTH_TOKEN_KEY) || null,
    isLoading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            initializeUsersDB();

            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                throw new Error('Email hoặc mật khẩu không chính xác');
            }

            const token = `mock-token-${Date.now()}`;

            localStorage.setItem(AUTH_TOKEN_KEY, token);
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));

            return { user, token };
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Đăng nhập thất bại');
        }
    }
);
export const register = createAsyncThunk(
    'auth/register',
    async (data: { registerFirstName: string; registerLastName: string; registerEmail: string; registerPassword: string }, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            initializeUsersDB();

            const users = getUsers();
            if (users.some(user => user.email === data.registerEmail)) {
                throw new Error('Email đã được sử dụng');
            }

            const newUser: User = {
                id: `${Date.now()}`,
                username: `${data.registerFirstName.toLowerCase()}_${data.registerLastName.toLowerCase()}`,
                firstName: data.registerFirstName,
                lastName: data.registerLastName,
                email: data.registerEmail,
                password: data.registerPassword
            };

            users.push(newUser);
            saveUsers(users);

            const token = `mock-token-${Date.now()}`;

            localStorage.setItem(AUTH_TOKEN_KEY, token);
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser));

            return { user: newUser, token };
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Đăng ký thất bại');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem(AUTH_TOKEN_KEY);
            localStorage.removeItem(USER_DATA_KEY);
        },
        clearError: (state) => {
            state.error = null;
        },
        updateUserInAuth: (state, action) => {
            state.user = action.payload;
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(action.payload));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, clearError, updateUserInAuth } = authSlice.actions;
export default authSlice.reducer;
