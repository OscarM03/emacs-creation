import Footer from "@/components/home/Footer";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;

