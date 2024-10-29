export default function DeleteTaskBtn({ onOpen }) {
  return (
    <button
      type="button"
      onClick={() => {
        onOpen();
      }}
      className="w-full text-start hover:text-red2 bg-transparent outline-none border-none text-red1"
    >
      Delete Task
    </button>
  );
}
