import { useEffect } from 'react';

type ShortcutHandler = () => void;

export function useKeyboardShortcut(
    keys: {
        ctrl?: boolean;
        meta?: boolean;
        key: string;
    },
    handler: ShortcutHandler
) {
    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement;
            event.preventDefault();
            event.stopPropagation();

            if (
                target.tagName === 'input' ||
                target.tagName === 'textarea' ||
                target.isContentEditable
            ) {
                return;
            }

            const isCtrl = keys.ctrl ? event.ctrlKey : true;
            const isMeta = keys.meta ? event.metaKey : true;

            if (
                isCtrl &&
                isMeta &&
                event.key.toLowerCase() === keys.key.toLowerCase()
            ) {
                event.preventDefault();
                handler();
            }
        }

        document.addEventListener('keydown', listener);

        return () => {
            document.removeEventListener('keydown', listener);
        }
    }, [handler, keys]);
}
