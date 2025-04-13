import Header from "./Header/header";
import SidebarNav from "./Sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen max-h-screen max-w-7xl m-auto flex flex-col lg:flex-row bg-paper">
        <div className="flex-1 overflow-y-scroll">
          <Header />
          <main>{children}</main>
        </div>
        <div className="hidden lg:block min-h-screen">
          <SidebarNav />
        </div>
      </div>
    </>
  );
}
