import React from 'react';
import { FolderOpen, MoreVertical, Plus, FileText, Trash2 } from 'lucide-react';

const StudyDashboard = () => {
    // Sample study areas data
    const studyAreas = [
        { id: 1, name: 'Gen AI' },
        { id: 2, name: 'UI/UX design' },
        { id: 3, name: 'Full Stack' },
        { id: 4, name: 'End Sem Exam Prep' },
        { id: 5, name: 'Sketching' },
    ];

    // Sample PDFs data
    const recentPDFs = [
        { id: 1, name: 'UserPersona.pdf', size: '3.7 MB', date: 'Jun 23, 2024', topic: 'User Persona' },
        { id: 2, name: 'UserPersona.pdf', size: '3.7 MB', date: 'Jun 23, 2024', topic: 'User Persona' },
        { id: 3, name: 'UserPersona.pdf', size: '3.7 MB', date: 'Jun 23, 2024', topic: 'User Persona' },
        { id: 4, name: 'UserPersona.pdf', size: '3.7 MB', date: 'Jun 23, 2024', topic: 'User Persona' },
        { id: 5, name: 'UserPersona.pdf', size: '3.7 MB', date: 'Jun 23, 2024', topic: 'User Persona' },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md">
            {/* Add New Study Area Button */}
            <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8">
                <Plus size={20} />
                <span className="text-sm font-medium">Add New Study Area</span>
            </button>

            {/* Current Study Areas */}
            <div className="mb-12">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Study Areas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {studyAreas.map((area) => (
                        <div
                            key={area.id}
                            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
                        >
                            <div className="flex items-center gap-3">
                                <FolderOpen className="text-orange-400" size={24} />
                                <span className="font-medium text-gray-700">{area.name}</span>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent PDFs */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent PDFs</h2>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-5 px-6 py-3 bg-gray-50 text-sm font-medium text-gray-500">
                        <div className="col-span-2">Name</div>
                        <div>Size</div>
                        <div>Uploaded On</div>
                        <div>Topic</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-200 bg-white">
                        {recentPDFs.map((pdf) => (
                            <div key={pdf.id} className="grid grid-cols-5 px-6 py-4 items-center hover:bg-gray-50">
                                <div className="col-span-2 flex items-center gap-3">
                                    <FileText className="text-red-400" size={20} />
                                    <span className="text-sm font-medium text-gray-700">{pdf.name}</span>
                                </div>
                                <div className="text-sm text-gray-500">{pdf.size}</div>
                                <div className="text-sm text-gray-500">{pdf.date}</div>
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
    );
};

export default StudyDashboard;