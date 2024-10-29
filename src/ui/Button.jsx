import classNames from "classnames";

export default function Button({
  onClick,
  onOpen,
  children,
  disabled = false,
  className = "",
  shape = "primaryL",
  type = "button",
  ...props
}) {
  const defaultStyle = `hover:opacity-75 ${disabled ? "hover:opacity-100" : ""}`;

  const styles = {
    textOnlyP: "cursor-pointer text-primary bg-transparent",
    primaryL:
      "text-white font-extrabold rounded-full text-[0.9375rem] leading-[1.1875rem] py-[1.25rem] bg-primary",
    primaryS:
      "text-white font-bold rounded-full text-base leading-[1.1875rem] py-[1rem] bg-primary",
    secondary:
      "font-bold rounded-full text-primary text-base leading-[1.1875rem] py-[1rem] bg-gray2 dark:bg-white",
    error:
      "font-bold rounded-full text-white text-base leading-[1.1875rem] py-[1rem] bg-red1",
  };

  const handleClick = () => {
    if (onClick) onClick();
    if (onOpen) onOpen();
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={classNames(defaultStyle, styles[shape], className)}
      {...props} // Spread any additional props (e.g., aria-label)
    >
      {children}
    </button>
  );
}
