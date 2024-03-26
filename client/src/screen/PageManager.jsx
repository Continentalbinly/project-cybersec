import React, { useState } from "react";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import NewSidebar from "../components/newSidebar";


function PageManager({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar setIsSidebarOpen={setIsSidebarOpen}/>
      <div className="flex flex-1 overflow-hidden">
        <NewSidebar isOpen={isSidebarOpen} />
        <div className="flex flex-col flex-1 pt-16 overflow-y-auto">
          <main className="flex-1 p-4">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default PageManager;
