import React from 'react';
import SwiperNews from '@/Components/SwiperNews';

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

const NewsLatest = ({ posts }: PostProps) => {
    return (
        <>
            <div className="container mx-auto py-[40px] md:py-[80px]">
                <div className="flex flex-col gap-4 text-center mb-[40px]">
                    <span className="font-montserrat font-base font-medium leading-6">
                        Новини
                    </span>
                    <h1 className="text-[42px] leading-[52px] font-bold">
                        Будьте в курсі всіх новин
                    </h1>
                </div>
                <SwiperNews posts={posts} />
            </div>
        </>
    );
}

export default NewsLatest;
