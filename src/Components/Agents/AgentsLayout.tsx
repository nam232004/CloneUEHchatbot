import { useEffect } from 'react';
import { AgentMain } from './AgentMain';
import { useAppDispatch, useAppSelector } from '../Hooks/Hooks';
import { setAgents } from '../../Store/AgentsSlice';

const mockAgents = [
    {
        id: 1,
        name: "General Assistant",
        language: "English, Vietnamese",
        greetingMessage: "A versatile AI assistant capable of handling various tasks and queries",
        createdAt: "2024-03-15",
        updatedAt: "2024-03-20"
    },
    {
        id: 2,
        name: "Code Helper",
        language: "Python, JavaScript, TypeScript",
        greetingMessage: "Specialized in helping with coding tasks and debugging",
        createdAt: "2024-03-16",
        updatedAt: "2024-03-21"
    },
    {
        id: 3,
        name: "Math Tutor",
        language: "English, Vietnamese",
        greetingMessage: "Expert in mathematics, from basic arithmetic to advanced calculus",
        createdAt: "2024-03-17",
        updatedAt: "2024-03-22"
    },
    {
        id: 4,
        name: "Language Teacher",
        language: "English, Vietnamese, French",
        greetingMessage: "Helps with language learning and translation",
        createdAt: "2024-03-18",
        updatedAt: "2024-03-23"
    }
];

export const AgentsLayout = () => {
    const dispatch = useAppDispatch();
    const agents = useAppSelector(state => state.agents.agents);

    useEffect(() => {
        // Khởi tạo dữ liệu mẫu nếu chưa có agents
        if (agents.length === 0) {
            dispatch(setAgents(mockAgents));
        }
    }, [dispatch, agents.length]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Agents</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                    <AgentMain key={agent.id} agent={agent} />
                ))}
            </div>
        </div>
    );
};
