import { useState } from "react";
import BoardColumnItem from "./BoardColumnItem";
import { RxCross1 } from "react-icons/rx";
import Button from "../../ui/Button";

export default function BoardColumns() {
  const [columns, setColumns] = useState([
    { title: "Testing Some Things", id: 1 },
    { title: "Testing Some Thing Else", id: 2 },
  ]);

  function handleAddColumn() {
    setColumns((columns) => [
      ...columns,
      {
        title: "",
        id: columns.length > 0 ? columns[columns.length - 1].id + 1 : 1,
      },
    ]);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <p className="text-gray1 w-full text-start dark:text-white text-sm font-bold">
        Board Columns
      </p>
      <div className="flex flex-col w-full gap-2">
        {columns.map((column) => (
          <div
            className="flex gap-2 items-center justify-center"
            key={column.id}
          >
            <BoardColumnItem value={column.title} />
            <button
              className="text-gray1 dark:text-white bg-transparent border-none outline-none"
              onClick={() =>
                setColumns((columns) =>
                  columns.filter((col) => col.id !== column.id)
                )
              }
            >
              <RxCross1 size="1rem" />
            </button>
          </div>
        ))}
      </div>
      <Button shape="secondary" className="w-full" onClick={handleAddColumn}>
        + Add New Column
      </Button>
    </div>
  );
}
