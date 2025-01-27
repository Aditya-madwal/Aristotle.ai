import React, { useState } from 'react';
import { Plus, Circle, CheckCircle2, ArrowLeftFromLine, ArrowRightFromLine, Maximize2 } from 'lucide-react';

const TaskSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Nostrud veniam ad ullamco cupidatat nostrud non officia nisi Lorem incididunt amet non elit laborum sunt incididunt anim.',
            completed: false,
            labels: ['Label', 'Label', 'Label']
        },
        {
            id: 2,
            text: 'Nostrud veniam ad ullamco cupidatat nostrud non officia nisi Lorem incididunt amet non elit laborum sunt incididunt anim.',
            completed: true,
            labels: ['Label', 'Label', 'Label']
        },
        {
            id: 3,
            text: 'Nostrud veniam ad ullamco cupidatat nostrud non officia nisi Lorem incididunt amet non elit laborum sunt incididunt anim.',
            completed: false,
            labels: ['Label', 'Label', 'Label']
        }
    ]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div
            className={`fixed top-0 right-0 h-screen bg-white border-l transition-all duration-300 ${isOpen ? 'w-96' : 'w-12'
                }`}
        >
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
            >
                {isOpen ? <ArrowRightFromLine size={20} /> : <ArrowLeftFromLine size={20} />}
            </button>

            {/* Maximize Button */}
            <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
                <Maximize2 size={20} />
            </button>

            {isOpen && (
                <div className="h-full flex flex-col pt-16">
                    {/* Title */}
                    <h2 className="px-6 text-lg font-semibold mb-4">Things to be done</h2>

                    {/* Tasks List */}
                    <div className="flex-1 overflow-y-auto px-6">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`mb-4 p-4 rounded-lg ${task.completed ? 'bg-gray-50' : 'bg-yellow-50'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <button
                                        onClick={() => toggleTaskCompletion(task.id)}
                                        className="mt-1 flex-shrink-0 text-gray-400 hover:text-gray-600"
                                    >
                                        {task.completed ? (
                                            <CheckCircle2 size={20} />
                                        ) : (
                                            <Circle size={20} />
                                        )}
                                    </button>
                                    <div>
                                        <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                            {task.text}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {task.labels.map((label, index) => (
                                                <span
                                                    key={index}
                                                    className={`px-2 py-1 rounded-full text-xs ${index % 3 === 0 ? 'bg-green-100 text-green-700' :
                                                        index % 3 === 1 ? 'bg-pink-100 text-pink-700' :
                                                            'bg-orange-100 text-orange-700'
                                                        }`}
                                                >
                                                    {label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Task Button */}
                    <div className="p-6 border-t bg-white">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-gray-600">
                            <Plus size={20} />
                            <span>Add Task...</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskSidebar;