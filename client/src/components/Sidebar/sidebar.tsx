export default function SidebarNav() {
  return (
    <aside className="text-sm p-6 space-y-10 h-full font-serif">
      {/* Trending Section */}
      <section>
        <h2 className="text-lg font-bold uppercase mb-2 border-b border-black pb-1 tracking-wide">
          Trending
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li className="hover:underline cursor-pointer">
            How Public Blogs Are Changing Journalism
          </li>
          <li className="hover:underline cursor-pointer">
            5 Ways Readers Are Shaping Content
          </li>
          <li className="hover:underline cursor-pointer">
            The Return of Authentic Writing
          </li>
        </ul>
      </section>

      {/* Editor's Picks Section */}
      <section>
        <h2 className="text-lg font-bold uppercase mb-2 border-b border-black pb-1 tracking-wide">
          {`Editor's Picks`}
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li className="hover:underline cursor-pointer">
            Letters From the Internet Underground
          </li>
          <li className="hover:underline cursor-pointer">
            Who Controls the Feed?
          </li>
          <li className="hover:underline cursor-pointer">
            Writers vs. Algorithms
          </li>
        </ul>
      </section>

      {/* Quote */}
      <div className="pt-4 border-t border-black italic text-muted text-sm">
        “The pen is mightier than the algorithm.” — Anonymous Reader
      </div>
    </aside>
  );
}
