"use client";

import { navLinks } from "@/constants";
import Link from "next/link";
import MobileNav from "./MobileNav";

const Navbar = () => {
    return (
        <section className="container">
            <div className="section-w flex items-center justify-between py-4">
                <div>
                    <h1 className="text-lg sm:text-xl text-primary font-bold ">
                        Emacs Creation
                    </h1>
                </div>
                <div className="flex items-center space-x-6">
                    <nav className="">
                        <ul className="lg:flex justify-center items-center space-x-4 hidden">
                            {navLinks.map((link) => (
                                <li
                                    key={link.name}
                                    className="font-medium hover:text-primary"
                                >
                                    <Link href={link.href}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="flex-center space-x-4 ">
                        <Link href="#contact">
                        <button className="py-1 px-3 bg-primary rounded-md text-white font-bold hover:bg-secondary  active:scale-90 transform transition-transform duration-300 hidden lg:block">
                            Contact Us
                        </button>
                        </Link>
                        {/* <button className="py-1 px-2 bg-primary rounded-md text-white font-bold">Dashboard</button> */}
                    </div>
                    <div className="lg:hidden">
                        <MobileNav />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Navbar;
