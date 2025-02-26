import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage, createNewChat } from '../../Store/ChatSlice';
import { v4 as uuidv4 } from 'uuid';
import { InputChatBoxProps } from '../Types/Chat';

export const InputChatBox: React.FC<InputChatBoxProps> = ({ currentChatId }) => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const chatId = currentChatId || Date.now().toString();

        if (!currentChatId) {
            dispatch(createNewChat());
        }

        dispatch(addMessage({
            chatId,
            message: {
                id: uuidv4(),
                message: message.trim(),
                role: 'user',
                timestamp: Date.now()
            }
        }));

        setTimeout(() => {
            dispatch(addMessage({
                chatId,
                message: {
                    id: uuidv4(),
                    message: "đây là tin nhắn hehe",
                    role: 'botchat',
                    timestamp: Date.now()
                }
            }));
        }, 1000);

        setMessage('');
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập tin nhắn..."
                className="w-full p-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full bg-secondary p-2 text-gray-500 hover:bg-secondary/80"
                title="send"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                </svg>
            </button>
        </form>
    );
};