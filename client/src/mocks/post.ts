import { Post } from "@/utils/types";

export const mockPost: Post = {
  _id: "661ae4c16d93429b372b20e2",
  title: "The Rise of Public Voices in Modern Journalism",
  summary:
    "As traditional newsrooms shrink, independent writers and citizen journalists are reshaping how stories are told. This post dives into the revolution of decentralized storytelling.",
  date: "2025-04-10T09:00:00Z",
  author: {
    _id: "661ae4936d93429b372b20dc",
    name: "Ananya Roy",
    username: "ananya",
    avatar: "/avatars/ananya.png",
    bio: "Ananya is a culture-focused journalist exploring the intersection of technology and storytelling.",
  },
  body: [
    "In an age where social platforms dominate and traditional newsrooms shrink, a new wave of independent writers is capturing the public's imagination. These digital scribes are reshaping journalism through personal essays, investigative threads, and raw storytelling.",
    "Unlike legacy media, public blogs allow for rapid, authentic, and sometimes controversial coverage — sparking real-time conversations and engagement.",
    "Platforms like Substack and Medium have given rise to niche newsletters, but it’s the community-run blogs that maintain the pulse of authentic, grassroots journalism.",
  ],
  image: {
    src: "https://picsum.photos/200/300",
    alt: "Citizen journalist capturing a protest",
    caption: "A citizen journalist at a 2024 protest rally in New York.",
    source: "Photo by Marcus Vega",
  },
  pullQuotes: [
    "We are not just consumers of news — we are now the creators of narratives.",
  ],
  subheadings: [
    "What Is Public Journalism?",
    "Tools Empowering the Masses",
    "Is Traditional Media Dead?",
  ],
  relatedArticles: [
    {
      title: "Letters From the Internet Underground",
      href: "/posts/letters-internet-underground",
    },
    {
      title: "5 Ways Readers Are Shaping Content",
      href: "/posts/readers-shaping-content",
    },
  ],
};
