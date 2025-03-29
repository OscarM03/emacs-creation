"use client";

import Image from "next/image";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import videoCam from "/public/images/videocam.jpg";
import { FaChevronDown } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { aboutUs, AboutUsType } from "@/constants";



const About: React.FC = () => {
    const [selectedAboutUs, setSelectedAboutUs] =
        useState<keyof AboutUsType>("Our Story");
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const toggleDropDownMenu = () => setIsDropDownOpen(!isDropDownOpen);

    const handleSelect = (aboutUsKey: keyof AboutUsType) => {
        setSelectedAboutUs(aboutUsKey);
        setIsDropDownOpen(false);
    };

    const currentAboutUs = useMemo(
        () => aboutUs[selectedAboutUs],
        [selectedAboutUs]
    );

    return (
        <section className="container" id="about-us">
            <div className="section-w flex mt-16 lg:h-[400px] space-x-[5%]">
                {/* Left Side - Image */}
                <div className="w-[35%] h-full hidden lg:flex">
                    <Image
                        src={videoCam}
                        alt="Video Camera"
                        width={400}
                        height={50}
                        className="h-full object-cover rounded-md"
                        priority={false} // Lazy load the image
                    />
                </div>

                {/* Right Side - Text */}
                <div className="lg:w-[60%] ">
                    <div className="flex w-full justify-center items-center">
                        <h1
                            className="font-bold w-[30%] sm:w-[20%] text-primary"
                        >
                            ABOUT US
                        </h1>

                        {/* Dropdown */}
                        <div
                            className="uppercase w-[70%] sm:w-[80%] relative"
                            onClick={toggleDropDownMenu}
                        >
                            <div className="flex justify-between items-center space-x-6 font-bold rounded-md px-3 py-2 bg-primary cursor-pointer">
                                <h2 className="text-white">
                                    {selectedAboutUs}
                                </h2>
                                <FaChevronDown className="text-white" />
                            </div>
                            {isDropDownOpen && (
                                <ul className="absolute bg-primary rounded-md mt-2 w-full">
                                    {Object.keys(aboutUs).map((key) => (
                                        <li
                                            key={key}
                                            className="p-2 text-white font-bold hover:bg-gray-100 hover:text-black cursor-pointer border-b-2"
                                            onClick={() =>
                                                handleSelect(
                                                    key as keyof AboutUsType
                                                )
                                            }
                                        >
                                            {key}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <p
                        className="font-medium mt-4"
                    >
                        {currentAboutUs.description}
                    </p>

                    {/* Bullet Points */}
                    <ul className="mt-4 pl-10 text-gray-500 font-medium">
                        <AnimatePresence>
                            {currentAboutUs.points.map((point, index) => (
                                <motion.li
                                    key={point}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeOut",
                                        delay: 0.2 + index * 0.1, // stagger animation
                                    }}
                                    className="mt-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <SiTicktick className="text-primary" />
                                        {point}
                                    </div>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default About;
