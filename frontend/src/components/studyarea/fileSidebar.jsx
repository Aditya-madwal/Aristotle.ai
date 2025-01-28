import React, { useState } from 'react';
import { Plus, ArrowLeftFromLine, ArrowRightFromLine, Folder } from 'lucide-react';

const FileSidebar = ({
    fileId,
    fileName,
    topic,
    dateUploaded,
    summary
}) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`fixed top-0 right-0 h-screen bg-white transition-all duration-300 ${isOpen ? 'w-72' : 'w-12'}`}
            style={{ position: "sticky" }}
        >
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
            >
                {isOpen ? <ArrowRightFromLine size={18} /> : <ArrowLeftFromLine size={18} />}
            </button>

            {isOpen && (
                <div className="h-full flex flex-col pt-14 px-4">
                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto">
                        {/* File Details Header */}
                        <div className="flex flex-col items-center mb-5">
                            <Folder className="text-orange-400 w-10 h-10 mb-1" />
                            <h2 className="text-base font-medium">File Details</h2>
                        </div>

                        {/* File Details Content */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">File Name</span>
                                <span className="text-sm">{fileName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">Topic</span>
                                <span className="text-sm">{topic}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">Date Uploaded</span>
                                <span className="text-sm">{dateUploaded}</span>
                            </div>

                            {/* Summary Section */}
                            <div className="bg-amber-50 p-3 rounded-lg">
                                <h3 className="text-orange-400 text-sm mb-1.5">Summary</h3>
                                <p className="text-xs text-black">
                                    {summary || "No summary available"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Fixed Buttons at Bottom */}
                    <div className="pt-4 pb-4 border-t mt-4">
                        <button className="w-full bg-purple-600 text-white text-sm py-2.5 rounded-full mb-2 hover:bg-purple-700 transition-colors" onClick={() => alert(fileId)}>
                            Open File
                        </button>
                        <button className="w-full border border-pink-500 text-pink-500 text-sm py-2.5 rounded-full hover:bg-pink-50 transition-colors">
                            Delete File
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileSidebar;
