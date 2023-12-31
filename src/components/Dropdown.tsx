import { DropdownOption } from "@/models/dropdownModel";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const Dropdown = ({
  label,
  required = false,
  value,
  data,
  onSelect,
}: DropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onOptionSelect = (option: DropdownOption) => {
    onSelect(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col relative w-full">
      {label && (
        <h3 className="mb-1 font-medium text-sm capitalize">
          {label}
          {required && <span className="text-red-500  ml-1">*</span>}
        </h3>
      )}

      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full text-black  border-gray-200 border-[1px] focus:ring-0 focus:outline-none font-medium rounded-md text-sm px-2 py-2 text-center inline-flex items-center justify-between hover:border-gray-200"
        type="button"
      >
        {value ? value.title : "Select"}{" "}
        <FaAngleDown
          size={20}
          className={`transition-all ${isDropdownOpen && "rotate-180"}`}
        />
      </button>
      <div
        id="dropdownUsers"
        className={`w-full absolute top-16 z-10 mt-1 bg-white rounded-lg overflow-hidden shadow  transition-all ${
          !isDropdownOpen && "hidden"
        } `}
      >
        <ul className="h-48 py-2 px-1  overflow-y-auto text-gray-700 dark:text-gray-200">
          {data.map((option, index) => {
            //console.log(option.title);
            return (
              <li
                key={index}
                className="text-black hover:bg-gray-200 px-2 cursor-pointer"
                onClick={() => {
                  onOptionSelect(option);
                }}
              >
                {option.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

interface DropdownProps {
  label?: string;
  required?: boolean;
  data: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  value: DropdownOption | null;
}

export default Dropdown;
