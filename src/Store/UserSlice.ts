import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../Components/Types/Auth';
import { updateUserInAuth } from './AuthSlice';

// const USER_DATA_KEY = 'user_data';
const USERS_KEY = 'users_db';

const getUsers = (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

interface UpdateUserData {
    id: string;
    firstName: string;
    lastName: string;
    username?: string;
}

export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async (data: UpdateUserData, { dispatch, rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const users = getUsers();
            const userIndex = users.findIndex(u => u.id === data.id);

            if (userIndex === -1) {
                throw new Error('Không tìm thấy người dùng');
            }

            const updatedUser = {
                ...users[userIndex],
                ...data
            };
            users[userIndex] = updatedUser;

            saveUsers(users);

            dispatch(updateUserInAuth(updatedUser));

            return updatedUser;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Cập nhật thất bại');
        }
    }
);

interface UserState {
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;
}

const initialState: UserState = {
    isLoading: false,
    error: null,
    successMessage: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateUserProfile.fulfilled, (state) => {
                state.isLoading = false;
                state.successMessage = 'Cập nhật thông tin thành công';
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export const { clearMessages } = userSlice.actions;
export default userSlice.reducer; 