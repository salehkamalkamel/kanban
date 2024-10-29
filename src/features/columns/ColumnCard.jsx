import { MdOutlineCheck } from "react-icons/md";
import Heading from "../../ui/Heading";

export default function ColumnCard({ task, onOpen }) {
  return (
    <div
      onClick={onOpen}
      className={`flex hover:scale-[0.98] transition-transform duration-200  cursor-pointer  items-start justify-center flex-col gap-2 p-4 dark:bg-black3 bg-white drop-shadow-lg rounded-lg w-full ${task.status === "done" ? "opacity-75" : ""}`}
    >
      <div className="flex items-start justify-between w-full">
        <Heading
          shape="m"
          level={3}
          className="w-full text-black1 dark:text-white"
        >
          {task?.title}
        </Heading>
        {task?.status === "done" && (
          <span className="w-6 h-6 p-1 flex items-center justify-center text-white rounded-full bg-primary">
            <MdOutlineCheck />
          </span>
        )}
      </div>
      <p className="font-bold text-sm text-gray1">{`${task?.subTasks?.filter((task) => task.completed).length} of ${task?.subTasks?.length} substasks`}</p>
    </div>
  );
}
