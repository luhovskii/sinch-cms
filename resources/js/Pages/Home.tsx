import React from "react";
import { Head } from '@inertiajs/react';
import MenuNavigation from "@/Components/MenuNavigation";
import NewsLatest from "@/Components/NewsLatest";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    published_at: string;
    feature_image: string;
}

interface PostProps {
    posts: BlogPost[],
}

const Home = ({ posts }: PostProps) => {
    return (
        <>
            <Head title="Home" />

            <MenuNavigation />

            <NewsLatest posts={posts} />

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h1 className="text-3xl font-semibold text-gray-900">
                    Welcome to the Homepage.
                </h1>
            </div>
        </>
    );
}

export default Home;
