import Footer from "@/components/home/Footer";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
            <Footer />
        </div>
    );
};

export default layout;
