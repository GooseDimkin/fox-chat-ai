import React from "react";
import styles from "./button.module.scss";
import { IButton } from "@/components/interface";

const Button: React.FC<IButton> = ({
  onClick,
  children,
  size = "small",
  width,
  disabled = false,
  color = "default",
}) => {
  const sizeStyle =
    size === "small"
      ? { height: "40px", width: width ?? "100px" }
      : size === "medium"
      ? { height: "50px", width: width ?? "150px" }
      : { height: "60px", width: width ?? "180px" };

  return (
    <button
      onClick={onClick}
      className={`${styles.wrapper} ${styles[color]}`}
      style={sizeStyle}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
