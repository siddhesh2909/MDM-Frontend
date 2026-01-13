"use client";
import { useState } from 'react';
import UserProfile from './SettingComponent/UserProfile';
import InsightSidePanel from './SettingComponent/InsightSidePanel';
import DataQualitySidePanel from './SettingComponent/DataQualitySidePanel'; 
import Image from 'next/image';
const sidebarItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2424fe971ace93b7706a88ad45aea370830febf499e90bb47bd454da2fcdb819?placeholderIfAbsent=true&apiKey=c65deb9a8c8e4dacb9ff8d9c2ccdd566",
    text: "Insights",
    submenuComponent: <InsightSidePanel />, 
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/96a42864d8791c47899365693424bb9384b533af5299d88ea9f531eb7f85de73?placeholderIfAbsent=true&apiKey=c65deb9a8c8e4dacb9ff8d9c2ccdd566",
    text: "Data Quality",
    submenuComponent: <DataQualitySidePanel />, 
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3eed475b363499c78ff93572ed947f65234c63d07c5cfd8529475015fd2aced6?placeholderIfAbsent=true&apiKey=c65deb9a8c8e4dacb9ff8d9c2ccdd566",
    text: "Custom Reporting",
    
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4859cd799a259cebd7afaf3857693d8dd77d7c9a2645a053969c2a171e9092dc?placeholderIfAbsent=true&apiKey=c65deb9a8c8e4dacb9ff8d9c2ccdd566",
    text: "Settings",
    submenuComponent: <InsightSidePanel />, 
  }
];

function Sidebar() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <nav className="flex flex-col w-1/4 max-md:w-full bg-zinc-100 shadow-md">
      <div className="flex flex-col pt-4 pb-4 mx-auto w-full">
        {sidebarItems.map((item, index) => (
          <div key={index} className="mb-4">
            <div
              className="flex justify-between items-center p-4 cursor-pointer transition-colors bg-gray-200 hover:bg-gray-300 rounded-md"
              onClick={() => toggleSection(index)}
            >
              <div className="flex items-center">
                <Image src={item.icon} alt={`${item.text} icon`} className="w-8 h-8 mr-2" /> 
                <span className="text-gray-700 font-semibold">{item.text}</span>
              </div>
              <span className="text-gray-700 font-bold">
                {openSection === index ? '▲' : '▼'}
              </span>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden bg-gray-100 rounded-b-md ${openSection === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
            >
           
              {openSection === index && (
                <div className="pl-8 pr-4 py-4"> 
                  {item.submenuComponent}
                </div>
              )}
            </div>
          </div>
        ))}
        <UserProfile />
      </div>
    </nav>
  );
}

export default Sidebar;