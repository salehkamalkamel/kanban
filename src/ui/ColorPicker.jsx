import { useState } from "react";

const ColorPicker = ({ onColorChange, value = "#A8A4FF" }) => {
  const [color, setColor] = useState(value); // Default color

  const handleChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    onColorChange(newColor); // Notify parent component about the color change
  };

  return (
    <div className="flex items-center space-x-4 mt-2">
      <input
        type="color"
        value={color}
        onChange={handleChange}
        className="flex-1 h-10 px-1 rounded-md border border-gray2 bg-transparent dark:text-white outline-none"
      />
      <span
        className="text-sm font-bold text-gray1 dark:text-white mb-2"
        style={{ color }}
      >
        {color.toUpperCase()}
      </span>
    </div>
  );
};

export default ColorPicker;
