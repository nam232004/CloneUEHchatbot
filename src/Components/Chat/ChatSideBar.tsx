import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { createNewChat, removeChat, setCurrentChat } from "../../Store/ChatSlice";
import { useState } from "react";

export const ChatSidebar = ({ isSidebarReponsive, setIsSidebarReponsive }: {
    isSidebarReponsive: boolean;
    setIsSidebarReponsive: (value: boolean) => void;
}) => {
    const dispatch = useDispatch();
    const { chatHistories, currentChatId } = useSelector((state: RootState) => state.chat);
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleCreateNewChat = () => {
        dispatch(createNewChat());
        setShowOptions(false);
    };

    const handleSelectChat = (chatId: string) => {
        dispatch(setCurrentChat(chatId));
        setShowOptions(false);
    };

    return (
        <div className={`${isSidebarReponsive ? 'block' : 'hidden'} md:block w-full justify-between md:w-1/5 p-6 border-r`}>

            <div className="flex justify-between border-b py-4 options-container relative">
                <div className="hidden md:flex items-center space-x-2">
                    <span className="font-bold whitespace-nowrap">Lịch sử chat</span>
                    <div className="bg-secondary text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {chatHistories.length}
                    </div>
                </div>

                <div className="flex justify-end w-full items-center">
                    <button
                        onClick={toggleOptions}
                        title="create new chat"
                        className={`
                            flex-1 md:flex-none transition-all duration-300 p-1.5 bg-primary text-white
                            ${isSidebarReponsive && window.innerWidth < 768 ?
                                'py-3 text-center text-white rounded bg-primary flex items-center justify-center' :
                                'md:rounded-full md:flex md:items-center md:justify-center'
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="hidden md:block size-2"
                        >
                            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                        </svg>
                        <span className="md:hidden font-bold">Tạo trò chuyện mới</span>
                    </button>

                    <button
                        onClick={() => setIsSidebarReponsive(false)}
                        className="md:hidden p-3 hover:bg-secondary/80 rounded-full ml-2"
                        title="Quay về"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                </div>

                {showOptions && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-lg mt-2 overflow-hidden z-50">
                        <button
                            onClick={handleCreateNewChat}
                            className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>
                            <span className="text-sm font-medium">Tư vấn tuyển sinh</span>
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-4 h-[calc(100vh-120px)] overflow-y-auto scrollbar-smooth scrollbar-thin">
                {chatHistories.map((chat) => (
                    <div
                        key={chat.id}
                        className={`pt-4 pb-5 px-5 rounded-lg group mb-4 cursor-pointer
                            ${chat.id === currentChatId ? 'bg-primary/10' : 'bg-secondary hover:bg-secondary/80'}`}
                        onClick={() => handleSelectChat(chat.id)}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-bold line-clamp-1">{chat.title}</span>
                            <button
                                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-secondary/80 rounded-full p-1"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(removeChat(chat.id));
                                }}
                                title="remove chat"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                        <span className="line-clamp-2 text-sm text-gray-600">
                            {chat.messages[chat.messages.length - 1]?.message || "Chưa có tin nhắn"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};