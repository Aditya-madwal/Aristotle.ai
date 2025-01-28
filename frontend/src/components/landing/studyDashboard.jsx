import React, { useEffect, useState } from 'react';
import { FolderOpen, MoreVertical, Plus, FileText, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import HomeServices from '../../lib/api/HomeDashboard.jsx/HomeServices';

const StudyDashboard = () => {
    const [studyAreas, setStudyAreas] = useState([]);
    const [recentPDFs, setRecentPDFs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [roadmapsResponse, pdfsResponse] = await Promise.all([
                HomeServices.getAllRoadmaps(),
                HomeServices.getRecentPDFs()
            ]);

            setStudyAreas(roadmapsResponse);
            setRecentPDFs(pdfsResponse.pdfs || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
        <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-md">
            {/* Add New Study Area Button */}
            <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 bg-purple-100 p-2 px-4 rounded-full">
                <Plus size={20} />
                <span className="text-sm font-medium">Add New Study Area</span>
            </button>

            {/* Current Study Areas */}
            <div className="mb-12">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Study Areas</h2>
                <div className="flex flex-wrap gap-5">
                    {studyAreas.map((area) => (
                        <div
                            key={area.uid}
                            className="flex flex-col p-4 rounded-md border border-gray-200 bg-white hover:shadow-sm transition-shadow w-64"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <Link className="flex items-center gap-2" to={`/studyarea/${area.uid}`}>
                                    <FolderOpen className="text-orange-400" size={20} />
                                    <span className="text-sm font-medium text-gray-700">{area.subject}</span>
                                </Link>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                            <div className="text-xs text-gray-500">Duration: {area.duration}</div>
                            <div className="mt-2 text-xs text-purple-600 bg-purple-50 p-2 rounded">
                                Current: {area.current_milestone?.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent PDFs */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent PDFs</h2>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 px-6 py-3 bg-gray-50 text-sm font-medium text-gray-500">
                        <div className="col-span-2">Name</div>
                        <div>Uploaded On</div>
                        <div>Topic</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-200 bg-white">
                        {recentPDFs.map((pdf) => (
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
    );
};

export default StudyDashboard;