import { useEffect, useState } from "react";

export default function Logo({ className }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img src={isDark ? "logoDark.svg" : "logoLight.svg"} alt="Logo" />
    </div>
  );
}
