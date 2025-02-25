export const InputChatBox = () => {
    return (
        <div className="relative">
            <textarea
                rows={2}
                placeholder="Nhập tin nhắn..."
                className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:outline"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full bg-secondary p-2 text-gray-500" title="send">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
            </button>
        </div>
    )
}
