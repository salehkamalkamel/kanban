import SideBarItem from "./SideBarItem";
import Model from "../../ui/Model";
import AddBoardWindow from "../board/AddBoardWindow";
import AddBoardBtn from "../board/AddBoardBtn";
import { useActiveBoardContext } from "../../contexts/ActiveBoard";
import { useSideBarStateContext } from "../../contexts/SideBarState";

export default function SideBarMenu({ boards }) {
  const { handleActiveBoardId } = useActiveBoardContext();
  const { handleHide } = useSideBarStateContext();

  // Utility function to check if the device is mobile
  const isMobileDevice = () => {
    return window.innerWidth <= 768; // You can adjust this breakpoint as needed
  };

  return (
    <div className="flex w-full ml-[-2rem] flex-col items-center justify-center px-4 gap-2">
      <>
        <p className="text-gray1 font-bold text-sm uppercase text-start w-full py-4 pl-6">
          {`all boards (${boards.length})`}
        </p>
        <div className="w-full">
          {boards.length > 0 ? (
            boards.map((board, idx) => (
              <div
                key={idx}
                className="w-full"
                onClick={() => {
                  // Hide the sidebar only if it's a mobile device
                  if (isMobileDevice()) {
                    handleHide();
                  }
                  handleActiveBoardId(board.id);
                }}
              >
                <SideBarItem board={board} boardId={board?.id}>
                  {board.title}
                </SideBarItem>
              </div>
            ))
          ) : (
            <p className="text-gray1 uppercase font-bold text-sm text-start w-full py-4 pl-6">
              No Boards Added
            </p>
          )}
        </div>
      </>

      <Model>
        <Model.Toggle>
          <AddBoardBtn />
        </Model.Toggle>
        <Model.Window>
          <AddBoardWindow />
        </Model.Window>
      </Model>
    </div>
  );
}
