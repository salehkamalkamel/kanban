export default function EditTaskBtn({ onOpen }) {
  return (
    <button
      type="button"
      onClick={() => {
        onOpen();
      }}
      className=" w-full bg-transparent text-start outline-none border-none text-gray1"
    >
      Edit Task
    </button>
  );
}
