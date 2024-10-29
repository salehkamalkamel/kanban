import { useState } from "react";

function SelectMenu({ title }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Doing");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const options = ["Todo", "Doing", "Done"];

  return (
    <div className=" flex flex-col items-start justify-center gap-2">
      <p className="text-gray1 dark:text-white text-sm font-bold">{title}</p>

      <div className="relative  inline-block text-left">
        {/* Dropdown Button */}
        <div className="">
          <button
            type="button"
            className="text-[0.8125rem] w-52 text-black dark:text-white inline-flex  justify-between  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-transparent font-medium focus:outline-none focus:border-primary"
            onClick={toggleDropdown}
          >
            {selectedOption}
            <svg
              className={` ml-2 h-5 w-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414-1.414l5-5A1 1 0 0110 3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 mt-2 w-52 rounded-md shadow-lg bg-white dark:bg-black2 ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {options.map((option, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={() => handleOptionClick(option)}
                  className={`block px-4 py-2 text-sm text-gray1 hover:opacity-75  ${
                    selectedOption === option ? "text-primary" : ""
                  }`}
                >
                  {option}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectMenu;
