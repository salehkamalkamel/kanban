import { FaPlus } from "react-icons/fa6";

export default function AddTaskBtn({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="w-5 h-5 rounded-full text-gray1 border border-gray1 flex items-center justify-center p-1"
    >
      <FaPlus />
    </button>
  );
}
