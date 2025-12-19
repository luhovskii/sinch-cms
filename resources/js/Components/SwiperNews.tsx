import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from '@inertiajs/react';

import 'swiper/css';

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

const SliderNews = ({ posts }: PostProps) => {
	return (
		<Swiper
			spaceBetween={20}
			slidesPerView={3}
			onSlideChange={() => console.log('slide change')}
			onSwiper={(swiper) => console.log(swiper)}
            loop={true}
		>
            {posts.map(post => {
                return (
                    <SwiperSlide>
                        <article className="flex flex-col border rounded-lg overflow-hidden">
                            <div className="flex mb-4">
                                {post.feature_image && (
                                    <img
                                        src={post.feature_image}
                                        alt={post.title}
                                        className="object-cover w-full h-64"
                                    />
                                )}
                                {!post.feature_image && (
                                    <div className="w-full h-64 flex items-center justify-center text-ls font-medium bg-gray-100 text-gray-400">
                                        placeholder
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-4 px-4 pb-4">
                                <h3 className="text-lg text-gray-900 font-medium">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="hover:underline"
                                    >
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="text-base text-gray-900">
                                    {post.excerpt}
                                </p>
                            </div>
                        </article>
                    </SwiperSlide>
                );
            })}
		</Swiper>
	);
};

export default SliderNews;
