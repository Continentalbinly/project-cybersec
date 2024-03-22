import React from "react";
import Navbar from "../components/Header";
import Footer from "../components/Footer";

function PageManager({ children }) {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
}

export default PageManager;
