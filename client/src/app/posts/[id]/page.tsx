// app/posts/[id]/page.tsx
import SinglePost from "@/components/Post/SinglePost";
import { fetchPostById } from "@/lib/api";
import { redirect } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await fetchPostById(params.id);

  if (!response.success || !response.data) {
    return {
      title: "Post Not Found - Thorough",
      description: "Post may have been removed or doesn't exist.",
    };
  }

  return {
    title: `${response.data.title} - Thorough`,
    description: response.data.summary || "Read the blog post.",
  };
}

export default async function PostPage({ params }: Props) {
  const response = await fetchPostById(params.id);

  if (!response.success || !response.data) {
    console.error("Failed to fetch post:", response.message);
    redirect("/");
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <SinglePost post={response.data} />
    </main>
  );
}
