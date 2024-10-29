export default function EditBoardBtn({ onOpen }) {
  return (
    <button
      onClick={() => {
        onOpen();
      }}
      className=" w-full hover:opacity-75 bg-transparent text-start outline-none border-none text-gray1"
    >
      Edit Board
    </button>
  );
}
