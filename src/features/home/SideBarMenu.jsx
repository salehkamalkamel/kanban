import SideBarItem from "./SideBarItem";
import Model from "../../ui/Model";
import AddBoardWindow from "../board/AddBoardWindow";
import AddBoardBtn from "../board/AddBoardBtn";
import { useActiveBoardContext } from "../../contexts/ActiveBoard";

export default function SideBarMenu({ data }) {
  const boards = data?.boards || [];
  const { handleActiveBoard } = useActiveBoardContext();
  return (
    <div className="flex w-full ml-[-2rem] flex-col items-center justify-center px-4 gap-2">
      <>
        <p className="text-gray1 font-bold text-sm uppercase text-start w-full py-4 pl-6">
          {`all boards (${boards.length})`}
        </p>
        <div className=" w-full">
          {boards.length > 0 ? (
            boards.map((item, idx) => (
              <div
                key={idx}
                className="w-full"
                onClick={() => handleActiveBoard(item)}
              >
                <SideBarItem boardId={item?.id}>{item.title}</SideBarItem>
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
