import { navLinks, socialLinks } from "@/constants";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaCopyright } from "react-icons/fa";
import { BsArrowUpSquare } from "react-icons/bs";

const Footer = () => {
    return (
        <section className="bg-black">
            <div className="container relative">
                <Link href="#navbar">
                    <BsArrowUpSquare
                        className="absolute top-4 right-4 text-white cursor-pointer hover:text-primary transition"
                        size={26}
                    />
                </Link>
                <div className="section-w py-6 flex flex-col max-md:gap-6">
                    <div className="flex justify-between items-center md:flex-row flex-col max-md:gap-8">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl font-bold text-white">
                                Get in Touch
                            </h1>
                            <div className="z-40 flex justify-center space-x-4  w-full">
                                {socialLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="text-white cursor-pointer"
                                    >
                                        {link.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <ul className="flex gap-4 list-none">
                                {navLinks.map((link) => (
                                    <li
                                        key={link.name}
                                        className="text-white font-medium hover:text-primary"
                                    >
                                        <Link href={link.href}>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-center items-center md:justify-end gap-4">
                                <h1 className="text-white font-medium cursor-pointer hover:text-primary transition">
                                    Privacy Policy
                                </h1>
                                <h1 className="text-white font-medium cursor-pointer hover:text-primary transition">
                                    Terms of Service
                                </h1>
                                <Link
                                    href="/dashboard"
                                    className="text-white font-medium cursor-pointer hover:text-primary transition"
                                >
                                    <LucideLayoutDashboard size={20} />
                                </Link>
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
