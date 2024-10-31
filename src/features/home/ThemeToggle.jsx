import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Switch from "../../ui/Switch";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const rootElement = document.documentElement;

  // check for user system theme
  useEffect(() => {
    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("theme");
    const currentTheme = prefersDarkTheme ? "dark" : "light";
    if (!savedTheme) {
      if (currentTheme === "dark") {
        rootElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        rootElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [rootElement]);

  // Check for existing theme preference in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDark(true);
      rootElement.classList.add("dark");
    }
  }, [rootElement]);

  // Update theme and store preference in localStorage
  useEffect(() => {
    if (dark) {
      rootElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      rootElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark, rootElement]);

  return (
    <div className="max-w-[14.5rem] md:max-w-[16rem] w-full bg-gray3 dark:bg-black2 py-4 rounded-md flex items-center justify-center transition-colors duration-300">
      <div className="text-gray1 flex items-center justify-center gap-4">
        <BsSunFill />
        <Switch checked={dark} onChange={() => setDark((prev) => !prev)} />
        <BsMoonFill />
      </div>
    </div>
  );
}
