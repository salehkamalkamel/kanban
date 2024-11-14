import { useEffect, useState } from "react";
import { useActiveBoardContext } from "../../contexts/ActiveBoard";
import { useDataContext } from "../../contexts/DataProvider";
import { useSideBarStateContext } from "../../contexts/SideBarState";
import BodyText from "../../ui/Bodytext";
import Button from "../../ui/Button";
import LoadingSpinner from "../../ui/LoadingSpinner";
import Model from "../../ui/Model";
import AddBoardWindow from "../board/AddBoardWindow";
import AddColumn from "./AddColumn";
import AddColumnWindow from "./AddColumnWindow";
import Column from "./Column";

export default function ColumnsView() {
  const { isLoading, getColumnsForBoard, boards } = useDataContext();
  const [columnsViewState, setColumnsViewState] = useState("loading");
  const { activeBoardId } = useActiveBoardContext();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(getColumnsForBoard(activeBoardId));
  }, [activeBoardId, isLoading, getColumnsForBoard, boards]);

  useEffect(() => {
    if (isLoading) {
      setColumnsViewState("loading");
    } else if (!boards.length) {
      setColumnsViewState("no boards available");
    } else if (!activeBoardId && boards.length) {
      setColumnsViewState("no boards selected");
    } else if (activeBoardId && !columns.length) {
      setColumnsViewState("no columns");
    } else {
      setColumnsViewState("done");
    }
  }, [isLoading, boards, activeBoardId, columns]);

  const renderContent = () => {
    switch (columnsViewState) {
      case "loading":
        return (
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner />
          </div>
        );
      case "no boards available":
        return <NoBoardsAvilable />;
      case "no boards selected":
        return <NoBoardSelected />;
      case "no columns":
        return <EmptyState />;
      case "done":
        return (
          <div className="grid grid-flow-col auto-cols-[minmax(17rem,1fr)] gap-6 h-full w-full">
            {columns.map((column, idx) => (
              <Column key={idx} column={column} />
            ))}
            <AddColumnModel />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full overflow-hidden bg-gray2 dark:bg-black2">
      <div className="h-full overflow-x-auto p-4">{renderContent()}</div>
    </div>
  );
}

// Separate component for the Add Column Model
function AddColumnModel() {
  return (
    <Model>
      <Model.Toggle>
        <AddColumn />
      </Model.Toggle>
      <Model.Window>
        <AddColumnWindow />
      </Model.Window>
    </Model>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
      <BodyText shape="bodyL" className="text-gray1">
        No Columns Added to this Board.
      </BodyText>
      <BodyText shape="bodyM" className="text-gray1">
        Try adding a new column to organize tasks.
      </BodyText>
      <Model>
        <Model.Toggle>
          <Button shape="primaryS" className="px-6">
            Add Column
          </Button>
        </Model.Toggle>
        <Model.Window>
          <AddColumnWindow />
        </Model.Window>
      </Model>
    </div>
  );
}

// No Board Selected Component
function NoBoardsAvilable() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
      <BodyText className="text-gray1" shape="bodyL">
        No Boards Added.
      </BodyText>
      <Model>
        <Model.Toggle>
          <Button className="px-8">Create Board</Button>
        </Model.Toggle>
        <Model.Window>
          <AddBoardWindow />
        </Model.Window>
      </Model>
    </div>
  );
}

function NoBoardSelected() {
  const { handleShow } = useSideBarStateContext();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
      <BodyText className="text-gray1" shape="bodyL">
        No Boards Selected.
      </BodyText>
      <Button shape="primaryS" className=" px-8" onClick={handleShow}>
        Select Board
      </Button>
    </div>
  );
}
