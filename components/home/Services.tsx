"use client";

import { services } from "@/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const imageContainerVariants = {
    visible: {
        transition: {
            staggerChildren: 0.4, // Delays each image by 0.2s
        },
    },
};

const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Services: React.FC = () => {
    const [selectedService, setSelectedService] = useState<string>(services[0].title);

    const handleServiceToggle = (title: string) => {
        setSelectedService(title);
    };

    const currentService = services.find(service => service.title === selectedService);

    return (
        <section className="container" id="services">
            <div className="section-w mt-20">
                <h2 className="text-2xl font-bold text-center">Our Services</h2>
                <div className="flex gap-[5%] mt-8">
                    
                    {/* Sidebar Service List */}
                    <div className="lg:w-[25%] w-full space-y-4">
                        {services.map(service => (
                            <div key={service.title} className="space-y-4">
                                <div 
                                    className={`flex items-center cursor-pointer max-lg:${
                                        selectedService === service.title
                                            ? "justify-center"
                                            : "justify-start"
                                    }`}
                                    onClick={() => handleServiceToggle(service.title)}
                                >
                                    {/* Arrow Icon */}
                                    <div className="bg-primary w-[60px] h-[60px] flex items-center justify-end rounded-md">
                                        <div className="flex bg-white w-1/2 h-1/2 items-center justify-center rounded-l-md">
                                            <motion.div
                                                animate={{ rotate: selectedService === service.title ? 90 : 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <FaLongArrowAltRight size={24} />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Service Title */}
                                    <h3 className={`text-lg font-bold uppercase ml-3 transition-colors ${
                                        selectedService === service.title ? "text-primary" : "text-black"
                                    }`}>
                                        {service.title}
                                    </h3>
                                </div>

                                {/* Mobile View Description + Images */}
                                {selectedService === service.title && (
                                    <div className="lg:hidden">
                                        <p className="text-lg font-medium">{service.description}</p>
                                        <motion.div 
                                            key={selectedService} // <--- Forces re-animation when service changes
                                            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
                                            variants={imageContainerVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            {service.images.map((image, index) => (
                                                <motion.div key={index} variants={imageVariants}>
                                                    <Image
                                                        src={image}
                                                        alt={`${service.title} Image ${index + 1}`}
                                                        width={200}
                                                        height={200}
                                                        className="rounded-md object-cover"
                                                    />
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Large Screen Description + Images */}
                    <div className="lg:flex flex-col justify-between w-[70%] hidden">
                        <p className="text-lg font-medium">{currentService?.description}</p>
                        <motion.div 
                            key={selectedService} // <--- Forces re-animation when service changes
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
                            variants={imageContainerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {currentService?.images.map((image, index) => (
                                <motion.div key={index} variants={imageVariants}>
                                    <Image
                                        src={image}
                                        alt={`${currentService.title} Image ${index + 1}`}
                                        width={600}
                                        height={600}
                                        className="rounded-md object-cover"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Services;
