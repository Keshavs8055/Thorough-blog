// import SidebarNav from "./Sidebar/sidebar";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="3xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 lg:flex bg-[#f9f7f1]">
//       {/* Main Content */}
//       <main className="w-full lg:w-3/4 px-20">{children}</main>

//       {/* Sidebar */}
//       <aside className="hidden lg:block w-full lg:w-1/4">
//         <div className="sticky top-0 h-screen">
//           <SidebarNav />
//         </div>
//       </aside>
//     </div>
//   );
// }
"use client";
import SidebarNav from "./Sidebar/sidebar";
import { motion } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="3xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 lg:flex bg-[#FFFBF5]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Content */}
      <motion.main
        className="w-full lg:w-3/4 px-4 sm:px-10 md:px-16 lg:px-20"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.main>

      {/* Sidebar */}
      <motion.aside
        className="hidden lg:block w-full lg:w-1/4"
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="fixed top-[64px] right-0 w-1/4 h-[calc(100vh-64px)] border-l border-[#6E5D4E] bg-[#FFFBF5] overflow-y-auto">
          <SidebarNav />
        </div>
      </motion.aside>
    </motion.div>
  );
}
