import React from "react";
import Hero from "../../components/home/Hero";
import About from "../../components/home/About";
import Services from "../../components/home/Services";
import Gallery from "../../components/home/Gallery";
import Testimonials from "../../components/home/Testimonials";
import Contact from "@/components/home/Contact";
import Statistics from "@/components/home/Statistics";
import FAQ from "@/components/home/FAQ";

const Home: React.FC = () => {
    return (
        <div>
            <Hero />
            <About />
            <Services />
            <Gallery />
            <Testimonials />
            <FAQ />
            <Contact />
            <Statistics />
        </div>
    );
};

export default Home;
