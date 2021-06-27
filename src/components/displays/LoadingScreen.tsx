import React from "react";
import clsx from "clsx";

interface LoadingPlaceholderProps {
  minHeight: number | string;
  color: "primary" | "secondary" | "white";
  iconSize?: string;
  iconBorderWidth?: string;
}

const defaultIconSize = "3rem";
const defaultIconBorderWidth = ".25rem";

const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = (props) => {
  const iconSize = props.iconSize ? props.iconSize : defaultIconSize;
  const iconBorderWidth = props.iconBorderWidth
    ? props.iconBorderWidth
    : defaultIconBorderWidth;
  return (
    <div
      className={clsx(
        "d-flex align-items-center justify-content-center h-100 ",
        `bg-${props.color}`,
        {
          "vh-100": props.minHeight === "vh-100",
        }
      )}
      style={{ minHeight: props.minHeight }}
    >
      <div
        className={clsx("spinner-border", {
          "text-primary": props.color === "secondary",
        })}
        style={{
          width: iconSize,
          height: iconSize,
          borderWidth: iconBorderWidth,
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingPlaceholder;
