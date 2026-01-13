import React from 'react';
import Image from 'next/image';
interface SidebarSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, icon, children }) => {
  return (
    <section className="w-full">
      <div className="flex gap-5 w-[86px]">
        <div className="flex flex-col flex-1 justify-center items-center h-[27px]">
          <div className="flex justify-center items-center px-2 py-3 rounded-[100px]">
            <Image loading="lazy" src={icon} alt="" className="object-contain self-stretch my-auto w-6 aspect-square" />
          </div>
        </div>
        <h2 className="my-auto text-xl font-medium text-black">{title}</h2>
      </div>
      {children}
    </section>
  );
};

export default SidebarSection;