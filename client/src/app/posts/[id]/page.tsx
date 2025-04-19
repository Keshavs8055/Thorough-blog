// app/posts/[id]/page.tsx
import SinglePost from "@/components/Post/SinglePost";
import { fetchPostById } from "@/lib/api";
import { redirect } from "next/navigation";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const response = await fetchPostById(id);

  // Check if the response was successful and has data
  if (!response.success || !response.data) {
    console.error("Failed to fetch post:", response.message);
    redirect("/");
  }

  // Now we know response.data exists and is a Post
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <SinglePost post={response.data} />
    </main>
  );
}
