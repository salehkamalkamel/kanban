export default function Input({ title, error, holder, className, ...props }) {
  return (
    <div
      className={`flex flex-col items-start justify-center gap-2 ${className}`}
    >
      <p className="text-gray1 dark:text-white text-sm font-bold">{title}</p>
      <div className="h-[2.5rem] w-full grid grid-cols-[1fr_auto] items-center justify-center rounded-md border bg-transparent border-gray2 px-4 py-2 text-[0.8125rem] font-medium">
        <input
          {...props}
          placeholder={holder}
          className=" bg-transparent dark:text-white border-none outline-none h-full"
        />
        {error && <p className="text-red1 px-2 w-fit">{error}</p>}
      </div>
    </div>
  );
}
