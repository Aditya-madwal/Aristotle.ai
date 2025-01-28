import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

const FileUpload = ({ onFileUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFileInput = (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const pdfFiles = files.filter(file => file.type === 'application/pdf');
        if (pdfFiles.length > 0 && onFileUpload) {
            onFileUpload(pdfFiles);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full mx-auto mb-4">
            <h2 className="text-xl font-semibold mb-4">
                Upload PDF notes for AI Summarization
            </h2>

            <div
                onClick={handleClick}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`
                    border-2 border-dashed rounded-lg p-8
                    flex flex-col items-center justify-center
                    cursor-pointer
                    transition-colors
                    ${isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }
                `}
            >
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Upload className="w-6 h-6 text-blue-500" />
                </div>

                <p className="text-gray-700 mb-2">
                    Drag and drop here to upload.
                </p>

                <button
                    className="text-blue-500 underline text-sm"
                    onClick={handleClick}
                >
                    Choose files or folders from your computer.
                </button>

                <p className="text-gray-500 text-sm mt-2">
                    Support .pdf files
                </p>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                />
            </div>
        </div>
    );
};

export default FileUpload;
