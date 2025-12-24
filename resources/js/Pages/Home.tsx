import React from "react";
import { Head } from '@inertiajs/react';
import MenuNavigation from "@/Components/MenuNavigation";
import NewsLatest from "@/Components/NewsLatest";
import Footer from '@/Components/Footer';

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

            <Footer>
                sinch.pro
            </Footer>
        </>
    );
}

export default Home;
