"use client";

import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TiptapToolbar from "./toolbar";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";

interface Props {
  content: string;
  onEditorChange?: (editor: Editor) => void;
  onContentChange: (html: string) => void;
}

export default function TiptapEditor({
  content,
  onEditorChange,
  onContentChange,
}: Props) {
  const editor = useEditor({
    content,
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Image,
      Blockquote,
    ],
    onUpdate: ({ editor }) => onContentChange(editor.getHTML()),
  });

  if (editor && onEditorChange) {
    onEditorChange(editor);
  }

  return (
    <div className="space-y-2">
      {editor && <TiptapToolbar editor={editor} />}
      {editor && (
        <div className="prose max-w-none border border-gray-300 rounded-md p-3 min-h-[500px]">
          <EditorContent editor={editor} />
        </div>
      )}
    </div>
  );
}
