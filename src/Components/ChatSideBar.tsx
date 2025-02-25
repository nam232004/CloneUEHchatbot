
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store";
import { addChat, removeChat } from "../Store/ChatSlide";
import { InputChatBox } from "./InputChatBox";

export const ChatSideBar: React.FC = () => {
    const dispatch = useDispatch();
    const chats = useSelector((state: RootState) => state.chat.chats);

    return (
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
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="md:hidden text-primary text-lg mb-4 text-center">Mở danh sách phát</div>
                    <div className="w-[95%] md:w-1/2 p-4 bg-secondary rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                            <img src="img/logo.png" alt="" className="w-8 h-8 rounded-full" />
                            <span>Assistant</span>
                        </div>
                        <div className="max-w-2xl w-full pt-2">
                            <span>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis aperiam distinctio, molestiae ducimus, quia praesentium consectetur quidem, modi aspernatur atque unde repellendus officia ex architecto qui placeat rerum beatae ab?
                            </span>
                        </div>
                        <div className="flex justify-end text-gray-500 space-x-4 mt-4">
                            <button title="copy">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                                </svg>
                            </button>
                            <button title="edit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>

                            </button>
                            <button title="delete">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white border-t border-gray-300 sticky bottom-0 left-0 w-full">
                    <InputChatBox />
                </div>
            </div>
        </div >
    );
};
