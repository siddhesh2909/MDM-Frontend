"use client";

import { useState, useCallback, memo } from "react";
import { FaBars } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import { useActiveTab } from "../context/ActiveTabContext";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { setActiveTab } = useActiveTab();
  const router = useRouter();

  const handleNavigation = useCallback(() => {
    setActiveTab("dashboardMain");
    router.push("/dashboardMain");
  }, [router, setActiveTab]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    console.log("Search:", searchQuery);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 h-[64px] flex items-center justify-between px-4 shadow-md transition-colors ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Logo */}
      <button
        onClick={handleNavigation}
        className="text-2xl font-extrabold focus:outline-none"
      >
        Ezy<span className="text-[#1C6BA0]">Metrics</span>
      </button>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-3">
        <form onSubmit={handleSearch} className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="pl-9 pr-3 py-2 rounded-full text-sm border dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </form>

        <button
          onClick={handleNavigation}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <FaChartBar />
        </button>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-300 dark:bg-gray-600"
        >
          {isDarkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon />
          )}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen((v) => !v)}
        className="md:hidden p-2"
      >
        <FaBars />
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[64px] right-2 w-56 rounded-lg bg-white dark:bg-gray-700 shadow-lg p-4 md:hidden">
          <form onSubmit={handleSearch} className="relative mb-3">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 rounded-full text-sm dark:bg-gray-600"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </form>

          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 text-sm"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default memo(Nav);
