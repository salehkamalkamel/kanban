import PropTypes from "prop-types";
import classNames from "classnames";

export default function Heading({
  children,
  className = "",
  shape = "xl",
  level = 1,
}) {
  const defaultStyle = "font-bold";
  const styles = {
    xl: "text-xl leading-[1.875rem] ",
    l: "text-lg leading-[1.4375rem] ",
    m: "text-base leading-[1.1875rem] ",
    s: "text-sm leading-[0.9375rem] tracking-[2.4px] ",
  };

  const Tag = `h${level}`; // Dynamically assign heading tag

  return (
    <Tag className={classNames(styles[shape], defaultStyle, className)}>
      {children}
    </Tag>
  );
}

//  PropTypes for better type safety and documentation
Heading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  shape: PropTypes.oneOf(["xl", "l", "m", "s"]),
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]), // For heading level h1 to h6
};
