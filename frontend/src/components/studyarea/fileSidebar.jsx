import React, { useState } from "react";
import {
  Plus,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Folder,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { StudyAreaService } from "../../lib/api/StudyAreaDashboard.jsx/StudyAreaServices";

const FileSidebar = ({
  roadmapUid,
  fileId,
  fileName,
  topic,
  dateUploaded,
  summary,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [roadmapuid, setRoadmapUid] = useState(roadmapUid);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleDeletePDF = async () => {
    alert(roadmapUid)
    alert(fileId)
    // try {
    //   await StudyAreaService.deletePDF(roadmapUid, fileId);
    //   // Navigate back to the roadmap page after successful deletion
    //   navigate(`/studyarea/${roadmapUid}`);
    // } catch (error) {
    //   console.error("Error deleting PDF:", error);
    // }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-white transition-all duration-300 ${
        isOpen ? "w-72" : "w-12"
      }`}
      style={{ position: "sticky" }}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
      >
        {isOpen ? (
          <ArrowRightFromLine size={18} />
        ) : (
          <ArrowLeftFromLine size={18} />
        )}
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
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-2">
                <span className="text-gray-500 text-sm font-medium">File Name</span>
                <span className="text-sm break-words text-right max-w-[60%] font-medium">{fileName}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-gray-500 text-sm font-medium">Topic</span>
                <span className="text-sm break-words text-right max-w-[60%] font-medium">{topic}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-gray-500 text-sm font-medium">Date Uploaded</span>
                <span className="text-sm text-right font-medium">{dateUploaded}</span>
              </div>

              {/* Summary Section */}
              <div className="bg-amber-50 p-3 rounded-lg">
                <h3 className="text-orange-400 text-sm font-medium mb-2">Summary</h3>
                <p className="text-xs text-black whitespace-pre-wrap break-words">
                  {summary || "No summary available"}
                </p>
              </div>
            </div>
          </div>

          {/* Fixed Buttons at Bottom */}
          <div className="pt-4 pb-4 border-t mt-4">
            <div className="flex justify-center items-center w-full bg-purple-600 text-white text-sm py-2.5 rounded-full mb-2 hover:bg-purple-700 transition-colors">
              <Link to={`pdf/${fileId}`}>Open File</Link>
            </div>
            <button 
              onClick={handleDeletePDF}
              className="w-full border border-pink-500 text-pink-500 text-sm py-2.5 rounded-full hover:bg-pink-50 transition-colors"
            >
              Delete File
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileSidebar;
