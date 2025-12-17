import React from 'react';
import { Head } from '@inertiajs/react';
import MenuNavigation from "@/Components/MenuNavigation";

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    published_at: string;
}

interface BlogProps {
    posts: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
    const formatYMD = (date: string) => {
        return new Date(date).toISOString().split('T')[0];
    }

    return (
        <>
            <Head title="Blog" />

            <MenuNavigation />

            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-8">
                        Recent posts
                    </h1>

                    <div className="space-y-6">
                        {posts.length === 0 && (
                            <p className="text-gray-500">
                                No posts yet.
                            </p>
                        )}

                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="bg-white rounded-2xl shadow p-6"
                            >
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {post.title}
                                </h2>

                                <p className="text-gray-600 mt-2">
                                    {post.excerpt}
                                </p>

                                <time className="block text-sm text-gray-400 mt-4">
                                    {formatYMD(post.published_at)}
                                </time>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;
