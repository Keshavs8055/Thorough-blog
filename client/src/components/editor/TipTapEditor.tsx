"use client";

import { useEffect, useState } from "react";
import { Editor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import TiptapToolbar from "./toolbar";
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
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    const tiptap = new Editor({
      content,
      extensions: [
        StarterKit,
        Heading.configure({ levels: [1, 2, 3] }),
        Image,
        Blockquote,
      ],
      onUpdate: ({ editor }) => onContentChange(editor.getHTML()),
    });

    setEditor(tiptap);
    if (onEditorChange) {
      onEditorChange(tiptap);
    }

    return () => tiptap.destroy();
  }, []);

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
