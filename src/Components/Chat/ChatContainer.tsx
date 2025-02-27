import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { createNewChat } from "../../Store/ChatSlice";
import { ChatBoxMain } from "./ChatBoxMain";
import { InputChatBox } from "./InputChatBox";
import { useEffect, useState } from "react";
import { ChatSidebar } from "./ChatSideBar";

export const ChatContainer: React.FC = () => {
    const dispatch = useDispatch();
    const [isSidebarReponsive, setIsSidebarReponsive] = useState(false);
    const { chatHistories, currentChatId } = useSelector((state: RootState) => state.chat);
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsSidebarReponsive(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!hasInitialized && chatHistories.length === 0 && currentChatId === null) {
            const timer = setTimeout(() => {
                console.log("Creating initial chat");
                dispatch(createNewChat());
                setHasInitialized(true);
            }, 0);

            return () => clearTimeout(timer);
        }
    }, [chatHistories.length, currentChatId, dispatch, hasInitialized]);

    useEffect(() => {
        return () => {
            setHasInitialized(false);
        };
    }, []);

    return (
        <div className="h-screen flex">
            <ChatSidebar
                isSidebarReponsive={isSidebarReponsive}
                setIsSidebarReponsive={setIsSidebarReponsive}
            />

            <main className={`
                ${isSidebarReponsive ? 'hidden' : 'flex'} 
                md:flex flex-1 flex-col 
                relative  
                h-screen
            `}>
                <div className="absolute inset-0 flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                        <ChatBoxMain onOpenSidebar={() => setIsSidebarReponsive(true)} />
                    </div>
                    <div className="sticky bottom-0 bg-white border-t border-gray-300">
                        <InputChatBox currentChatId={currentChatId} />
                    </div>
                </div>
            </main>
        </div>
    );
};