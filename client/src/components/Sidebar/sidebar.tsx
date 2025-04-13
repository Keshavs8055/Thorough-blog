import Link from "next/link";

export default function SidebarNav() {
  return (
    <nav className=" border-l text-sm p-5 lg:max-w-[18rem] space-y-7 h-full">
      <div className="lg:hidden text-center mb-6">
        <h1 className="text-3xl font-black font-serif uppercase tracking-widest">
          The Public Blog
        </h1>
      </div>
      <ul className="space-y-3 font-medium uppercase font-serif">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/categories">Categories</Link>
        </li>
        <li>
          <Link href="/authors">Authors</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
      <hr />
      <div className="space-y-6 text-sm">
        <div>
          <h2 className="text-md font-bold uppercase mb-2 border-b pb-1">
            Trending
          </h2>
          <ul className="space-y-2">
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
        </div>
        <div>
          <h2 className="text-md font-bold uppercase mb-2 border-b pb-1">
            {`Editor's Picks`}
          </h2>
          <ul className="space-y-2">
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
        </div>
        <div className="pt-4 border-t italic text-muted text-sm">
          “The pen is mightier than the algorithm.” — Anonymous Reader
        </div>
      </div>
    </nav>
  );
}
