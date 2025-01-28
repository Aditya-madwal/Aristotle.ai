import React, { useState, useEffect } from 'react';
import { FolderOpen, MoreVertical, Plus, ChevronRight, FileText, Trash2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { StudyAreaService } from '../../lib/api/StudyAreaDashboard.jsx/StudyAreaServices';
import FileUpload from './FileUpload';
import FlashCard from "../studyarea/Flashcard";
import Roadmap from './roadmap';

const AreaDashboard = ({ setSelectedFile }) => {
    const { uid } = useParams();
    const [roadmapUid, setRoadmapUid] = useState(uid);
    const [subject, setSubject] = useState('UI/UX Design');
    const [roadmapPDFs, setRoadmapPDFs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roadmapDetails, setRoadmapDetails] = useState({});

    const fetchRoadmapDetails = async () => {
        try {
            const response = await StudyAreaService.getRoadmapDetails(roadmapUid);
            console.log('Roadmap details:', response);
            setSubject(response.subject);
            setRoadmapDetails(response);
        } catch (error) {
            console.error("Error fetching roadmap details:", error);
        }
    };

    const fetchRoadmapPDFs = async () => {
        try {
            console.log('Fetching roadmap PDFs...');
            const response = await StudyAreaService.get_all_pdfs_for_roadmap(roadmapUid);
            // console.log('roadmap PDFs response:', response);
            setRoadmapPDFs(response || []);
        } catch (error) {
            console.error("Error fetching roadmap PDFs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoadmapPDFs();
        fetchRoadmapDetails();
    }, []);

    useEffect(() => {
        console.log('Fetched roadmap PDFs:', roadmapPDFs);
    }, [roadmapPDFs]);

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <section className="flex flex-col">
            <h1 className="flex items-center text-2xl font-semibold text-gray-800 mb-6">Dashboard <ChevronRight /> <span className="text-purple-600">{subject}</span></h1>
            <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-md">
                <Roadmap roadmapData={roadmapDetails} />

                {/* Current Study Areas */}
                <FileUpload />

                {/* flashcards */}
                <h2 className="text-xl font-semibold text-gray-800 mt-10">Your Flashcards</h2>
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
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Roadmap PDFs</h2>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 px-6 py-3 bg-gray-50 text-sm font-medium text-gray-500">
                        <div className="col-span-2">Name</div>
                        <div>Uploaded On</div>
                        <div>Topic</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-200 bg-white">
                        {roadmapPDFs.map((pdf) => (
                            <div key={pdf.uid} className="grid grid-cols-4 px-6 py-4 items-center hover:bg-gray-50">
                                {/* File Icon & Name */}
                                <div className="col-span-2 flex items-center gap-3 flex-nowrap">
                                    <FileText className="text-red-400 flex-shrink-0" size={20} />
                                    <div className="text-sm font-medium text-gray-700 hover:text-purple-600 whitespace-normal break-words">
                                        <Link to={pdf.url}>{pdf.notes.title}</Link>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="text-sm text-gray-500">{formatDate(pdf.date_uploded)}</div>

                                {/* Section Label & Delete Button */}
                                <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs">
                                        {pdf.notes.sections[0].title}
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
