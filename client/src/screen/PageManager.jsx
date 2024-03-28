import React, { useState } from "react";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import NewSidebar from "../components/newSidebar";


function PageManager({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen overflow-hidden ">
      <Navbar setIsSidebarOpen={setIsSidebarOpen}/>
      <div className="flex flex-1 overflow-hidden">
        <NewSidebar isOpen={isSidebarOpen} />
        <div className="flex flex-col flex-1 overflow-y-auto bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white text-black pt-12">
          <main className="flex-1 p-12">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default PageManager;
