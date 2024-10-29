import { useState } from "react";

export default function BoardColumnItem({ value = "" }) {
  const [data, setData] = useState(value);

  function handleChange(e) {
    setData(e.target.value);
  }

  return (
    <input
      value={data} // Controlled input: manage value with state
      onChange={handleChange}
      className="bg-transparent rounded-md border px-4 py-2 border-gray2 dark:text-white outline-none h-full w-full"
    />
  );
}
