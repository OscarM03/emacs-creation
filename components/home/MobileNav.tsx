import { useState } from "react";
import { navLinks, socialLinks } from "@/constants";
import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";

const MobileNav = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <button onClick={() => setOpen(true)}>
                    <FaBars className="w-5 h-5" />
                </button>
            </SheetTrigger>
            <SheetContent className="bg-mobile bg-cover bg-center">
                <div className="absolute inset-0 bg-black/60"></div>
                {/* Close button properly updating the state */}
                <button
                    className="absolute top-0 left-2 text-white text-3xl z-50"
                    onClick={() => setOpen(false)}
                >
                    &times;
                </button>
                <SheetHeader>
                    <SheetTitle className="text-primary font-bold text-2xl text-center z-20">
                        Emacs Creation
                    </SheetTitle>
                </SheetHeader>
                <ul className="space-y-6 p-4 border h-full flex flex-col justify-center items-center z-20">
                    {navLinks.map((link) => (
                        <li
                            key={link.name}
                            className=" font-bold uppercase text-white hover:text-primary"
                        >
                            <Link
                                href={link.href}
                                onClick={() => setOpen(false)}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="z-40 flex justify-center space-x-4 absolute bottom-[10%] w-full">
                    {socialLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-white cursor-pointer"
                        >
                            {link.icon}
                        </Link>
                    ))}
                    {/* <FaFacebook className="text-white cursor-pointer" size={24}/>
                    <FaYoutube className="text-white cursor-pointer" size={24}/>
                    <FaTiktok className="text-white cursor-pointer" size={24}/>
                    <FaInstagram className="text-white cursor-pointer" size={24}/> */}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
