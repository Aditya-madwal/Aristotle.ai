const userInfo = {
  name: "Test User 2",
  pfp: "https://images.unsplash.com/photo-1738676524296-364cf18900a8?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  email: "testuser234@example.com",
  username: "testuser234",
  bio: "hey i am a student",
  course: "B.tech",
};

const UserIdentity = () => {
  return (
    <div className="h-fit bg-white p-8 rounded-lg w-full mb-4">
      <div className="w-full mx-auto">
        <div className="flex items-start gap-8">
          {/* Profile Image */}
          <div className="w-40 h-40 relative rounded-full overflow-hidden">
            <img
              src={userInfo.pfp}
              alt={userInfo.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Information */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-semibold text-gray-900">
                {userInfo.name}
              </h1>
              <button className="text-violet-500 hover:text-violet-600 transition-colors">
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-black font-medium">Education status</p>
                <p className="text-gray-900">{userInfo.course}</p>
              </div>
              <div className="text-right">
                <p className="text-black font-medium">Age</p>
                <p className="text-gray-900">19</p>
              </div>
              <div>
                <p className="text-black font-medium">University</p>
                <p className="text-gray-900">KIET</p>
              </div>
              <div className="text-right">
                <p className="text-black font-medium">Domain</p>
                <p className="text-gray-900">Computer Science</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserIdentity;
