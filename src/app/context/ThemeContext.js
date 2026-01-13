'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState('default')
  const [primaryColor, setPrimaryColor] = useState("#9149ff");
  const [secondaryColor, setSecondaryColor] = useState("#9149ff");
  const [defaultColor, setDefaultColor] = useState("#446CCF");

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || "default"
    const storedPrimaryColor = localStorage.getItem("primaryColor") || "#ff0000"
    const storedSecondaryColor = localStorage.getItem("secondaryColor") || "#ff0000"
    setTheme(storedTheme)
    setPrimaryColor(storedPrimaryColor)
    setSecondaryColor(storedSecondaryColor)

    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModeEnabled);
    if (darkModeEnabled) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    }
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const updatePrimaryColor = (primary) => {
    setPrimaryColor(primary)
    localStorage.setItem("primaryColor", primary)
  }

  const updateSecondaryColor = (secondary) => {
    setSecondaryColor(secondary)
    localStorage.setItem("secondaryColor", secondary)
  }

  const updateDefaultColor = (color) => {
    setDefaultColor(color)
    localStorage.setItem("defaultColor", color)
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        theme,
        primaryColor,
        secondaryColor,
        defaultColor,
        updatePrimaryColor,
        updateSecondaryColor,
        updateDefaultColor,
        updateTheme
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
