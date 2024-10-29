import classNames from "classnames";

export default function BodyText({ children, shape = "bodyM", className }) {
  const styles = {
    bodyM: "font-bold text-[0.75rem] leading-4 ",
    bodyL: "font-medium text-[0.8125rem] leading-6",
  };
  return <p className={classNames(styles[shape], className)}>{children}</p>;
}
