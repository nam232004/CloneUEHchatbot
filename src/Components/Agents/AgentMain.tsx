import { useState } from 'react';
import { Icons } from '../../assets/Icon/Icon';
import { AgentProps } from '../Types/Agents';
import { EditAgentModal } from './EditAgentModal';
import { useAppDispatch } from '../Hooks/Hooks';
import { deleteAgent, updateAgent } from '../../Store/AgentsSlice';

export const AgentMain = ({ agent }: AgentProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleSave = (updatedAgent: any) => {
        dispatch(updateAgent(updatedAgent));
        setIsEditModalOpen(false);
    };

    const handleDelete = () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa agent này?')) {
            dispatch(deleteAgent(agent.id));
        }
    };

    return (
        <>
            <div
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 group"
            >
                <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                        <h2 className="text-xl font-semibold text-primary hover:text-primary/90">
                            {agent.name}
                        </h2>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                className="p-2 rounded-lg hover:bg-secondary/30 duration-300 text-gray-600 hover:text-primary"
                                onClick={() => setIsEditModalOpen(true)}
                                title="Chỉnh sửa agent"
                            >
                                <Icons.Pen />
                            </button>
                            <button
                                className="p-2 rounded-lg hover:bg-secondary/30 duration-300 text-gray-400 hover:text-red-500"
                                onClick={handleDelete}
                                title="Xóa agent"
                            >
                                <Icons.TrashBin />
                            </button>
                        </div>
                    </div>

                    <span
                        className="text-gray-400 text-sm flex items-center gap-1 mt-2"
                    >
                        <Icons.Language />
                        {agent.language}
                    </span>
                </div>

                <div className="p-4 border-b border-gray-200 min-h-[80px]">
                    <div className="flex items-start gap-2">
                        <div className="text-gray-400 mt-1 flex-shrink-0">
                            <Icons.MultiChat />
                        </div>
                        <div className="text-sm text-gray-600 overflow-hidden">
                            <p className="line-clamp-2">
                                {agent.greetingMessage || 'No greeting message'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 text-sm text-gray-500">
                    <div className="flex justify-between items-center">
                        <div className='text-gray-400 flex items-center gap-1'>
                            <Icons.Date />
                            Created: {new Date(agent.createdAt || '').toLocaleDateString('vi-VN')}
                        </div>
                        <div className='text-gray-400 flex items-center gap-1'>
                            <Icons.Date />
                            Updated: {new Date(agent.updatedAt || '').toLocaleDateString('vi-VN')}
                        </div>
                    </div>
                </div>
            </div>

            <EditAgentModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                agent={agent}
                onSave={handleSave}
            />
        </>
    );
};
