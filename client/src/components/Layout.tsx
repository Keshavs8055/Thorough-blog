import SidebarNav from "./Sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-black font-serif">
      {/* Main layout */}

      <div className="3xl:max-w-7xl mx-auto flex lg:flex-row ">
        {/* Main content */}
        <main className="w-full lg:w-3/4 ">{children}</main>

        {/* Sidebar as nav for desktop, moves into Header for mobile */}
        <aside className="rounded shadow hidden lg:block lg:fixed right-0 w-full lg:w-1/4 bg-amber-50 lg:h-screen overflow-y-auto">
          <SidebarNav />
        </aside>
      </div>
    </div>
  );
}
