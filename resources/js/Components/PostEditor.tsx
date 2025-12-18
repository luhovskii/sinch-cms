import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit';

interface PostEditorProps {
    content: string;
    onChange: (content: string) => void;
    editable?: boolean;
}

export default function PostEditor({
    content,
    onChange,
    editable = true
}: PostEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        editable,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        }
    });

    return (
        <div className="border bg-white rounded-xl p-4">
            <EditorContent editor={editor} />
        </div>
    )
}
