"use client";
import { useEffect, useState } from "react";

const DRAFT_KEY = "postDraft";

// Optionally reuse your <PostLayout /> or just make this a styled preview
export default function PreviewPostPage() {
  const [post, setPost] = useState<{ title: string; body: string } | null>(
    null
  );

  useEffect(() => {
    const data = localStorage.getItem(DRAFT_KEY);
    if (data) setPost(JSON.parse(data));
  }, []);

  if (!post) return <p className="text-center mt-10">Loading preview...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </div>
  );
}
