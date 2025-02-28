import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Agent } from '../Components/Types/Agents';

// Khóa để lưu agents trong localStorage
const AGENTS_STORAGE_KEY = 'agents_data';

// Lấy dữ liệu agents từ localStorage hoặc sử dụng mảng rỗng
const getInitialAgents = (): Agent[] => {
    const storedAgents = localStorage.getItem(AGENTS_STORAGE_KEY);
    if (storedAgents) {
        return JSON.parse(storedAgents);
    }
    return [];
};

// Lưu agents vào localStorage
const saveAgentsToStorage = (agents: Agent[]) => {
    localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(agents));
};

interface AgentsState {
    agents: Agent[];
    isLoading: boolean;
    error: string | null;
}

const initialState: AgentsState = {
    agents: getInitialAgents(),
    isLoading: false,
    error: null
};

const agentsSlice = createSlice({
    name: 'agents',
    initialState,
    reducers: {
        // Thêm agent mới
        addAgent: (state, action: PayloadAction<Agent>) => {
            state.agents.push(action.payload);
            saveAgentsToStorage(state.agents);
        },

        // Cập nhật agent
        updateAgent: (state, action: PayloadAction<Agent>) => {
            const index = state.agents.findIndex(agent => agent.id === action.payload.id);
            if (index !== -1) {
                state.agents[index] = {
                    ...action.payload,
                    updatedAt: new Date().toISOString()
                };
                saveAgentsToStorage(state.agents);
            }
        },

        // Xóa agent
        deleteAgent: (state, action: PayloadAction<number>) => {
            state.agents = state.agents.filter(agent => agent.id !== action.payload);
            saveAgentsToStorage(state.agents);
        },

        // Set danh sách agents (dùng khi khởi tạo)
        setAgents: (state, action: PayloadAction<Agent[]>) => {
            state.agents = action.payload;
            saveAgentsToStorage(state.agents);
        },

        // Clear errors
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const {
    addAgent,
    updateAgent,
    deleteAgent,
    setAgents,
    clearError
} = agentsSlice.actions;

export default agentsSlice.reducer; 