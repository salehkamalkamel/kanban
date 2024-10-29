import { useState } from "react";
import { MdOutlineCheck } from "react-icons/md";
import BodyText from "../../ui/Bodytext";

export default function SubTaskItem({ subTask, handleSubTaskChange }) {
  const [completed, setCompleted] = useState(subTask.completed);

  function handleClick() {
    setCompleted((prev) => {
      const newCompleted = !prev;
      const updatedSubTask = { ...subTask, completed: newCompleted };
      handleSubTaskChange(updatedSubTask);
      return newCompleted;
    });
  }

  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer w-full rounded-md dark:bg-black2 ${
        completed ? "bg-gray3" : "bg-transparent"
      } hover:bg-gray2 items-center justify-center gap-2 p-4`}
    >
      <span
        className={`w-4 h-4 flex items-center  justify-center rounded-sm text-white ${
          completed
            ? "bg-primary border-none"
            : "dark:bg-black3 bg-white border border-gray2 dark:border-black4"
        }`}
      >
        <MdOutlineCheck className={`${completed ? "visible" : "hidden"} `} />
      </span>

      <BodyText
        shape="bodyM"
        className={`w-full ${completed ? "text-gray1 line-through" : "text-black1 dark:text-white"}`}
      >
        {subTask.title}
      </BodyText>
    </div>
  );
}
