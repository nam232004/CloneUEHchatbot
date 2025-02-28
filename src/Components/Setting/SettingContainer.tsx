import { useState } from 'react';
import { SettingSidebar } from './SettingSideBar';
import { SettingContent } from './SettingContent';

export const SettingContainer = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex overflow-hidden relative">
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <SettingSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            {/* Main Content */}
            <main className="flex-1 relative h-screen">
                <div className="absolute inset-0 flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                        <SettingContent
                            activeSection={activeSection}
                            onOpenSidebar={() => setIsSidebarOpen(true)}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};