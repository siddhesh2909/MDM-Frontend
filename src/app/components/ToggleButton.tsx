import React from "react";
const ToggleButton: React.FC = () => {
  return (
    <div className="flex  bg-sky-700 h-[39px] w-[80px] rounded-[100px]">
      <div className="flex flex-col flex-1 shrink items-start px-4 w-full basis-0">
        <div className="flex z-10 justify-center items-center p-1 mt-0 max-md:-mr-3">
          <button
            className="flex flex-col justify-center items-center  p-2 my-auto rounded-[100px]"
            aria-label="Toggle"
          >
            <div className="flex py-3 w-6 h-6 bg-white rounded-3xl min-h-[24px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleButton;
