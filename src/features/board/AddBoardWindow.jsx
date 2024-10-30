import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAddBoard } from "../../hooks/useAddBoard";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useQueryClient } from "@tanstack/react-query";
import PopupWindow from "../../ui/PopupWindow";
import InputDataView from "../../ui/InputDataView";

function AddBoardWindow({ onClose }) {
  const queryClient = useQueryClient();

  // Result Data from USER
  const [title, setTitle] = useState("");
  const [columns, setColumns] = useState([
    { title: "", id: uuidv4(), tasks: [], columnColor: "#635FC7" },
  ]); // Initial empty column

  const { addBoard, isAddingBoard } = useAddBoard();

  const handleAddColumn = () =>
    setColumns([
      ...columns,
      { title: "", id: uuidv4(), tasks: [], columnColor: "#635FC7" },
    ]);

  const handleColumnChange = (index, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index].title = value;
    setColumns(updatedColumns);
  };

  const handleDeleteColumn = (index) => {
    setColumns((columns) => columns.filter((_, idx) => idx !== index));
  };

  const handleColumnColorChange = (index, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index].columnColor = value;
    setColumns(updatedColumns);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBoard = {
      title,
      id: uuidv4(),
      columns,
    };

    addBoard(
      { newBoard },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("userData", "columns");
          onClose();
        },
      }
    );
  };

  return (
    <PopupWindow onClose={onClose}>
      <form
        disabled={isAddingBoard}
        onSubmit={handleSubmit}
        className=" flex flex-col gap-4 "
      >
        <Heading
          shape="l"
          level={2}
          className="w-full text-center text-black dark:text-white"
        >
          Add New Board
        </Heading>
        <div
          className={`flex flex-col items-start justify-center gap-2 w-full`}
        >
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

        <div className="flex flex-col items-start justify-center gap-4 w-full">
          <p className="text-gray1 dark:text-white text-sm font-bold">
            Board Columns
          </p>
          <InputDataView
            data={columns}
            dataType="Column"
            handleItemChange={handleColumnChange}
            handleDeleteItem={handleDeleteColumn}
            handleColomnColor={handleColumnColorChange}
          />

          <Button
            className="w-full"
            shape="secondary"
            onClick={handleAddColumn}
          >
            Add Column
          </Button>
        </div>

        <Button
          shape="primaryS"
          className="w-full"
          type="submit"
          disabled={isAddingBoard}
        >
          {isAddingBoard ? <LoadingSpinner /> : "Add Board"}
        </Button>
      </form>
    </PopupWindow>
  );
}

export default AddBoardWindow;
