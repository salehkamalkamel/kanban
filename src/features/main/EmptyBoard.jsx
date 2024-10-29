import { IoAddOutline } from "react-icons/io5";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

export default function EmptyBoard() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Heading shape="l" level={2} className="text-gray1">
        This board is empty. Create a new column to get started.
      </Heading>
      <Button className="flex items-center justify-center gap-2 px-6">
        <IoAddOutline shape="primaryS" />
        <Heading shape="m" level={3}>
          Add New Column
        </Heading>
      </Button>
    </div>
  );
}
