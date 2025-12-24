import React, {
    PropsWithChildren,
    useState,
    useEffect
} from 'react';
import LoginModal from "@/Components/LoginModal";
import { useKeyboardShortcut } from "@/useKeyboardShortcut";

export default function Footer({ children }: PropsWithChildren) {
    const [showLogin, setShowLogin] = useState<boolean>(false);

    useKeyboardShortcut(
        {
            ctrl: true,
            meta: true,
            key: 'Enter',
        },
        () => setShowLogin(true)
    );

    return (
        <div className="flex items-center justify-center w-full mt-auto py-2 border-t bg-gray-500 text-white">
            <div className='container flex justify-end py-2'>
                <a href="#" className="inline-flex items-center gap-2 text-xl text-medium text-white">
                    sinch.pro
                    <svg onClick={(e) => setShowLogin(true)} className="w-6 h-6 text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
                    </svg>
                </a>
            </div>

            <LoginModal
                show={showLogin}
                onClose={() => setShowLogin(false)}
            />
        </div>
    );
}
