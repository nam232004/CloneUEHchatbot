export interface Chat {
    id: string;
    message: string;
    sender: 'user' | 'assistant';
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
    sender: 'user' | 'assistant';
}

export interface InputChatBoxProps {
    currentChatId: string | null;
}
export interface ChatBoxMainProps {
    onOpenSidebar: () => void;
}