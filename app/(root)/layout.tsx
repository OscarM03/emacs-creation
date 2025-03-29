import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default layout;
