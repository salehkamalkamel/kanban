import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Model from "../../ui/Model";
import BoardCtrlMenu from "../board/BoardCtrlMenu";
import BoardCtrlBtn from "../board/BoardCtrlBtn";
import { useSideBarStateContext } from "../../contexts/SideBarState";
import { useActiveBoardContext } from "../../contexts/ActiveBoard";
import { IoIosArrowDown } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";

export default function Header({ data, isLoading }) {
  const [isDark, setIsDark] = useState(false);
  const [boardTitle, setBoardTitle] = useState("Loading...");

  const { handleShow } = useSideBarStateContext();
  const { activeBoard } = useActiveBoardContext();

  useEffect(() => {
    if (isLoading) {
      setBoardTitle("Loading...");
    } else if (!data?.boards?.length) {
      setBoardTitle("No Boards Available");
    } else if (activeBoard) {
      const board = data.boards.find((board) => board.id === activeBoard.id);
      setBoardTitle(board ? board.title : "Board Not Found");
    } else {
      setBoardTitle("Select Board");
    }
  }, [data, activeBoard, isLoading]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const darkModeActive =
        document.documentElement.classList.contains("dark");
      setIsDark((prev) => (prev !== darkModeActive ? darkModeActive : prev));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white border-b border-gray2 dark:border-gray1 dark:bg-black3 h-16 sm:h-20 md:h-24 flex items-center justify-between">
      <div className="flex items-center justify-center h-full">
        <div className="hidden sm:flex items-center justify-center sm:px-6 border-r border-gray2 dark:border-gray1 h-full">
          <img src={isDark ? "logoDark.svg" : "logoLight.svg"} alt="Logo" />
        </div>
        <div className="sm:hidden block px-4">
          <img src="logo.svg" alt="Mobile Logo" />
        </div>

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

      <div className="flex items-center gap-4 px-6">
        {activeBoard?.id && (
          <Button
            shape="primaryS"
            className="flex items-center gap-2 w-fit px-6 py-[0.75rem] sm:py-[1rem]"
          >
            <IoAddOutline className="text-white text-lg" />
            <p className="hidden sm:block">Add Column</p>
          </Button>
        )}

        {activeBoard?.id && (
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
