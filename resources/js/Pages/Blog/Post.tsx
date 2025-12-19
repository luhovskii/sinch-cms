import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MenuNavigation from "@/Components/MenuNavigation";
import PostEditorTinyMCE from "@/Components/PostEditorTinyMCE";
import FeatureImageUploader from "@/Components/FeatureImageUploader";
import { useForm } from "@inertiajs/react";

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
    post: BlogPost,
}

const formatYMD = (date: string) => {
    return new Date(date).toISOString().split('T')[0];
}

const Post: React.FC<PostProps> = ({ post }) => {
    const [isEditing, setIsEditing] = useState(false);
    const {
        data,
        patch,
        setData,
    } = useForm({
        content: post.content,
        feature_image: post.feature_image
    });

    return (
        <>
            <Head title={post.title} />

            <MenuNavigation />

            <div className="w-full flex flex-col gap-4 justify-start items-center bg-gray-100 min-h-screen mb-12">
                <div className="container w-3/4 flex flex-col gap-4">
                    <Link href="/blog">&larr; Back to blog</Link>
                    <h2 className="text-lg font-bold text-gray-900">
                        {post.title}
                    </h2>


                    {!isEditing && post.feature_image && (
                        <img
                            src={post.feature_image}
                            alt={post.title}
                            className="rounded-2xl mb-6 w-2/4 h-2/4"
                        />
                    )}

                    {isEditing && (<FeatureImageUploader
                        image={data.feature_image}
                        onUploaded={(url) => setData('feature_image', url)}
                    />)}

                    {isEditing ? (
                        <PostEditorTinyMCE
                            content={data.content}
                            onChange={(content) => setData('content', content)}
                            editable={isEditing}
                        />
                    ): (
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{__html: post.content}}
                        />
                    )}
                    <div>
                        <time dateTime={formatYMD(post.published_at)}>
                            {formatYMD(post.published_at)}
                        </time>
                    </div>
                    <div className="container flex flex-row flex-wrap gap-2">
                        {isEditing ? (
                            <button
                                className="bg-blue-700 text-base text-white font-medium px-4 py-2 rounded shadow"
                                onClick={() => patch(`/blog/${post.slug}`, {
                                    preserveScroll: true,
                                    onSuccess: () => setIsEditing(false),
                                })}
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                className="bg-green-700 text-base text-white font-medium px-4 py-2 rounded shadow"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit post content
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;
