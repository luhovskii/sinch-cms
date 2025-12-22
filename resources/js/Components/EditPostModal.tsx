import React, {useState, useEffect} from 'react';
import Modal from '@/Components/Modal';
import { useForm, router } from '@inertiajs/react';

export interface Post {
    id: number;
    title: string;
    excerpt: string;
    feature_image?: string | null;
}

interface Props {
    post: Post | null;
    show: boolean;
    onClose: () => void;
}

export default function EditPostModal({
    post,
    show,
    onClose
}: Props) {
    const { data, setData, post: submit, processing, errors, reset } = useForm({
        title: post?.title ?? '',
        excerpt: post?.excerpt ?? '',
        feature_image: null as File | null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (post?.feature_image) {
            setPreviewUrl(post.feature_image)
        } else {
            setPreviewUrl(null);
        }
    }, [post]);

    useEffect(() => {
        if (post) {
            setData({
                title: post.title,
                excerpt: post.excerpt,
                feature_image: null,
            });
        }
    }, [post]);

    // reset form when post changes
    if (!post) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post(route('posts.update', post.id), {
            _method: 'patch',
            title: data.title,
            excerpt: data.excerpt,
            feature_image: data.feature_image,
        }, {
            forceFormData: true,
            onSuccess: () => onClose(),
        });
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <Modal show={show} maxWidth="lg" onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">

                <h2 className="text-lg font-semibold">
                    Edit post
                </h2>

                {/* Feature image */}

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Feature image
                    </label>

                    {post.feature_image && (
                        <img
                            src={previewUrl ?? undefined}
                            alt=""
                            className="mb-2 h-32 w-full object-cover rounded"
                        />
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;

                            setData(
                                'feature_image',
                                file
                            );

                            if (file) {
                                const url = URL.createObjectURL(file);
                                setPreviewUrl(url);
                            }
                        }}
                    />
                </div>

                {/* Title */}

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Title
                    </label>

                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />

                    {errors.title && (
                        <div className="text-sm text-red-600">
                            {errors.title}
                        </div>
                    )}
                </div>

                {/* Excerpt */}

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Excerpt
                    </label>

                    <textarea
                        value={data.excerpt}
                        onChange={(e) => setData('excerpt', e.target.value)}
                    />
                </div>

                {/* Actions */}

                <div className="flex justify-end gap-2 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );

}
