"use client";
import React, { useEffect, useState, memo } from "react";
import { useTheme } from "../context/ThemeContext";
import { useActiveTab } from "../context/ActiveTabContext";
import Link from "next/link";
import { FaChartBar } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaPalette } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaLifeRing } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import Icon from "./ThemeComponent/Icon";
import { useSidebar } from "../context/SidebarContext";
import { logout } from "../api/authAPI";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchProfile } from "../api/profileAPI";

const sidebarItems = [
  {
    icon: <FaChartBar />,
    text: "Insights",
    link: "/",
    submenuComponent: [
      { text: "CMO Dashboard", link: "/dashboardMain", tab: "dashboardMain" },
    ],
  },
  {
    icon: <FaFileAlt />,
    text: "Data Management",
    link: "/data_management",
    submenuComponent: null,
  },
  {
    icon: <FaCog />,
    text: "Settings",
    link: "/Setting",
    submenuComponent: [
      { text: "Profile", link: "/Setting", tab: "profile" },
      { text: "Account", link: "/Setting", tab: "account" },
      { text: "Theme Setting", link: "/Setting", tab: "theme-setting" },
    ],
  },
  {
    icon: <FaLifeRing />,
    text: "Help and Support",
    link: "/HelpSupport",
    submenuComponent: null,
  },
];

const notifications = [
  { id: 1, message: "New message received" },
  { id: 2, message: "Your report is ready" },
  { id: 3, message: "Meeting in 30 minutes" },
  { id: 4, message: "New Sales Updated" },
];

