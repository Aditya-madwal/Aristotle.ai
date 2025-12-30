import React, { useEffect, useState } from "react";
import { Book, Video, Link as LinkIcon, ChevronRight, Radio } from "lucide-react";
import StudyAreaServices from "../../lib/api/StudyAreaDashboard.jsx/StudyAreaServices";

import { X } from "lucide-react";



const QuizModel = ({ isOpen, onClose, quizQuestions , onComplete}) => {
  const [answers, setAnswers] = useState({});

  if (!isOpen) return null;

  const checkAnswers = () => {
    let score = 0;
    quizQuestions?.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        score++;
      }
    });
    alert(`Your score is: ${score} / ${quizQuestions?.length}`);
    const score_percent = score / quizQuestions?.length;
    if (score_percent >= 0.8) {
      onComplete();
      alert("congo, you have completed the milestone");
    } else {
      alert("you need to score more than 80% to complete milestone")
    }
  };


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="rounded-lg bg-white p-8 shadow-2xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Quiz</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {quizQuestions?.map((question, index) => (
          <div>
            <h3>{question.question}</h3>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input 
                    type="radio" 
                    name={`question-${index}`} 
                    value={option} 
                    checked={answers[index] === option}
                    onChange={() => setAnswers(prev => ({...prev, [index]: option}))}
                  />
                  <span className="text-gray-700">{option}</span>
                  <br />
                </label>
              ))}
            </div>
            <br />
          </div>
        ))}
        

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
            Cancel
          </button>

          <button 
            onClick={checkAnswers}
            className="rounded bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
            Check Answers
          </button>
        </div>
      </div>
    </div>
  );
};

const RoadmapMilestone = ({ milestone, isCurrentMilestone, onComplete }) => {
  useEffect(() => {
    console.log("Milestone data:", milestone);
  }, []);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isquizopen, setIsQuizOpen] = useState(false);

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

  const handleUpdateMilestone = () => {
    onComplete();
    setIsQuizOpen(false);
  };

  if (isquizopen) {
    return(<QuizModel isOpen={isquizopen} onClose={() => setIsQuizOpen(false)} quizQuestions={milestone.quiz} onComplete={handleUpdateMilestone}/>);
  }

  return (
    <div
      className={`rounded-xl p-4 ${
        isCurrentMilestone ? "bg-purple-100" : "bg-gray-100"
      } w-full`}>
      <h3 className="font-semibold text-base mb-2">{milestone.title}</h3>
      <p className="text-gray-600 text-sm mb-2">
        Duration: {milestone.duration}
      </p>

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
              onClick={() => setIsExpanded(true)}>
              +{milestone.topics.length - 3} more topics...
            </li>
          )}
        </ul>
      </div>

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
                className="flex items-center gap-2 text-xs text-gray-600 hover:text-purple-600">
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
                    }`}>
        {isExpanded ? "Show Less" : "Know More"}
      </button>
      {isCurrentMilestone && (
        <button
          // onClick={onComplete}
          onClick={() => setIsQuizOpen(true)}
          className={`mt-2 w-full py-1.5 px-3 rounded-full text-sm text-center transition-colors duration-200 
                    ${
                      isCurrentMilestone
                        ? "bg-purple-200 hover:bg-purple-300 text-purple-700"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}>
          Mark as Complete
        </button>
      )}
    </div>
  );
};

const Roadmap = ({ roadmapData, fetchRoadmapData }) => {
  if (!roadmapData) return null;

  const handleIncrementMilestone = async () => {
    try {
      await StudyAreaServices.incrementMilestone(roadmapData.uid);
      fetchRoadmapData();
    } catch (error) {
      console.error("Error incrementing milestone:", error);
    }
  };
  console.log(roadmapData.status);

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Roadmap</h2>
          {/* <ChevronRight className="w-5 h-5 text-gray-400" />
          <span className="text-purple-600">{roadmapData?.subject}</span> */}
          <span className="text-sm text-gray-500">
            ({roadmapData?.duration})
          </span>
          {roadmapData.status == true ? (
            <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="-ms-1 me-1.5 size-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="whitespace-nowrap text-sm">Completed</p>
            </span>
          ) : (
            <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="-ms-1 me-1.5 size-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="whitespace-nowrap text-sm">In Progress</p>
            </span>
          )}
        </div>
      </div>

      <div className="border border-dashed border-gray-300 rounded-lg h-[50vh] overflow-y-auto">
        <div className="p-6 relative">
          <div className="absolute left-8 top-0 bottom-0 w-px border-l-2 border-dashed border-gray-300" />

          <div className="space-y-8">
            {roadmapData?.milestones?.map((milestone, index) => (
              <div key={milestone.uid} className="relative pl-16">
                <div className="absolute left-8 top-1/2 w-8 h-px bg-purple-400" />

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
                    roadmapData.current_milestone &&
                    roadmapData.current_milestone?.uid === milestone.uid
                  }
                  onComplete={handleIncrementMilestone}
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
