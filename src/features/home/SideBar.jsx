import { useEffect, useState } from "react";
import Heading from "../../ui/Heading";
import SideBarMenu from "./SideBarMenu";
import ThemeToggle from "./ThemeToggle";
import { BiHide } from "react-icons/bi";
import { MdVisibility } from "react-icons/md";
import { useSideBarStateContext } from "../../contexts/SideBarState";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useDataContext } from "../../contexts/DataProvider";

export default function SideBar() {
  const rootElement = document.documentElement;
  const [isDark, setIsDark] = useState(rootElement.classList.contains("dark"));
  const { handleShow, handleHide, handleToggle, isVisible } =
    useSideBarStateContext();

  const { boards, isLoading } = useDataContext();

  useEffect(() => {
    // Observer to monitor changes in the root element's classList
    const observer = new MutationObserver(() => {
      setIsDark(rootElement.classList.contains("dark"));
    });

    // Start observing the root element for attribute changes
    observer.observe(rootElement, {
      attributes: true,
      attributeFilter: ["class"], // Only observe changes to the class attribute
    });

    // Clean up the observer on unmount
    return () => observer.disconnect();
  }, [rootElement]);

  return (
    <>
      {/* Sidebar Overlay for mobile view */}
      {isVisible && (
        <div
          className={`fixed inset-0 bg-black opacity-25 z-40 sm:hidden`}
          onClick={handleToggle}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`transform transition-transform duration-300 rounded-md sm:rounded-none w-[16.5rem] z-40 bg-white dark:bg-black3 sm:border-r border-gray2 top-20 left-[50%] translate-x-[-50%] dark:border-gray1 sm:translate-x-0 sm:inset-0 sm:h-full ${isVisible ? "fixed sm:relative" : "hidden sm:-translate-x-full"}`}
      >
        <div className="flex flex-col w-full h-full p-4 gap-4">
          <div className="w-full px-4 relative sm:hidden">
            <img src={isDark ? "logoDark.svg" : "logoLight.svg"} alt="Logo" />
          </div>

          {isLoading ? (
            <div className="flex w-full items-center justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <SideBarMenu boards={boards} />
          )}

          <div className="mt-auto flex flex-col items-center gap-4 w-full">
            <ThemeToggle />
            <button
              onClick={handleHide}
              className="text-gray1 w-full text-start flex items-center gap-4 cursor-pointer bg-transparent border-none outline-none"
            >
              <BiHide size="1rem" />
              <Heading level={3} shape="m">
                Hide Sidebar
              </Heading>
            </button>

            <a
              href="https://salehkamalportfolio.vercel.app/"
              className="text-sm text-primary "
              target="_blank"
            >
              About Me
            </a>
          </div>
        </div>
      </div>

      {/* Visibility Button (for desktop) */}
      <button
        onClick={handleShow}
        className="w-[56px] h-[48px] rounded-r-full bg-primary border-none outline-none hidden sm:flex items-center justify-center fixed bottom-8 left-0"
      >
        <MdVisibility color="white" size="2rem" />
      </button>
    </>
  );
}
