import { navLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import {
    FaCopyright,
    FaFacebook,
    FaInstagram,
    FaTiktok,
    FaYoutube,
} from "react-icons/fa";

const Footer = () => {
    return (
        <section className="bg-black">
            <div className="container">
                <div className="section-w mt-16 py-6 flex flex-col max-md:gap-6">
                    <div className="flex justify-between items-center md:flex-row flex-col max-md:gap-8">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl font-bold text-white">
                                Get in Touch
                            </h1>
                            <div className="z-40 flex justify-center space-x-4  w-full">
                                <FaFacebook
                                    className="text-white cursor-pointer"
                                    size={20}
                                />
                                <FaYoutube
                                    className="text-white cursor-pointer"
                                    size={20}
                                />
                                <FaTiktok
                                    className="text-white cursor-pointer"
                                    size={20}
                                />
                                <FaInstagram
                                    className="text-white cursor-pointer"
                                    size={20}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4 list-none ">
                                {navLinks.map((link) => (
                                    <li
                                        key={link.name}
                                        className="text-white font-medium hover:text-primary"
                                    >
                                        <Link  href={link.href}>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </div>
                            <div className="flex justify-center md:justify-end gap-4">
                                <h1 className="text-white font-medium cursor-pointer hover:text-primary transition">
                                    Privacy Policy
                                </h1>
                                <h1 className="text-white font-medium cursor-pointer hover:text-primary transition">
                                    Terms of Service
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-4 border-t border-white">
                        <h1 className="text-white font-medium mt-4 flex items-center gap-2">
                            <FaCopyright />
                            {new Date().getFullYear()} Emacs Creation - All
                            Rights Reserved.
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
