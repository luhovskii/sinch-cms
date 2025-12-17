import React from "react";
import { Head } from '@inertiajs/react';
import MenuNavigation from "@/Components/MenuNavigation";

const Home: React.FC = () => {
    return (
        <>
            <Head title="Home" />

            <MenuNavigation />

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h1 className="text-3xl font-semibold text-gray-900">
                    Welcome to the Homepage.
                </h1>
            </div>
        </>
    );
}

export default Home;
