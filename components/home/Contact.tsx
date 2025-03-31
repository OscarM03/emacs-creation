"use client";

import { Emailhandler } from "@/actions/email";
import { contactDetails } from "@/constants";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Contact = () => {
    const [selectedService, setSelectedService] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        service: "",
        message: "",
    });
    const [isLoading, setisLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const services = [
        "Photography",
        "Videography",
        "Editing",
        "Event Coverage",
        "Studio Session",
        "Other",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
    
        setFormData((prev) => ({
            ...prev,
            [name]: name === "phoneNumber" ? (value === "" ? "" : Number(value)) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setisLoading(true);
        setSuccess(null);
        setError(null);

        const name = formData.name.trim();
        const email = formData.email.trim();
        const phoneNumber = formData.phoneNumber;
        const service = formData.service.trim() || "Not specified";
        const message = formData.message.trim();

        const res = await Emailhandler(name, email, phoneNumber, service, message);

        if (res.status === "success") {
            setSuccess("Your message has been sent successfully!");
            setFormData({ name: "", email: "", phoneNumber: "", service: "", message: "" });
            setSelectedService("");
        } else {
            setError(res.message || "Something went wrong. Please try again.");
        }

        setisLoading(false);
    };

    return (
        <section className="container" id="contact">
            <div className="section-w mt-16">
                <h1 className="text-2xl font-bold text-center">
                    Ready to bring your memories to life? Contact Us
                </h1>
                <div className="flex flex-col md:flex-row items-center mt-8 space-x-8 shadow-md rounded-md p-4">
                    <div className="w-full md:w-1/2 max-md:px-4">
                        <div className="space-y-10 ">
                            {contactDetails.map((contact, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div>{contact.icon}</div>
                                    <div>
                                        <p className="font-medium">{contact.title}</p>
                                        <p className="text-primary">{contact.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 max-md:mt-10">
                        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="number"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md"
                                required
                            />

                            {/* Custom Dropdown for Services */}
                            <div className="relative w-full">
                                <button
                                    type="button"
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700 flex justify-between items-center"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {selectedService || "Select a Service"}
                                    <FaChevronDown className="text-gray-500" />
                                </button>

                                {isOpen && (
                                    <ul className="absolute w-full mt-1 border border-gray-300 rounded-md bg-white shadow-lg z-10">
                                        {services.map((service) => (
                                            <li
                                                key={service}
                                                className="p-2 hover:bg-primary hover:text-white cursor-pointer transition"
                                                onClick={() => {
                                                    setSelectedService(service);
                                                    setFormData({ ...formData, service });
                                                    setIsOpen(false);
                                                }}
                                            >
                                                {service}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <textarea
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md h-[200px]"
                                required
                            ></textarea>

                            <button
                                type="submit"
                                className="bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                Send Message
                                {isLoading && <span className="loader"></span>}
                            </button>

                            {success && <p className="text-green-500">{success}</p>}
                            {error && <p className="text-red-500">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
