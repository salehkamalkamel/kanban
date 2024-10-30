import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import ColorPicker from "../../ui/ColorPicker";
import { useAddColumn } from "../../hooks/useAddColumn";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useActiveBoardContext } from "../../contexts/ActiveBoard";
import PopupWindow from "../../ui/PopupWindow";

export default function AddColumnWindow({ onClose }) {
  const [selectedColor, setSelectedColor] = useState("#A8A4FF");
  const [title, setTitle] = useState("");
  const { activeBoard } = useActiveBoardContext();
  const { addColumn, isAddingColumn } = useAddColumn();

  function handleSubmit(e) {
    e.preventDefault();
    addColumn(
      {
        newColumn: {
          id: uuidv4(),
          columnColor: selectedColor,
          title,
          tasks: [],
        },
        boardId: activeBoard?.id,
      },
      {
        onSuccess: () => onClose(),
      }
    );
  }

  return (
    <PopupWindow onClose={onClose}>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4 ">
        <Heading
          shape="l"
          level={2}
          className="text-start text-black dark:text-white"
        >
          Add New Column
        </Heading>
        <div className="w-full">
          <label className="block text-sm font-bold text-gray1 dark:text-white mb-2">
            Column Name
            <input
              className="w-full h-10 px-4 mt-2 rounded-md border border-gray2 bg-transparent placeholder:font-bold placeholder:text-[0.75rem] placeholder:leading-4 text-black1 font-medium text-[0.8125rem] leading-6 dark:text-white outline-none"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Take coffee break"
              required
            />
          </label>
        </div>
        <div className="w-full">
          <label className="block text-sm font-bold text-gray1 dark:text-white mb-2">
            Select Color
            <ColorPicker
              onColorChange={setSelectedColor}
              value={selectedColor}
            />
          </label>
        </div>
        <Button className="w-full" shape="primaryS" type="submit">
          {isAddingColumn ? <LoadingSpinner /> : "Add New Column"}
        </Button>
      </form>
    </PopupWindow>
  );
}
