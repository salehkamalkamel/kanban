import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import { useEffect, useState } from "react";
import { useSideBarStateContext } from "../../contexts/SideBarState";
import Model from "../../ui/Model";
import BoardCtrlMenu from "../board/BoardCtrlMenu";
import BoardCtrlBtn from "../board/BoardCtrlBtn";
import { useActiveBoardContext } from "../../contexts/ActiveBoard";
import { useGetUserData } from "../../hooks/useGetUserData";
import { IoIosArrowDown } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [boardTitle, setBoardTitle] = useState(""); // State for board title

  const { handleShow } = useSideBarStateContext();
  const { activeBoard } = useActiveBoardContext();
  const { userData, gettingUserData } = useGetUserData();

  // Update board title when activeBoard or userData changes
  useEffect(() => {
    if (!gettingUserData && userData?.boards) {
      const fetchedBoard = userData.boards.find(
        (board) => board.id === activeBoard?.id
      );
      const title = fetchedBoard ? fetchedBoard.title : activeBoard?.title;
      setBoardTitle(title);
    }

    if (!activeBoard && userData?.boards?.length > 0 && !gettingUserData) {
      setBoardTitle("Select Board");
    }

    if (userData?.boards?.length === 0 && !gettingUserData) {
      setBoardTitle("No Boards Added");
    }
  }, [activeBoard, userData, gettingUserData]); // Listen for changes

  // Handle dark mode detection
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white border-b border-gray2 dark:border-gray1 dark:bg-black3 h-16 sm:h-20 md:h-24 flex items-center justify-between">
      {/* Right Part */}
      <div className="flex items-center justify-center h-full">
        {/* Logo Part */}
        <div className="hidden sm:flex items-center justify-center sm:px-6 border-r border-gray2 dark:border-gray1 h-full">
          <img src={isDark ? "logoDark.svg" : "logoLight.svg"} alt="Logo" />
        </div>
        <div className="sm:hidden block px-4">
          <img src="logo.svg" alt="Mobile Logo" />
        </div>

        {/* Title Part */}
        <Heading className="hidden sm:flex items-center justify-center text-black1 sm:px-6 dark:text-white">
          {boardTitle}
        </Heading>

        <button
          onClick={handleShow}
          className="flex items-center gap-2 bg-transparent border-none outline-none cursor-pointer h-full text-black1 sm:hidden dark:text-white"
        >
          <Heading shape="l" level={2}>
            {boardTitle}
          </Heading>
          <IoIosArrowDown className="text-primary text-lg" />
        </button>
      </div>

      {/* Left Part */}
      <div className="flex items-center gap-4 px-6">
        {activeBoard && (
          <Button
            shape="primaryS"
            className="flex items-center gap-2 w-fit px-6 py-[0.75rem] sm:py-[1rem]"
          >
            <IoAddOutline className="text-white text-lg" />
            <p className="hidden sm:block">Add Column</p>
          </Button>
        )}

        {activeBoard && (
          <Model>
            <Model.Toggle>
              <BoardCtrlBtn />
            </Model.Toggle>
            <Model.Window>
              <BoardCtrlMenu />
            </Model.Window>
          </Model>
        )}
      </div>
    </div>
  );
}
