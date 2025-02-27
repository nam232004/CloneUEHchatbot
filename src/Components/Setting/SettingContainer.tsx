import { useState } from 'react';
import { SettingSidebar } from './SettingSideBar';
import { SettingContent } from './SettingContent';

export const SettingContainer = () => {
    const [activeSection, setActiveSection] = useState('profile'); // profile, security, notification, etc.
    const [isSidebarResponsive, setIsSidebarResponsive] = useState(false);

    return (
        <div className="h-screen flex overflow-hidden">
            <SettingSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                isSidebarResponsive={isSidebarResponsive}
                setIsSidebarResponsive={setIsSidebarResponsive}
            />

            <main className={`
                ${isSidebarResponsive ? 'hidden' : 'flex'} 
                md:flex flex-1 
                relative
                h-screen
            `}>
                <div className="absolute inset-0 flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                        <SettingContent
                            activeSection={activeSection}
                            onOpenSidebar={() => setIsSidebarResponsive(true)}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};