import { BsThreeDotsVertical } from "react-icons/bs";

export default function BoardCtrlBtn({ onOpen, isOpen, onClose }) {
  return (
    <button
      type="button"
      onClick={() => {
        isOpen ? onClose() : onOpen();
      }}
    >
      <BsThreeDotsVertical className="text-gray1" size="1.5rem" />
    </button>
  );
}
