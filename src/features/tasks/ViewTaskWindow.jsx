import { useState, useEffect } from "react";
import Heading from "../../ui/Heading";
import SubTaskItem from "../subTasks/SubTaskItem";
import Model from "../../ui/Model";
import TaskCtrlBtn from "./TaskCtrlBtn";
import TaskCtrlMenu from "./TaskCtrlMenu";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import { useActiveBoardContext } from "../../contexts/ActiveBoard";
import Button from "../../ui/Button";
import LoadingSpinner from "../../ui/LoadingSpinner";
import BodyText from "../../ui/Bodytext";
import PopupWindow from "../../ui/PopupWindow";

export default function ViewTaskWindow({ onClose, task, columnId }) {
  const [taskData, setTaskData] = useState({
    status: task.status,
    subTasks: [...task.subTasks],
  });

  const { updateTask, isUpdatingTask } = useUpdateTask();
  const { activeBoardId } = useActiveBoardContext();

  // Sync state when the task prop changes
  useEffect(() => {
    setTaskData({ status: task.status, subTasks: [...task.subTasks] });
  }, [task]);

  // Update task status automatically when subtasks change
  useEffect(() => {
    const hasCompleted = taskData.subTasks.some((ele) => ele.completed);
    const allCompleted = taskData.subTasks.every((ele) => ele.completed);

    setTaskData((prev) => ({
      ...prev,
      status: allCompleted ? "done" : hasCompleted ? "doing" : "pending",
    }));
  }, [taskData.subTasks]);

  function handleStatusChange(e) {
    setTaskData((prev) => ({ ...prev, status: e.target.value }));
  }

  function handleSubTaskChange(newTask) {
    setTaskData((prev) => ({
      ...prev,
      subTasks: prev.subTasks.map((subTask) =>
        subTask.id === newTask.id ? { ...subTask, ...newTask } : subTask
      ),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateTask(
      {
        activeBoardId,
        columnId,
        taskId: task.id,
        updatedTask: { ...task, ...taskData },
      },
      {
        onSuccess: () => onClose(),
      }
    );
  }

  return (
    <PopupWindow onClose={onClose}>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Heading
            shape="l"
            level={2}
            className="text-start text-black dark:text-white max-w-[90%]"
          >
            {task?.title}
          </Heading>
          <Model>
            <Model.Toggle>
              <TaskCtrlBtn />
            </Model.Toggle>
            <Model.Window>
              <TaskCtrlMenu columnId={columnId} task={task} />
            </Model.Window>
          </Model>
        </div>

        <BodyText className="text-gray1 w-full" shape="bodyL">
          {task.description}
        </BodyText>

        <div className="flex flex-col w-full items-center justify-center gap-4">
          <BodyText className="text-gray1 dark:text-white w-full">
            {`Subtasks (${taskData.subTasks.filter((sub) => !sub.completed).length} of ${taskData.subTasks.length})`}
          </BodyText>

          <div className="w-full flex gap-2 flex-col items-center justify-center">
            {taskData.subTasks.map((subTask, idx) => (
              <SubTaskItem
                key={idx}
                handleSubTaskChange={handleSubTaskChange}
                subTask={subTask}
              />
            ))}
          </div>
        </div>

        <div className="w-full">
          <label className="block text-sm font-bold text-gray1 dark:text-white mb-2">
            Current Status
            <select
              disabled={isUpdatingTask}
              value={taskData.status || "pending"}
              onChange={handleStatusChange}
              className="custom-select w-full mt-2 h-10 px-4 rounded-md border border-gray2 bg-transparent dark:text-white outline-none"
            >
              <option value="doing">Doing</option>
              <option value="done">Done</option>
              <option value="pending">Pending</option>
            </select>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isUpdatingTask}
          shape="primaryS"
        >
          {isUpdatingTask ? <LoadingSpinner /> : "Save"}
        </Button>
      </form>
    </PopupWindow>
  );
}
