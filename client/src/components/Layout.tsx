import SidebarNav from "./Sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="3xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 lg:flex bg-[#f9f7f1]">
      {/* Main Content */}
      <main className="w-full lg:w-3/4 px-20">{children}</main>

      {/* Sidebar */}
      <aside className="hidden lg:block w-full lg:w-1/4">
        <div className="sticky top-0 h-screen">
          <SidebarNav />
        </div>
      </aside>
    </div>
  );
}
