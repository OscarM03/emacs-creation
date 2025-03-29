"use client";

import { testimonials } from "@/constants";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
        );
    };

    return (
        <section className="container">
            <h1 className="text-2xl font-bold text-center mt-16">
                What Our Clients Say
            </h1>

            <div className="section-w mt-4 mb-40 bg-testimonials bg-bottom md:bg-center bg-cover relative h-[400px] md:h-[350px] lg:h-[300px] rounded-md flex justify-center items-center ">
                <div className="absolute inset-0 bg-gradient-to-t from-white/100 via-white/20 to-transparent"></div>

                {/* Testimonial Card */}
                <div className="w-[95%] sm:w-[85%] lg:w-3/4 bg-primary text-white rounded-md py-6 px-2 font-medium z-10 flex items-center justify-between shadow-lg absolute -bottom-[20%]">
                    <p className="text-center px-4 text-lg leading-relaxed">
                        <span className="text-black font-bold text-3xl">&quot;</span>
                        {testimonials[currentIndex]}
                        <span className="text-black font-bold text-3xl">&quot;</span>
                    </p>
                    <button onClick={handlePrev} className="p-2 bg-gray-800 rounded-full  transition absolute -left-5">
                        <FaArrowLeft className="text-white text-lg" />
                    </button>
                    <button onClick={handleNext} className="p-2 bg-gray-800 rounded-full  transition absolute -right-5">
                        <FaArrowRight className="text-white text-lg" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
