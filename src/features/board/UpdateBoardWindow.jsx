import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useUpdateBoard } from "../../hooks/useUpdateBoard"; // Custom hook to update board
import { useActiveBoardContext } from "../../contexts/ActiveBoard";
import PopupWindow from "../../ui/PopupWindow";
import InputDataView from "../../ui/InputDataView";

function UpdateBoardWindow({ onClose }) {
  const { activeBoard: board } = useActiveBoardContext();
  const [title, setTitle] = useState(board.title); // Populate with existing title
  const [columns, setColumns] = useState(board.columns || []); // Populate with existing columns
  const { updateBoard, isUpdatingBoard } = useUpdateBoard(); // Use update hook
  const queryClient = useQueryClient();

  const handleAddColumn = () => setColumns([...columns, { name: "" }]);

  const handleColumnChange = (index, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index].name = value;
    setColumns(updatedColumns);
  };

  const handleDeleteColumn = (index) => {
    setColumns((columns) => columns.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBoard = {
      ...board,
      title,
      columns,
    };

    updateBoard(
      { updatedBoard },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("userData"); // Refresh data
          onClose(); // Close the window
        },
      }
    );
  };

  return (
    <PopupWindow onClose={onClose}>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4 ">
        <Heading
          shape="l"
          level={2}
          className="w-full text-center text-black dark:text-white"
        >
          Update Board
        </Heading>

        {/* Board Title Input */}
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          <p className="text-gray1 dark:text-white text-sm font-bold">
            e.g. Web Design
          </p>
          <input
            className="rounded-md border border-gray2 px-4 py-2 text-[0.8125rem] font-medium w-full bg-transparent dark:text-white outline-none h-[2.5rem]"
            type="text"
            placeholder="Board Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Columns Section */}
        <div className="flex flex-col items-start justify-center gap-4 w-full">
          <p className="text-gray1 dark:text-white text-sm font-bold">
            Board Columns
          </p>
          <InputDataView
            data={columns}
            dataType="Column"
            handleItemChange={handleColumnChange}
            handleDeleteItem={handleDeleteColumn}
          />

          <Button
            className="w-full"
            shape="secondary"
            onClick={handleAddColumn}
          >
            Add Column
          </Button>
        </div>

        {/* Action Buttons */}
        <Button
          shape="primaryS"
          className="w-full"
          type="submit"
          disabled={isUpdatingBoard}
        >
          {isUpdatingBoard ? <LoadingSpinner /> : "Update Board"}
        </Button>
      </form>
    </PopupWindow>
  );
}

export default UpdateBoardWindow;
