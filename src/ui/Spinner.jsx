export default function Spinner({ size = "8", color = "blue-500" }) {
  return (
    <div className={`flex justify-center items-center`}>
      <div
        className={`animate-spin rounded-full border-t-4 border-${color} border-t-transparent h-${size} w-${size}`}
      />
    </div>
  );
}
