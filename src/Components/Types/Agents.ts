export interface Agent {
    id: number;
    name: string;
    language: string;
    greetingMessage: string;
    systemMessage?: string;
    errorMessage?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AgentProps {
    agent: Agent;
}
