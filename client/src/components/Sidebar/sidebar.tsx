import { Quote } from "./quote";
import { EditorsPicks } from "./picks";
import { Trending } from "./trending";
import { SearchComponent } from "./searchComponent";

export default function SidebarNav() {
  return (
    <aside className="text-sm pt-20 p-6 pr-2 space-y-12 h-full font-serif bg-[#fefcf7] border-l border-black/20 pl-6 ml-6">
      {/* Trending Section */}
      <SearchComponent />
      <Trending />

      {/* Editor's Picks Section */}
      <EditorsPicks />
      {/* Quote */}
      <Quote />
    </aside>
  );
}
