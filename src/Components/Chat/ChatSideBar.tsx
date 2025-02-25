
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { addChat, removeChat } from "../../Store/ChatSlice";
import { InputChatBox } from "./InputChatBox";
import { ChatBoxMain } from "./ChatBoxMain";

export const ChatSideBar: React.FC = () => {
    const dispatch = useDispatch();
    const chats = useSelector((state: RootState) => state.chat.chats);

    return (
        <>
            <div className="flex h-screen">
                <div className="hidden md:block w-1/5 p-6 border-r">
                    <div className="flex justify-between border-b py-4">
                        <div className="flex items-center space-x-2">
                            <span className="font-bold">Lịch sử chat</span>
                            <div className="bg-secondary text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {chats.length}
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                dispatch(addChat({ id: Date.now().toString(), title: "Cuộc trò chuyện mới", content: "Nội dung..." }))
                            }
                            title="create new chat"
                            className="text-primary rounded-full w-7 h-7 flex items-center justify-center text-center text-xl hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                            </svg>
                        </button>

                    </div>
                    <div className="mt-4">
                        {chats.map((chat) => (
                            <div key={chat.id} className="p-5 bg-secondary rounded-lg group mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold">{chat.title}</span>

                                    <button
                                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        onClick={() => dispatch(removeChat(chat.id))}
                                        title="remove chat"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>


                                    </button>
                                </div>
                                <span className="line-clamp-2">{chat.content}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 flex flex-col h-screen">
                    <ChatBoxMain />
                    <div className="p-4 bg-white border-t border-gray-300 sticky bottom-0 left-0 w-full">
                        <InputChatBox />
                    </div>
                </div>
            </div>

        </>
    );
};
