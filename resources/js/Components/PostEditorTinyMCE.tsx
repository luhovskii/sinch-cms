import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface PostEditorProps {
    content: string;
    onChange: (content: string) => void;
    editable?: boolean;
}

export default function PostEditorTinyMCE({
    content,
    onChange,
    editable = true
}: PostEditorProps) {
    return (
        <Editor
            apiKey="zu3gxbyutazbz5ywspxhw515zri33ke579q508fbmntg4qh5"
            value={content}
            disabled={!editable}
            init={{
                height: 400,
                menubar: false,
                plugins: ['anchor', 'autolink', 'charmap', 'codesample', 'emoticons',
                    'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks',
                    'wordcount', 'checklist', 'mediaembed', 'casechange', 'formatpainter',
                    'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen',
                    'powerpaste', 'advtable', 'advcode', 'advtemplate',
                    'uploadcare', 'mentions', 'tableofcontents',
                    'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss',
                    'markdown','importword', 'exportword', 'exportpdf'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                automatic_uploads: true,
                images_upload_url: '/blog/images',
                images_upload_handler: async (blobInfo: { blob: () => Blob; filename: () => string | undefined; }) => {
                    const formData = new FormData();
                    formData.append('image', blobInfo.blob(), blobInfo.filename());

                    const response = await fetch('/blog/images', {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN':
                                document
                                    .querySelector('meta[name="csrf-token"]')
                                    ?.getAttribute('content') || '',
                        },
                        body: formData,
                    });

                    const data = await response.json();

                    return data.url;
                }
            }}
            onEditorChange={(newValue: string) => onChange(newValue)}
        />
    );
}
