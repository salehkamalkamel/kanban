import Heading from "../../ui/Heading";

export default function AddColumn({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="flex hover:scale-[0.98] transition-transform duration-200 w-72 bg-gray3 dark:bg-black3 rounded-md outline-none items-center  border-none justify-center  h-full"
    >
      <Heading shape="xl" level={1} className="text-gray1">
        + New Column
      </Heading>
    </button>
  );
}
