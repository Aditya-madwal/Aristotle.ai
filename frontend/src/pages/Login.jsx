import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import authServices from "../lib/api/authServices/authservices";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setMe } = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const loginResponse = await authServices.login(username, password);

      if (!loginResponse.access) {
        throw new Error("No access token received");
      }

      const authResponse = await authServices.isAuthenticated();

      if (!authResponse.isAuthenticated) {
        alert("Failed to authenticate user");
      } else {
        console.log(authResponse);
        setMe(authResponse.user);
      }

      navigate("/");

    } catch (error) {
      console.error("Login error:", error);
      alert(
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white h-screen">
      <div className="lg:grid lg:grid-cols-12 lg:h-full">
        {/* Sidebar with Image */}
        <aside className="relative lg:col-span-5 xl:col-span-6 h-full hidden lg:block">
        <img
            alt=""
            src="https://i.pinimg.com/736x/c3/88/80/c3888023324759ca0e60fdbb9b2a6119.jpg"
            className="absolute inset-0 h-full w-full object-cover p-8 rounded-[100px]"
          />
        </aside>

        {/* Form Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 overflow-y-auto">
          <div className="max-w-xl lg:max-w-3xl w-full">
            {loading && <div className="text-center text-gray-600">Loading...</div>}

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome Back 👋
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Please sign in to your account to continue
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
              {/* Username */}
              <div className="col-span-6">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder="Enter your username"
                />
              </div>

              {/* Password */}
              <div className="col-span-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder="Enter your password"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="col-span-6 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <Link
                  to="/auth/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Don't have an account?{" "}
                  <Link to="/auth/register" className="text-gray-700 underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
