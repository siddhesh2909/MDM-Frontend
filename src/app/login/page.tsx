"use client";

import { useEffect, useState } from "react";
import { login, setCookie } from "../api/authAPI";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaMoon, FaSun } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoadingPage from "../components/LoadingPage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [urlToken, setUrlToken] = useState(false);

  const { isDarkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const error = params.get("error");

    if (error === "404") {
      toast.error("You do not have an account registered with that email.");
      return;
    }

    const googleLogin = async () => {
      setUrlToken(true);
      const response = await setCookie(token);
      if (response.status === 200) {
        toast.success("Log in successful");
        router.push("/dashboardMain");
      }
      setUrlToken(false);
    };

    if (token) googleLogin();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(username, password);
      if (response.status === 200) {
        toast.success("Log in successful");
        router.push("/dashboardMain");
      }
    } catch (error) {
      toast.error("Wrong credentials. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    try {
      window.location.href = "http://localhost:8000/api/v1/auth/google";
    } catch (error) {
      toast.error("Failed to redirect to Google. Please try again.");
    }
  };

  if (urlToken) return <LoadingPage />;

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDarkMode ? "bg-blue-500" : "bg-blue-400"
          }`}
        />
        <div
          className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDarkMode ? "bg-purple-500" : "bg-purple-400"
          }`}
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleDarkMode}
        aria-label="Toggle theme"
        className={`absolute top-4 right-4 z-10 p-3 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 hover:scale-110 ${
          isDarkMode
            ? "bg-slate-800/80 border-slate-700 hover:bg-slate-700"
            : "bg-white/80 border-gray-200 hover:bg-white"
        }`}
      >
        {isDarkMode ? (
          <FaSun className="text-yellow-400 text-lg" />
        ) : (
          <FaMoon className="text-slate-700 text-lg" />
        )}
      </button>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left section - Branding */}
          <div className="hidden lg:flex flex-col justify-center space-y-6 p-8">
            <div>
              <h1
                className={`text-6xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
                  isDarkMode
                    ? "from-blue-400 via-purple-400 to-pink-400"
                    : "from-blue-600 via-purple-600 to-pink-600"
                }`}
              >
                Welcome Back
              </h1>
              <p
                className={`text-xl ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Sign in to continue to your dashboard
              </p>
            </div>

            <div className="space-y-4">
              <FeatureItem
                icon="🚀"
                text="Access your analytics dashboard"
                isDarkMode={isDarkMode}
              />
              <FeatureItem
                icon="📊"
                text="Track performance metrics"
                isDarkMode={isDarkMode}
              />
              <FeatureItem
                icon="🔒"
                text="Secure and encrypted"
                isDarkMode={isDarkMode}
              />
            </div>
          </div>

          {/* Right section - Login form */}
          <div
            className={`backdrop-blur-xl rounded-3xl p-8 md:p-10 border shadow-2xl transition-all duration-300 ${
              isDarkMode
                ? "bg-slate-800/50 border-slate-700"
                : "bg-white/70 border-white"
            }`}
          >
            <div className="mb-8 text-center lg:hidden">
              <h1 className="text-3xl md:text-4xl mb-2 font-extrabold">
                Welcome to{" "}
                <span
                  className={`bg-clip-text text-transparent bg-gradient-to-r ${
                    isDarkMode
                      ? "from-blue-400 to-purple-400"
                      : "from-blue-600 to-purple-600"
                  }`}
                >
                  EzyMetrics
                </span>
              </h1>
              <p
                className={`${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Sign in to your account
              </p>
            </div>

            {/* Social login buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleGoogleLogin}
                className={`w-full h-12 md:h-14 px-4 py-3 rounded-xl font-medium shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 ${
                  isDarkMode
                    ? "bg-white text-slate-900 hover:bg-gray-50"
                    : "bg-white text-slate-900 hover:bg-gray-50"
                }`}
              >
                <FcGoogle size={24} />
                <span>Continue with Google</span>
              </button>

              <button
                className={`w-full h-12 md:h-14 px-4 py-3 rounded-xl font-medium shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 ${
                  isDarkMode
                    ? "bg-[#1877F2] text-white hover:bg-[#166FE5]"
                    : "bg-[#1877F2] text-white hover:bg-[#166FE5]"
                }`}
              >
                <FaFacebookF size={20} />
                <span>Continue with Facebook</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div
                className={`flex-grow border-t ${
                  isDarkMode ? "border-slate-600" : "border-gray-300"
                }`}
              />
              <span
                className={`mx-4 text-sm font-medium ${
                  isDarkMode ? "text-slate-400" : "text-gray-500"
                }`}
              >
                OR
              </span>
              <div
                className={`flex-grow border-t ${
                  isDarkMode ? "border-slate-600" : "border-gray-300"
                }`}
              />
            </div>

            {/* Login form */}
            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="relative">
                <MdEmail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={22}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full h-12 md:h-14 pl-12 pr-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-slate-900/50 border-slate-600 text-white placeholder-slate-500"
                      : "bg-white border-gray-300 text-slate-900 placeholder-gray-400"
                  }`}
                />
              </div>

              <div className="relative">
                <RiLockPasswordFill
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={22}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full h-12 md:h-14 pl-12 pr-12 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-slate-900/50 border-slate-600 text-white placeholder-slate-500"
                      : "bg-white border-gray-300 text-slate-900 placeholder-gray-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={22} />
                  ) : (
                    <AiFillEye size={22} />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => router.push("/forgot_password")}
                  className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 md:h-14 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p
              className={`text-center mt-6 text-sm ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="font-semibold text-blue-500 hover:text-blue-600 transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature item component
const FeatureItem = ({ icon, text, isDarkMode }) => (
  <div
    className={`flex items-center gap-3 p-4 rounded-xl backdrop-blur-md border transition-all duration-300 ${
      isDarkMode
        ? "bg-slate-800/30 border-slate-700"
        : "bg-white/50 border-gray-200"
    }`}
  >
    <span className="text-2xl">{icon}</span>
    <span
      className={`font-medium ${
        isDarkMode ? "text-slate-300" : "text-slate-700"
      }`}
    >
      {text}
    </span>
  </div>
);

export default Login;