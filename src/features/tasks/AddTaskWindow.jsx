import Heading from "../../ui/Heading";
import { useState } from "react";
import Button from "../../ui/Button";
import { v4 as uuidv4 } from "uuid";

import { useAddTask } from "../../hooks/useAddTask";
import { useActiveBoardContext } from "../../contexts/ActiveBoard";
import LoadingSpinner from "../../ui/LoadingSpinner";
import PopupWindow from "../../ui/PopupWindow";
import InputDataView from "../../ui/InputDataView";

export default function AddTaskWindow({ onClose, columnId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const { activeBoard } = useActiveBoardContext();
  const [subTasks, setSubTasks] = useState([
    { title: "", completed: false, id: uuidv4() },
    { title: "", completed: false, id: uuidv4() },
  ]);

  const { addTask, addingTask } = useAddTask();

  function handleAddTask() {
    setSubTasks((tasks) => [
      ...tasks,
      { title: "", completed: false, id: uuidv4() },
    ]);
  }

  function handleTaskChange(index, value) {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks[index].title = value;
    setSubTasks(updatedSubTasks);
  }

  function handleDeleteSubTask(index) {
    setSubTasks((subTasks) => subTasks.filter((_, idx) => idx !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newTask = { title, description, subTasks, status, id: uuidv4() };
    addTask(
      { boardId: activeBoard?.id, columnId, newTask },
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
          Add New Task
        </Heading>

        <div className="w-full">
          <label className="block text-sm font-bold text-gray1 dark:text-white mb-2">
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-4 mt-2 rounded-md border border-gray2 bg-transparent placeholder:font-bold placeholder:text-[0.75rem] placeholder:leading-4 text-black1 font-medium text-[0.8125rem] leading-6 dark:text-white outline-none"
              type="text"
              placeholder="e.g. Take coffee break"
              required
            />
          </label>
        </div>

        <div className="w-full">
          <label className="block text-sm font-bold text-gray1 dark:text-white mb-2">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 min-h-28 px-4 py-2 rounded-md border border-gray2 bg-transparent placeholder:font-bold placeholder:text-[0.75rem] placeholder:leading-4 text-black1 font-medium text-[0.8125rem] leading-6 dark:text-white outline-none"
              placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
              required
            />
          </label>
        </div>

        <div className="w-full flex flex-col gap-4">
          <p className="text-sm font-bold text-gray1 dark:text-white">
            Subtasks
          </p>
          <InputDataView
            data={subTasks}
            dataType="SubTask"
            handleItemChange={handleTaskChange}
            handleDeleteItem={handleDeleteSubTask}
          />

          <Button className="w-full" shape="secondary" onClick={handleAddTask}>
            + Add New Subtask
          </Button>
        </div>

        <div className="w-full">
          <label className="block text-sm font-bold text-gray1 dark:text-white mb-2">
            Status
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              className="custom-select w-full mt-2 h-10 px-4 rounded-md border border-gray2 bg-transparent dark:text-white outline-none"
            >
              <option value="doing">Doing</option>
              <option value="done">Done</option>
              <option value="pending">Pending</option>
            </select>
          </label>
        </div>

        <Button className="w-full" shape="primaryS" type="submit">
          {addingTask ? <LoadingSpinner /> : "Create Task"}
        </Button>
      </form>
    </PopupWindow>
  );
}
