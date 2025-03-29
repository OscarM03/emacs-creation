import { JSX } from "react";
import { FaEnvelope, FaPhone, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

type AboutUsData = {
    description: string;
    points: string[];
};

export type AboutUsType = {
    [key: string]: AboutUsData;
};

type Service = {
    title: string;
    description: string;
    images: string[];
};


export interface ContactDetail {
    icon: JSX.Element;
    title: string;
    detail: string;
}



export const navLinks = [
    { name: "Home", href: "/"},
    { name: "Gallery", href: "/gallery"},
    { name: "About Us", href: "#about-us"},
    { name: "Services", href: "#services"},
]


export const aboutUs: AboutUsType = {
    "Our Story": {
        description:
            "Emacs Creation was born out of a passion for storytelling and artistic expression. With a deep appreciation for creativity, we set out to craft visual experiences that captivate and inspire. Over the years, we have grown into a team of dedicated professionals, each bringing unique skills and a shared commitment to excellence. From humble beginnings to a thriving creative powerhouse, our journey is defined by innovation, authenticity, and an unwavering dedication to our craft.",
        points: [
            "Founded on creativity and artistic passion",
            "Dedicated to delivering high-quality visual content",
            "Committed to innovation and storytelling",
            "Built on a strong foundation of professionalism and expertise",
            "Continuously evolving to stay at the forefront of the industry",
            "Driven by the vision of making every project impactful and memorable",
        ],
    },
    "Our Mission": {
        description:
            "Our mission at Emacs Creation is to bring stories to life through compelling visuals and innovative media solutions. We strive to push the boundaries of creativity, delivering high-quality content that not only meets but exceeds expectations. Through collaboration, cutting-edge technology, and a commitment to excellence, we empower brands, individuals, and communities to share their narratives in meaningful and impactful ways.",
        points: [
            "Empowering brands and individuals through visual storytelling",
            "Delivering high-quality, innovative media solutions",
            "Pushing creative boundaries with every project",
            "Building meaningful connections through impactful visuals",
            "Bridging creativity and technology for outstanding results",
            "Committed to excellence and client satisfaction",
        ],
    },
    "Our Vision": {
        description:
            "Our vision is to be a global leader in creative media production, setting new standards for storytelling, innovation, and artistic excellence. We aspire to create a world where creativity knows no bounds, where every moment is captured with purpose, and where our work continues to inspire, connect, and leave a lasting impact.",
        points: [
            "Becoming a global leader in creative media production",
            "Setting new standards for innovation and storytelling",
            "Fostering a world where creativity thrives without limits",
            "Inspiring and connecting people through visual experiences",
            "Leaving a lasting impact through high-quality content",
            "Continuously evolving to shape the future of media",
        ],
    },
    "Our Team": {
        description:
            "At Emacs Creation, our strength lies in our people. Our team is composed of visionary creatives, skilled technicians, and passionate storytellers who bring a diverse range of expertise to every project. With backgrounds spanning photography, videography, digital design, and media production, we collaborate seamlessly to turn ideas into stunning realities. Our dedication to excellence ensures that every project we undertake is executed with precision, creativity, and a deep understanding of our clients' needs.",
        points: [
            "A team of talented professionals with diverse expertise",
            "Unwavering commitment to excellence and creativity",
            "Seamless collaboration for high-impact projects",
            "Deep understanding of client needs and vision",
            "Passionate storytellers dedicated to authentic expression",
            "Driven by a shared goal of delivering outstanding results",
        ],
    },
    "Our Values": {
        description:
            "At the core of Emacs Creation are the values that guide us in everything we do. We believe in authenticity, creativity, and innovation. Our commitment to integrity, professionalism, and excellence ensures that we deliver outstanding results for our clients. We strive to foster meaningful connections, embrace new challenges, and push the boundaries of visual storytelling.",
        points: [
            "Authenticity in every project we undertake",
            "Commitment to creativity and innovation",
            "Integrity and professionalism in all our work",
            "Passion for visual storytelling and artistic expression",
            "Striving for excellence in every detail",
            "Building strong and lasting client relationships",
        ],
    },
};



export const services: Service[] = [
    {
        title: "Photography",
        description:
            "We capture moments that tell a story, delivering high-quality images that reflect emotion, creativity, and professionalism. Whether it’s portraits, events, or commercial photography, we ensure every shot is meaningful and visually striking. Our team carefully curates each image to meet your unique vision and bring your memories to life.",
        images: [
            "/images/canon.jpg",
            "/images/camera1.jpg",
            "/images/photography-2.jpg",
            "/images/photography-1.jpg",
        ],
    },
    {
        title: "Videography",
        description:
            "We create compelling video content that brings ideas to life. From cinematic storytelling to corporate videos, we blend creativity and technology to produce visually stunning and emotionally engaging films. With expert editing and dynamic visuals, we craft videos that leave a lasting impression on your audience.",
        images: [
            "/images/videography-1.jpg",
            "/images/videography-2.jpg",
            "/images/videography-3.jpg",
            "/images/videography-4.jpg",
        ],
    },
    {
        title: "Live Streaming",
        description:
            "We provide seamless, high-quality live streaming services for events, conferences, and performances. Our team ensures a smooth, professional broadcast with real-time engagement and minimal technical issues. Whether it's a private event or a large-scale production, we make sure your audience stays connected without interruption.",
        images: [
            "/images/live-1.jpg",
            "/images/live-2.jpg",
            "/images/photography-3.jpg",
            "/images/videography-3.jpg",
        ],
    },
    {
        title: "Drone Services",
        description:
            "We offer cutting-edge drone services, capturing stunning aerial footage for real estate, events, cinematography, and more. Our licensed drone pilots deliver breathtaking perspectives with precision and creativity. Whether you need sweeping landscapes or detailed close-ups, our drones provide a fresh and unique viewpoint.",
        images: [
            "/images/drone-1.jpg",
            "/images/drone-2.jpg",
            "/images/drone-3.jpg",
            "/images/drone-4.jpg",
        ],
    },
];

export const testimonials: string[] = [
    "Amazing service! Attention to detail and professionalism were top-notch. The process was seamless and enjoyable. Highly recommend their high-quality work!",
    "A wonderful experience! The team was accommodating and went above and beyond to ensure perfection. The final result was stunning!",
    "They captured every moment beautifully! Their creativity and expertise are unmatched. The photos and videos make me relive the moment all over again!",
    "Professional and creative—exceeded expectations! From start to finish, everything was handled with care and precision. Truly an exceptional experience!",
    "A true artist behind the lens! The breathtaking shots and amazing editing brought everything to life. Couldn’t have asked for a better team!",
    "Blown away by the final photos! The team was talented, patient, and ensured every shot was perfect. I’ll cherish these memories forever!",
    "Seamless process with stunning results! Communication was excellent, and the final outcome exceeded expectations. Highly professional and a pleasure to work with!",
    "The best investment for my special day! Every shot was precise, capturing real emotions beautifully. So grateful for these priceless moments!",
    "Highly skilled and professional! They made everyone feel comfortable, resulting in natural, beautiful shots. I’d recommend them 100% without hesitation!",
    "Couldn't be happier! Their dedication and passion are evident in every shot. A flawless experience from start to finish!"
];


export const contactDetails: ContactDetail[] = [
    {
        icon: <FaEnvelope size={32} />,
        title: "Contact us via email",
        detail: "emacscreation@gmail.com",
    },
    {
        icon: <FaPhone size={32} />,
        title: "Call us",
        detail: "+123 456 7890",
    },
    {
        icon: <FaWhatsapp size={32} />,
        title: "Chat on WhatsApp",
        detail: "+123 456 7890",
    },
    {
        icon: <FaMapMarkerAlt size={32} />,
        title: "Visit our office",
        detail: "123 Main Street, City, Country",
    },
];

