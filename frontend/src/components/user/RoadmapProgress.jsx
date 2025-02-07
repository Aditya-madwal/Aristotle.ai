const subjects = [
  {
    name: "Mathematics",
    progress: 75,
    color: "bg-violet-500",
    bgcolor: "bg-violet-100",
  },
  {
    name: "Physics",
    progress: 60,
    color: "bg-blue-500",
    bgcolor: "bg-blue-100",
  },
  {
    name: "Computer Science",
    progress: 90,
    color: "bg-green-500",
    bgcolor: "bg-green-100",
  },
  {
    name: "Chemistry",
    progress: 45,
    color: "bg-yellow-500",
    bgcolor: "bg-yellow-100",
  },
  {
    name: "English",
    progress: 80,
    color: "bg-pink-500",
    bgcolor: "bg-pink-100",
  },
];

const SubjectStats = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Subject Progress
      </h2>
      <div className="space-y-4">
        {subjects.map((subject) => (
          <div key={subject.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                {subject.name}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {subject.progress}%
              </span>
            </div>
            <div
              className={`w-full bg-gray-200 rounded-full h-2.5 ${
                subject.progress <= 50 && "bg-red-100"
              }`}
            >
              <div
                className={`h-2.5 rounded-full ${subject.color}`}
                style={{ width: `${subject.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectStats;
