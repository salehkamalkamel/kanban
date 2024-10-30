export default function SmColorPicker({ value, onChange, ...props }) {
  return (
    <input
      {...props}
      value={value}
      onChange={onChange}
      type="color"
      className="
      sm-color-picker
        appearance-none h-10 w-10  bg-transparent cursor-pointer 
        border-none outline-none rounded-md
      "
      style={{
        WebkitAppearance: "none",
        MozAppearance: "none",
        appearance: "none",
      }}
    />
  );
}
