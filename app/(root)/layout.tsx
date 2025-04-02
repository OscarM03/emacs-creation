import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;

