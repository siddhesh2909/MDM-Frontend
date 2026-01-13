import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import {
  FcSearch,
  FcAlphabeticalSortingAz ,
  FcAlphabeticalSortingZa ,
} from "react-icons/fc";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  primaryAction?: () => void;
  primaryLabel?: string;
  primaryColor?: string;
  secondaryAction?: () => void;
  secondaryLabel?: string;
  secondaryColor?: string;
  onSearch?: (searchTerm: string) => void;
  onSort?: (direction: "asc" | "desc") => void;
  showSearch?: boolean;
  showSort?: boolean; 
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  primaryAction,
  primaryLabel = "Save",
  primaryColor = "bg-blue-600 hover:bg-blue-700",
  secondaryAction,
  secondaryLabel = "Cancel",
  secondaryColor = "bg-gray-300 hover:bg-gray-400",
  onSearch,
  onSort,
  showSearch = false,
  showSort = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value); 
    }
  };

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
    if (isExpanded) {
      setSearchTerm("");
      if (onSearch) {
        onSearch("");
      }
    }
  };

  const toggleSort = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    if (onSort) {
      onSort(newDirection); 
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-4xl mx-4 md:mx-6 lg:mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {title}
          </h2>
          <div className="flex items-center space-x-4">
          
            {showSearch && (
              <div className="flex items-center">
                <div
                  className={`flex items-center border rounded ${
                    isExpanded
                      ? "w-64 transition-all duration-300"
                      : "w-12 transition-all duration-300"
                  }`}
                >
                  <button
                    onClick={toggleExpansion}
                    className="bg-transparent border-none px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FcSearch size={20} />
                  </button>

                  {isExpanded && (
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleInputChange}
                      placeholder="Search..."
                      className="px-3 py-2 w-full outline-none dark:bg-gray-700 dark:text-gray-200"
                    />
                  )}
                </div>
              </div>
            )}

            {showSort && (
              <button
                onClick={toggleSort}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {sortDirection === "asc" ? (
                  <FcAlphabeticalSortingAz  size={20} />
                ) : (
                  <FcAlphabeticalSortingZa   size={20} />
                )}
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>
        <div className="mt-4 overflow-y-auto max-h-[75vh]">{children}</div>
        <div className="flex justify-end mt-6 gap-4">
          {primaryAction && (
            <button
              onClick={primaryAction}
              className={`px-4 py-2 text-white rounded ${primaryColor}`}
            >
              {primaryLabel}
            </button>
          )}
          {secondaryAction && (
            <button
              onClick={secondaryAction}
              className={`px-4 py-2 text-gray-800 dark:text-gray-300 rounded ${secondaryColor}`}
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;