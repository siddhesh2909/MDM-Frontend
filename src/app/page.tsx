"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaMoon, FaSun, FaRocket, FaUsers, FaChartLine } from "react-icons/fa";

import { Button } from "../components/ui/Button";
import { useTheme } from "./context/ThemeContext";

const DESCRIPTION =
  "Simplify your workflow and boost productivity with our powerful platform designed for modern teams.";

const Home = () => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen w-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
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
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle theme"
          className={`p-3 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 hover:scale-110 ${
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
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left section - Content */}
          <div className="text-center md:text-left space-y-8">
            {/* Logo/Brand */}
            <div className="inline-block">
              <h1
                className={`text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r ${
                  isDarkMode
                    ? "from-blue-400 via-purple-400 to-pink-400"
                    : "from-blue-600 via-purple-600 to-pink-600"
                }`}
              >
                MDM
              </h1>
              <div
                className={`h-1 w-full rounded-full bg-gradient-to-r ${
                  isDarkMode
                    ? "from-blue-400 to-purple-400"
                    : "from-blue-600 to-purple-600"
                }`}
              />
            </div>

            {/* Headline */}
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Your all-in-one
              <br />
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r ${
                  isDarkMode
                    ? "from-blue-400 to-purple-400"
                    : "from-blue-600 to-purple-600"
                }`}
              >
                productivity solution
              </span>
            </h2>

            {/* Description */}
            <p
              className={`text-lg sm:text-xl leading-relaxed ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {DESCRIPTION}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0">
              <Button
                onClick={() => router.push("/signup")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Started
              </Button>

              <Button
                onClick={() => router.push("/login")}
                className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700/50"
                    : "bg-white/50 border-gray-300 text-slate-900 hover:bg-white/80"
                }`}
              >
                Sign In
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center md:justify-start gap-8 pt-4">
              <div className="text-center">
                <p
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  10K+
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Active Users
                </p>
              </div>
              <div className="text-center">
                <p
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  99.9%
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Uptime
                </p>
              </div>
              <div className="text-center">
                <p
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  24/7
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Support
                </p>
              </div>
            </div>
          </div>

          {/* Right section - Visual */}
          <div className="hidden md:block relative">
            <div
              className={`absolute inset-0 bg-gradient-to-br rounded-3xl blur-2xl opacity-30 ${
                isDarkMode
                  ? "from-blue-500 to-purple-500"
                  : "from-blue-400 to-purple-400"
              }`}
            />

            <div
              className={`relative backdrop-blur-xl rounded-3xl p-8 border shadow-2xl ${
                isDarkMode
                  ? "bg-slate-800/50 border-slate-700"
                  : "bg-white/50 border-white"
              }`}
            >
              {/* Feature cards */}
              <div className="space-y-6">
                <FeatureCard
                  icon={<FaRocket className="text-2xl" />}
                  title="Lightning Fast"
                  description="Experience blazing fast performance"
                  isDarkMode={isDarkMode}
                />
                <FeatureCard
                  icon={<FaUsers className="text-2xl" />}
                  title="Team Collaboration"
                  description="Work together seamlessly"
                  isDarkMode={isDarkMode}
                />
                <FeatureCard
                  icon={<FaChartLine className="text-2xl" />}
                  title="Analytics"
                  description="Track your progress in real-time"
                  isDarkMode={isDarkMode}
                />
              </div>

              {/* Decorative element */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <p
                  className={`text-center font-semibold ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  ✨ Trusted by leading teams worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, isDarkMode }) => (
  <div
    className={`flex items-start gap-4 p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 cursor-pointer ${
      isDarkMode
        ? "bg-slate-700/30 border-slate-600 hover:bg-slate-700/50"
        : "bg-white/50 border-gray-200 hover:bg-white/80"
    }`}
  >
    <div
      className={`p-3 rounded-xl ${
        isDarkMode
          ? "bg-gradient-to-br from-blue-500 to-purple-500"
          : "bg-gradient-to-br from-blue-600 to-purple-600"
      }`}
    >
      <div className="text-white">{icon}</div>
    </div>
    <div>
      <h3
        className={`font-semibold text-lg mb-1 ${
          isDarkMode ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm ${
          isDarkMode ? "text-slate-400" : "text-slate-600"
        }`}
      >
        {description}
      </p>
    </div>
  </div>
);

export default Home;