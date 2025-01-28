import React, { useState } from "react";
import { Book, Video, Link as LinkIcon, ChevronRight } from "lucide-react";

const RoadmapMilestone = ({ milestone, isCurrentMilestone }) => {
  const handleIncrementMilestone = () => {
    // Handle incrementing the milestone
    alert(`Incrementing milestone: ${milestone.title}`);
  };

  console.log(milestone, isCurrentMilestone);

  const [isExpanded, setIsExpanded] = useState(isCurrentMilestone);
  const getResourceIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "article":
        return <Book className="w-4 h-4" />;
      default:
        return <LinkIcon className="w-4 h-4" />;
    }
  };

  return (
    <div
      className={`rounded-xl p-4 ${
        isCurrentMilestone ? "bg-purple-100" : "bg-gray-100"
      } w-full`}
    >
      <h3 className="font-semibold text-base mb-2">{milestone.title}</h3>
      <p className="text-gray-600 text-sm mb-2">
        Duration: {milestone.duration}
      </p>

      {/* Topics */}
      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-1">Topics covered:</p>
        <ul className="text-xs text-gray-700 list-disc list-inside">
          {milestone.topics
            .slice(0, isExpanded ? undefined : 3)
            .map((topic, index) => (
              <li key={index} className="mb-0.5">
                {topic}
              </li>
            ))}
          {!isExpanded && milestone.topics.length > 3 && (
            <li
              className="text-purple-600 cursor-pointer"
              onClick={() => setIsExpanded(true)}
            >
              +{milestone.topics.length - 3} more topics...
            </li>
          )}
        </ul>
      </div>

      {/* Resources */}
      {isExpanded && (
        <div className="mb-3">
          <p className="text-xs font-medium text-gray-600 mb-1">Resources:</p>
          <div className="space-y-2">
            {milestone.resources.map((resource) => (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-gray-600 hover:text-purple-600"
              >
                {getResourceIcon(resource.type)}
                <span className="truncate">{resource.title}</span>
                <span className="text-gray-400">
                  ({resource.estimated_time})
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {isExpanded && milestone.projects.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-medium text-gray-600 mb-1">Projects:</p>
          {milestone.projects.map((project) => (
            <div key={project.id} className="text-xs text-gray-700">
              <p className="font-medium">{project.title}</p>
              <p className="text-gray-500">{project.description}</p>
              <span className="inline-block px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-xs mt-1">
                {project.difficulty}
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`mt-2 w-full py-1.5 px-3 rounded-full text-sm text-center transition-colors duration-200 
                    ${
                      isCurrentMilestone
                        ? "bg-purple-200 hover:bg-purple-300 text-purple-700"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
      >
        {isExpanded ? "Show Less" : "Know More"}
      </button>
      {isCurrentMilestone && (
        <button
          onClick={() => handleIncrementMilestone()}
          className={`mt-2 w-full py-1.5 px-3 rounded-full text-sm text-center transition-colors duration-200 
                    ${
                      isCurrentMilestone
                        ? "bg-purple-200 hover:bg-purple-300 text-purple-700"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
        >
          Completed
        </button>
      )}
    </div>
  );
};

const Roadmap = ({ roadmapData }) => {
  if (!roadmapData) return null;

  return (
    <div className="w-full mx-auto mb-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold">Roadmap</h2>
        <ChevronRight className="w-5 h-5 text-gray-400" />
        <span className="text-purple-600">{roadmapData?.subject}</span>
        <span className="text-sm text-gray-500 ml-2">
          ({roadmapData?.duration})
        </span>
      </div>

      {/* Fixed height scrollable container */}
      <div className="border border-dashed border-gray-300 rounded-lg h-[50vh] overflow-y-auto">
        <div className="p-6 relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px border-l-2 border-dashed border-gray-300" />

          {/* Milestones */}
          <div className="space-y-8">
            {roadmapData?.milestones?.map((milestone, index) => (
              <div key={milestone.id} className="relative pl-16">
                {/* Horizontal connector line */}
                <div className="absolute left-8 top-1/2 w-8 h-px bg-purple-400" />

                {/* Timeline dot */}
                <div
                  className={`absolute left-7 top-1/2 w-2 h-2 rounded-full 
                                        ${
                                          milestone.status
                                            ? "bg-green-500"
                                            : "bg-purple-500"
                                        } 
                                        -translate-y-1/2`}
                />

                <RoadmapMilestone
                  milestone={milestone}
                  isCurrentMilestone={
                    roadmapData.current_milestone.uid === milestone.uid
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
