import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { ChatMessage } from "./ChatMessage";
import { ChatBoxMainProps } from '../Types/Chat';

export const ChatBoxMain: React.FC<ChatBoxMainProps> = ({ onOpenSidebar }) => {
    const { chatHistories, currentChatId } = useSelector((state: RootState) => state.chat);
    const currentChat = chatHistories.find(chat => chat.id === currentChatId);

    return (
        <div className="flex-1 overflow-y-auto p-6">
            <div className=" md:hidden text-primary text-lg mb-4 text-center" onClick={onOpenSidebar}>Mở danh sách chat</div>

            <ChatMessage
                id="welcome"
                message="Xin chào! Tôi có hehe gì cho bạn aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa?"
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
    );
}