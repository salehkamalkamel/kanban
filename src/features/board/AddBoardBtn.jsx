import { MdOutlineSpaceDashboard } from "react-icons/md";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";

export default function AddBoardBtn({ onOpen }) {
  return (
    <Button
      shape="textOnlyP"
      onClick={() => onOpen()}
      className="flex items-center justify-start w-full  py-4 pl-6"
    >
      <MdOutlineSpaceDashboard size="1rem" className="mr-2" />
      <Heading shape="m" level={3}>
        + Create New Board
      </Heading>
    </Button>
  );
}
