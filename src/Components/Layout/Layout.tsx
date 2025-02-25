import { ChatBoxMain } from "../Chat/ChatBoxMain";
import { ChatSideBar } from "../Chat/ChatSideBar";
import { InputChatBox } from "../Chat/InputChatBox";
import { NavHome } from "./NavHome";


export const Layout = () => {
    return (
        <>
            <NavHome />
            <div className="flex h-screen">
                <div className="hidden md:block w-1/5 p-6 border-r">
                    <ChatSideBar />
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
