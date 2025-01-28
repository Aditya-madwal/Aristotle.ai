import React from 'react';
import { useState } from 'react';
import { FolderOpen, MoreVertical, Plus, FileText, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import FileUpload from './FileUpload';
import FlashCard from "../studyarea/Flashcard";
import Roadmap from './roadmap';

const AreaDashboard = ({ setSelectedFile }) => {
    const [subject, setSubject] = useState('UI/UX Design');
    // Sample PDFs data
    const recentPDFs = [
        {
            id: "pdf_001",
            name: 'UserPersona.pdf',
            dateUploaded: 'June 23, 2024',
            topic: 'User Persona',
            summary: 'Comprehensive guide covering user persona creation, user research methodologies, and practical examples of implementing user personas in UX design. Includes case studies and templates for creating effective user personas.',
        },
        {
            id: "pdf_002",
            name: 'PrototypeDesign.pdf',
            dateUploaded: 'June 24, 2024',
            topic: 'Prototyping',
            summary: 'Detailed exploration of prototype design principles, from low-fidelity wireframes to high-fidelity interactive prototypes. Covers tools like Figma, Adobe XD, and best practices for prototype testing.',
        },
        {
            id: "pdf_003",
            name: 'WireframeGuide.pdf',
            dateUploaded: 'June 25, 2024',
            topic: 'Wireframes',
            summary: 'Complete guide to creating effective wireframes, including mobile and desktop considerations. Features wireframing techniques, tools comparison, and guidelines for creating user-friendly layouts.',
        },
        {
            id: "pdf_004",
            name: 'Accessibility.pdf',
            dateUploaded: 'June 26, 2024',
            topic: 'Accessibility',
            summary: 'In-depth coverage of web accessibility standards (WCAG), implementation techniques, and testing methods. Includes practical examples of accessible design patterns and common accessibility issues to avoid.',
        },
        {
            id: "pdf_005",
            name: 'ColorTheory.pdf',
            dateUploaded: 'June 27, 2024',
            topic: 'Design Principles',
            summary: 'Essential guide to color theory in digital design, covering color psychology, color schemes, and practical applications in UI design. Includes examples of effective color combinations and accessibility considerations.',
        }
    ];


    return (
        <section className="flex flex-col">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">{`Dashboard > ${subject} `}</h1>
            <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-md">
                <Roadmap />

                {/* Current Study Areas */}
                <FileUpload />

                {/* flashcards */}
                <h2 className="text-xl font-semibold text-gray-800 mt-10">Recent PDFs</h2>
                <div className="py-6 flex flex-wrap gap-6">
                    <FlashCard
                        topic="USER JOURNEY"
                        dateAdded="12 November, 2024"
                        cardCount={5}
                        uid="card-1"
                    />
                    <FlashCard
                        topic="USER JOURNEY"
                        dateAdded="12 November, 2024"
                        cardCount={5}
                        uid="card-2"
                    />
                    <FlashCard
                        topic="USER JOURNEY"
                        dateAdded="12 November, 2024"
                        cardCount={5}
                        uid="card-3"
                    />
                </div>

                {/* Recent PDFs */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent PDFs</h2>
                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 px-6 py-3 bg-gray-100 text-sm font-medium text-gray-500">
                            <div className="col-span-2">Name</div>
                            <div>Uploaded On</div>
                            <div>Topic</div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-200 bg-white">
                            {recentPDFs.map((pdf) => (
                                <div key={pdf.id} className="grid grid-cols-4 px-6 py-4 items-center hover:bg-gray-50">
                                    <div className="col-span-2 flex items-center gap-3">
                                        <FileText className="text-red-400" size={20} />
                                        <button onClick={() => setSelectedFile(pdf)} className="text-sm font-medium text-gray-700">{pdf.name}</button>
                                    </div>
                                    <div className="text-sm text-gray-500">{pdf.dateUploaded}</div>
                                    <div className="flex items-center justify-between">
                                        <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs">
                                            {pdf.topic}
                                        </span>
                                        <button className="text-gray-400 hover:text-red-500">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AreaDashboard;
