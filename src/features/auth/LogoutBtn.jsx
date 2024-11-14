import { IoIosLogOut } from "react-icons/io";

export default function LogoutBtn({ onOpen, className = "" }) {
  return (
    <button onClick={onOpen}>
      <IoIosLogOut className={`text-gray1 ${className}`} size="1.5rem" />
    </button>
  );
}
