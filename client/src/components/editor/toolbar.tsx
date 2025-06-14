"use client";

import { Bold, Italic, Strikethrough, Undo2, Redo2, Quote } from "lucide-react";
import { Editor } from "@tiptap/react";

interface TiptapToolbarProps {
  editor: Editor;
}

export default function TiptapToolbar({ editor }: TiptapToolbarProps) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-2 border border-gray-300 rounded-md px-3 py-2 sticky top-20 bg-primary text-white z-20">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded hover:bg-gray-200 hover:text-black ${
          editor.isActive("bold") ? "bg-gray-200 text-black" : ""
        }`}
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded hover:bg-gray-200 hover:text-black ${
          editor.isActive("italic") ? "bg-gray-200 text-black" : ""
        }`}
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1 rounded hover:bg-gray-200 hover:text-black ${
          editor.isActive("strike") ? "bg-gray-200 text-black" : ""
        }`}
      >
        <Strikethrough size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1 rounded hover:bg-gray-200 hover:text-black ${
          editor.isActive("blockquote") ? "bg-gray-200 text-black" : ""
        }`}
      >
        <Quote size={18} />
      </button>
      {([2, 3] as const).map((level) => (
        <button
          key={level}
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          className={`px-2 py-1 rounded hover:bg-gray-200 hover:text-black text-sm ${
            editor.isActive("heading", { level })
              ? "bg-gray-200 text-black"
              : ""
          }`}
        >
          H{level}
        </button>
      ))}

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="p-1 rounded hover:bg-gray-200 hover:text-black"
      >
        <Undo2 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="p-1 rounded hover:bg-gray-200 hover:text-black"
      >
        <Redo2 size={18} />
      </button>
    </div>
  );
}
