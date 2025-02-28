import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Agent } from '../Types/Agents';
import { ButtonCPN } from '../Button/Button';

interface EditAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
    agent: Agent;
    onSave: (updatedAgent: Agent) => void;
}

const languages = [
    "English",
    "Vietnamese",
];

export const EditAgentModal = ({ isOpen, onClose, agent, onSave }: EditAgentModalProps) => {
    const [formData, setFormData] = useState({
        name: agent.name,
        language: agent.language,
        greetingMessage: agent.greetingMessage,
        systemMessage: agent.systemMessage || '',
        errorMessage: agent.errorMessage || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        onSave({
            ...agent,
            ...formData,
            updatedAt: new Date().toISOString()
        });
        onClose();
    };

    const modalFooter = (
        <>
            <ButtonCPN
                type="button"
                variant="secondary"
                onClick={onClose}
            >
                Hủy
            </ButtonCPN>
            <ButtonCPN
                type="button"
                variant="primary"
                onClick={handleSubmit}
            >
                Lưu thay đổi
            </ButtonCPN>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Chỉnh sửa Agent"
            footer={modalFooter}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tên
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:border-primary"
                        placeholder="Tên"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tin nhắn chào
                    </label>
                    <textarea
                        name="greetingMessage"
                        value={formData.greetingMessage}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-2 border rounded-lg focus:border-primary"
                        placeholder="Nhập tin nhắn chào"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tin nhắn hệ thống
                    </label>
                    <textarea
                        name="systemMessage"
                        value={formData.systemMessage}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-2 border rounded-lg focus:border-primary"
                        placeholder="Nhập tin nhắn hệ thống"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tin nhắn lỗi
                    </label>
                    <textarea
                        name="errorMessage"
                        value={formData.errorMessage}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-2 border rounded-lg focus:border-primary"
                        placeholder="Nhập tin nhắn lỗi"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngôn ngữ
                    </label>
                    <select
                        name="language"
                        title="Ngôn ngữ"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:border-primary"
                    >
                        {languages.map(lang => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </Modal>
    );
}; 