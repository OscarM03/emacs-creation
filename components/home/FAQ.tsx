"use client"

import React, { useState } from "react";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

const faqs = [
    {
        question: "What photography services do you offer?",
        answer: "We provide portrait, event, wedding, product, and studio photography services."
    },
    {
        question: "Do you offer videography services for events?",
        answer: "Yes, we offer videography for weddings, corporate events, music videos, and more."
    },
    {
        question: "How long does it take to receive the final photos or videos?",
        answer: "Typically, edited photos are delivered within 3-7 days, while videos take 1-3 weeks, depending on the complexity of editing."
    },
    {
        question: "Can I request specific edits or styles for my photos/videos?",
        answer: "Absolutely! We tailor our editing style to match your vision and preferences."
    },
    {
        question: "Do you provide raw footage or unedited photos?",
        answer: "Yes, upon request, we can provide raw footage or unedited photos at an additional cost."
    },
    {
        question: "How can I book a session?",
        answer: "You can book a session by contacting us via phone, email, or through our website’s booking form."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="container">
            <div className="section-w">
                <h1 className="text-2xl font-bold text-center">
                    Frequently Asked Questions (FAQ)
                </h1>
                <div className="mt-8 flex flex-col lg:w-[70%] mx-auto bg-gray-50 rounded-md p-4 shadow-md">
                    {faqs.map((faq, index) => (
                        <div key={index} className="px-2">
                            <div
                                className="flex justify-between items-center cursor-pointer py-3 border-b  border-gray-300"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h2 className="text-lg font-medium">{faq.question}</h2>
                                {openIndex === index ? (
                                    <FaChevronCircleUp className="text-primary" />
                                ) : (
                                    <FaChevronCircleDown className="text-gray-600" />
                                )}
                            </div>
                            <p className={`mt-2 py-4 text-primary font-medium transition-all duration-300 ${openIndex === index ? "block" : "hidden"}`}>
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
