export interface NavState {
    activeIndex: number | null;
}
export interface NavItem {
    name: string;
    icon: string;
    to: string;
}