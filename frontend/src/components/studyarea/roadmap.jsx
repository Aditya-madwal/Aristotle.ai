import React, { useState } from 'react';

const RoadmapMilestone = ({ title, description, links, bgColor, buttonColor }) => (
    <div className={`rounded-xl p-4 ${bgColor} w-64`}>
        <h3 className="font-semibold text-base mb-2">{title}</h3>
        <p className="text-gray-700 text-sm mb-2">{description}</p>

        {links.map((link, index) => (
            <div key={index} className="mb-1">
                <a href={link} className="text-gray-600 hover:underline text-xs">
                    {link}
                </a>
            </div>
        ))}

        <button
            className={`mt-2 w-full py-1.5 px-3 rounded-full text-sm text-center transition-colors duration-200 ${buttonColor}`}
        >
            Know More
        </button>
    </div>
);

const Roadmap = () => {
    const milestones = [
        {
            title: "User Persona",
            description: "Sit esse anim esse commodo nulla dolore exercitation.",
            links: ["https://demo.com", "https://sample.com"],
            bgColor: "bg-purple-100",
            buttonColor: "bg-purple-200 hover:bg-purple-300 text-purple-700"
        },
        {
            title: "User Persona",
            description: "Sit esse anim esse commodo nulla dolore exercitation.",
            links: ["https://demo.com", "https://sample.com"],
            bgColor: "bg-emerald-100",
            buttonColor: "bg-emerald-200 hover:bg-emerald-300 text-emerald-700"
        },
        {
            title: "Research Phase",
            description: "Conduct user research and analyze market trends.",
            links: ["https://research.com"],
            bgColor: "bg-blue-100",
            buttonColor: "bg-blue-200 hover:bg-blue-300 text-blue-700"
        },
        // Adding more items to demonstrate scrolling
        {
            title: "Development",
            description: "Implementation phase of core features.",
            links: ["https://dev.com"],
            bgColor: "bg-rose-100",
            buttonColor: "bg-rose-200 hover:bg-rose-300 text-rose-700"
        },
        {
            title: "Testing",
            description: "Quality assurance and user testing phase.",
            links: ["https://test.com"],
            bgColor: "bg-amber-100",
            buttonColor: "bg-amber-200 hover:bg-amber-300 text-amber-700"
        }
    ];

    return (
        <div className="w-full mx-auto mb-6">
            <h2 className="text-xl font-bold mb-4">Roadmap</h2>

            {/* Fixed height scrollable container */}
            <div className="border border-dashed border-gray-300 rounded-lg h-[50vh] overflow-y-auto">
                <div className="p-6 relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px border-l-2 border-dashed border-gray-300" />

                    {/* Milestones */}
                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="relative pl-16">
                                {/* Horizontal connector line */}
                                <div className="absolute left-8 top-1/2 w-8 h-px bg-purple-400" />

                                {/* Timeline dot */}
                                <div className="absolute left-7 top-1/2 w-2 h-2 rounded-full bg-purple-500 -translate-y-1/2" />

                                <RoadmapMilestone {...milestone} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;