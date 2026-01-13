import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useSidebar } from '../context/SidebarContext'

const ResponsiveContainer = ({ children}) => {
    const { isDarkMode } = useTheme()
    const {isCollapsed} = useSidebar()

    return (
        <div
            className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"
                } overflow-hidden`}
            style={{
                width: "calc(100% - 4rem)",
                marginLeft: "4rem",
                transition: "margin-left 0.3s, width 0.3s",
            }}
        >
            <div
                className={`flex-1 mt-16 p-3 md:p-5 lg:p-6 ${isDarkMode ? "bg-gray-900" : "bg-white"
                    } transition-all duration-300 ${isCollapsed
                        ? ""
                        : "md:max-w-[calc(100%-146px)] md:ml-[146px] lg:max-w-[calc(100%-216px)] lg:ml-[216px]"
                    } w-full'
                }`}
            >
                {children}
            </div>
        </div>
    )
}

export default ResponsiveContainer