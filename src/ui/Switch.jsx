export default function Switch({ checked, onChange }) {
  return (
    <div
      onClick={onChange}
      className="bg-primary w-[40px] h-[20px] rounded-full relative cursor-pointer p-[2.5px]"
      role="switch"
      aria-checked={checked}
      tabIndex={0} // Makes it focusable
      onKeyDown={(e) => e.key === "Enter" && onChange()} // Toggle with keyboard
    >
      <div
        className={`w-[15px] h-[15px] rounded-full bg-white transition-transform duration-200 transform ${
          checked ? "translate-x-[20px]" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
}
