import { MdOutlineSpaceDashboard } from "react-icons/md";
import Heading from "../../ui/Heading";
import { useActiveBoardContext } from "../../contexts/ActiveBoard";

export default function SideBarItem({ board, children }) {
  const { activeBoardId } = useActiveBoardContext();
  return (
    <Heading
      shape="m"
      level={3}
      className={`flex gap-2 cursor-pointer items-center justify-start w-full text-gray1 ${board?.id === activeBoardId ? "bg-primary text-white" : "bg-transparent"} hover:bg-primaryLte hover:text-white py-4 pl-6 rounded-r-full`}
    >
      <MdOutlineSpaceDashboard size="1rem" />
      <span className="truncate max-w-[20ch] text-ellipsis overflow-hidden whitespace-normal">
        {children}
      </span>
    </Heading>
  );
}
