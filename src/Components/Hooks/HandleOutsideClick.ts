import { useEffect, RefObject } from 'react';

type Handler = () => void;

export const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, handler: Handler) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ref, handler]);
};