function Sidebar({ unreadCount }) {
  const [openSection, setOpenSection] = useState(null);
  const [userInitials, setUserInitials] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeTabColor, setActiveTabColor] = useState("");
  const [tabColor, setTabColor] = useState("");
  const [localUnreadCount, setLocalUnreadCount] = useState(unreadCount);

  const { isDarkMode, theme, primaryColor, secondaryColor, defaultColor } =
    useTheme();
  const { activeTab, setActiveTab } = useActiveTab();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    toast.info("Logged out successfully");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchProfile();

        const { first_name, last_name } = data;
        const initials = `${first_name.charAt(0).toUpperCase()}${last_name
          .charAt(0)
          .toUpperCase()}`;
        setUserInitials(initials);
      } catch (error) {
        console.error(
          "API Error:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (theme === "custom") {
      setActiveTabColor(`${secondaryColor}4D`);
      setTabColor(`${primaryColor}26`);
    } else {
      setActiveTabColor(`${defaultColor}4D`);
      setTabColor(`${defaultColor}1A`);
    }
  }, [defaultColor, primaryColor, secondaryColor, theme]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/notifications/user_notifications`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const unreadNotifications = data.filter(
              (notification) => !notification.read
            );
            setLocalUnreadCount(unreadNotifications.length);
          } else {
            console.error("Unexpected response format:", data);
          }
        } else {
          console.error(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    setLocalUnreadCount(unreadCount);
  }, [unreadCount]);

  const toggleSection = (index, link, hasSubmenu) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setOpenSection(index);
      return;
    } else {
      setOpenSection(openSection === index ? null : index);
    }

    if (!hasSubmenu) {
      setActiveTab(link);
    }

    setIsProfileDropdownOpen(false);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setOpenSection(null);
  };

  const handleProfileClick = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setTimeout(() => setIsProfileDropdownOpen(true), 300);
    } else {
      setIsProfileDropdownOpen(!isProfileDropdownOpen);
    }

    setOpenSection(null);
  };

  return (
    <aside
      className={`z-30 fixed top-[66px] left-0 ${
        isCollapsed ? "w-16" : "w-[175px] md:w-[210px] lg:w-[280px]"
      } ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-zinc-100"
      } overflow-y-auto h-[calc(100vh-66px)] transition-all duration-300 flex flex-col justify-between`}
    >
      <nav className="flex flex-col w-full px-2 md:px-3 space-y-2 py-6">
        {sidebarItems.map((item, index) => (
          <article
            key={index}
            className={`flex flex-col ${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <div
              className={`flex items-center cursor-pointer w-full p-3 hover:opacity-70`}
              style={{
                backgroundColor:
                  activeTab === item.link ? activeTabColor : tabColor,
              }}
              onClick={() =>
                toggleSection(index, item.link, item.submenuComponent)
              }
            >
              <div className="text-xl mr-3">
                <Icon>{item.icon}</Icon>
              </div>
              {!isCollapsed && (
                <>
                  {!item.submenuComponent ? (
                    <Link
                      key={index}
                      href={item.link}
                      className="flex-grow text-sm md:text-base font-medium"
                    >
                      <h2>{item.text}</h2>
                    </Link>
                  ) : (
                    <>
                      <h2 className="flex-grow text-sm md:text-base font-medium">
                        {item.text}
                      </h2>
                      <FaChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openSection === index ? "transform rotate-90" : ""
                        }`}
                      />
                    </>
                  )}
                </>
              )}
            </div>

            {!isCollapsed && item.submenuComponent && (
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSection === index ? "max-h-96" : "max-h-0"
                }`}
              >
                {Array.isArray(item.submenuComponent) &&
                  item.submenuComponent.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.link}
                      onClick={() => {
                        setActiveTab(subItem.tab);
                        setIsProfileDropdownOpen(false);
                      }}
                      className={`flex items-center pl-10 py-2 hover:opacity-70`}
                      style={{
                        backgroundColor:
                          activeTab === subItem.tab ? activeTabColor : tabColor,
                      }}
                    >
                      <span>{subItem.text}</span>
                    </Link>
                  ))}
              </div>
            )}
          </article>
        ))}
      </nav>

      <div
        className={`flex mb-20 ${
          isCollapsed
            ? "items-center gap-4 mt-auto w-16 flex-col"
            : "justify-center items-center gap-6 mt-auto "
        }`}
      >
        <a
          href="/notification"
          className={`relative flex items-center justify-center 
      text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-white
      bg-gray-300 dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl 
      transition-transform transform hover:scale-110
      ${isCollapsed ? "h-9 w-9" : "h-12 w-12"}`}
        >
          <FaBell className={` ${isCollapsed ? "text-base" : "text-xl"}`} />
          <span
            className={`absolute bg-red-500 text-white rounded-full flex items-center justify-center 
        shadow-sm font-bold transition-transform 
        ${
          isCollapsed
            ? "w-5 h-5 text-[10px] -top-2 -right-2"
            : "w-6 h-6 text-[12px] -top-1.5 -right-1.5"
        }`}
            style={{
              whiteSpace: "nowrap",
              padding: "0 4px",
              lineHeight: "1",
            }}
          >
            {localUnreadCount > 99 ? "99+" : localUnreadCount}
          </span>
        </a>

        <div className="relative">
          <span
            className={`flex items-center justify-center cursor-pointer 
        rounded-full shadow-lg transition-transform transform hover:scale-110 
        dark:bg-gray-700 bg-gray-300 dark:text-white text-gray-800 
        ${isCollapsed ? "h-9 w-9" : "h-12 w-12"}`}
            onClick={handleProfileClick}
          >
            {userInitials}
          </span>

          {!isCollapsed && isProfileDropdownOpen && (
            <div className="absolute transition-transform transform hover:scale-110 translate-x-8 -top-[350%] right-0 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-md t">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Profile
              </Link>
              <Link
                href="/Setting"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={toggleCollapse}
        className={`fixed bottom-4 ${
          isCollapsed
            ? "left-4"
            : "left-[140px] md:left-[170px] lg:left-[240px]"
        } text-white p-2 rounded-full transition-all duration-300`}
        style={{
          backgroundColor: theme === "custom" ? primaryColor : defaultColor,
        }}
      >
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
    </aside>
  );
}

export default memo(Sidebar);
