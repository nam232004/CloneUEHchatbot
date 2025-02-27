export interface NavState {
    activeIndex: number | null;
}
export interface NavItem {
    name: string;
    icon: React.ReactNode;
    to: string;
}