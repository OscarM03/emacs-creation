"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const textContainerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.4, // Slows down each child's appearance
            ease: "easeInOut",
            duration: 1.2, // Makes it smoother and slower
        },
    },
};

const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.2, ease: "easeInOut" },
    },
};

const Hero = () => {
    return (
        <section className="container relative">
            <div className="relative section-w h-[60vh] sm:h-[80vh] bg-cameras bg-right bg-cover rounded-md overflow-hidden">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

                {/* Content */}
                <motion.div
                    className="relative flex flex-col lg:justify-center justify-end max-lg:pb-10 h-full w-[85%] lg:w-[600px] md:w-[500px] sm:w-[400px] pl-4 sm:pl-10"
                    variants={textContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }} // Animates when 20% is visible
                >
                    <motion.p
                        className="text-primary font-extrabold text-sm uppercase tracking-wide"
                        variants={textVariants}
                    >
                        ~Emacs Creation Production~
                    </motion.p>

                    <motion.h1
                        className="text-white text-xl sm:text-2xl md:text-[26px] lg:text-3xl font-extrabold leading-tight mt-3"
                        variants={textVariants}
                    >
                        Capturing Timeless Moments With Artistry and Cinematic
                        Storytelling
                    </motion.h1>

                    <motion.div
                        className="flex space-x-4 mt-6"
                        variants={textVariants}
                    >
                        <Link href="/gallery">
                            <button className="py-2 px-5 bg-primary rounded-lg text-white font-bold hover:bg-secondary active:scale-90 transition-transform duration-300 shadow-md">
                                View Gallery
                            </button>
                        </Link>
                        <Link href="#contact">
                            <button className="py-2 px-5 bg-transparent border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white active:scale-90 transition-transform duration-300 shadow-md hidden sm:block">
                                Request a Quote
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
