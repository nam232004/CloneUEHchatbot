export interface Chat {
    id: string;
    message: string;
    role: 'user' | 'botchat';
    timestamp: number;
}

export interface ChatHistory {
    id: string;
    title: string;
    messages: Chat[];
    timestamp: number;
}

export interface ChatState {
    chatHistories: ChatHistory[];
    currentChatId: string | null;
}

export interface ChatMessageProps {
    id: string;
    message: string;
    role: 'user' | 'botchat';
}

export interface InputChatBoxProps {
    currentChatId: string | null;
}
export interface ChatBoxMainProps {
    onOpenSidebar: () => void;
}