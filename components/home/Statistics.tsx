import React from "react";

const Statistics = () => {
    return (
        <section className="container">
            <div className="section-w mt-16">
                <h1 className="text-2xl font-bold text-center">Trusted by Many, Proven by Results</h1>
                <div className="section-w mt-4 bg-gray-100 md:px-6 py-2 rounded-md">
                    <p className="text-center font-medium">
                        Years of expertise, thousands of happy clients, and
                        unforgettable moments captured forever
                    </p>
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mt-4">
                        <div className="flex justify-center items-center gap-2">
                            <h1 className="text-5xl font-bold text-primary">
                                10
                            </h1>
                            <div className="font-medium">
                                <p>Years</p>
                                <p>of Experince</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <h1 className="text-5xl font-bold text-primary">
                                1k+
                            </h1>
                            <div className="font-medium">
                                <p>Happy</p>
                                <p>Customers</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <h1 className="text-5xl font-bold text-primary">
                                15k
                            </h1>
                            <div className="font-medium">
                                <p>Photos</p>
                                <p>Delivered</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <h1 className="text-5xl font-bold text-primary">
                                1k+
                            </h1>
                            <div className="font-medium">
                                <p>Videos</p>
                                <p>Delivered</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Statistics;
