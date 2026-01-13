"use client"
import { createContext, useContext, useState } from "react"

const SidebarContext = createContext()

export const useSidebar = () => useContext(SidebarContext)

export const SidebarProvider = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            {children}
        </SidebarContext.Provider>
    )
}