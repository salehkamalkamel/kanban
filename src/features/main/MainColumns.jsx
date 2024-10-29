export default function MainColumns({ columns }) {
  return (
    <div className="flex flex-col justify-center items-start w-full gap-4">
      <div className="flex items-center justify-start gap-2">
        <span className="w-4 h-4 rounded-full bg-orange-600" />
        <p>{columns.title}</p>
      </div>
    </div>
  );
}
