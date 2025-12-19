import React from 'react';

interface Props {
    image?: string | null;
    onUploaded: (url: string) => void;
    disabled?: boolean;
}

export default function FeatureImageUploader({
    image,
    onUploaded,
    disabled = false,
}: Props) {
    const upload = async (file: File) => {
        const token = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content');

        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/uploads/feature-image', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': token ?? '',
                'accept': 'application/json',
            },
            body: formData,
        });

        const data = await response.json();

        onUploaded(data.url);
    }

    return (
        <div className="space-y-2">
            {image && (<img
                src={image}
                alt="Feature image"
                className="rounded-xl max-h-64 object-cover"
            />)}

            {!disabled && (<input
                name="file"
                type="file"
                accept="image/*"
                onChange={(event) => {
                    return event.target.files && upload(event.target.files[0]);
                }}
            />)}
        </div>
    );
}
