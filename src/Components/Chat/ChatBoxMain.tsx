import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { ChatMessage } from "./ChatMessage";
import { ChatBoxMainProps } from '../Types/Chat';

export const ChatBoxMain: React.FC<ChatBoxMainProps> = ({ onOpenSidebar }) => {
    const { chatHistories, currentChatId } = useSelector((state: RootState) => state.chat);
    const currentChat = chatHistories.find(chat => chat.id === currentChatId);

    return (
        <div className="flex flex-col">
            <div className="md:hidden p-4 border-b">
                <button
                    className="text-primary text-lg w-full text-center hover:bg-gray-50 py-2 rounded-lg transition-colors"
                    onClick={onOpenSidebar}
                >
                    Mở danh sách chat
                </button>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-6">
                <ChatMessage
                    id="welcome"
                    message="Xin chào! Tôi có thể giúp gì cho bạn?"
                    role="botchat"
                />

                {currentChat?.messages.map((msg) => (
                    <ChatMessage
                        key={msg.id}
                        id={msg.id}
                        message={msg.message}
                        role={msg.role}
                    />
                ))}
            </div>
        </div>
    );
}