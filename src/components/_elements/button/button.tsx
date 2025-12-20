import React from "react";
import styles from "./button.module.scss";
import { IButton } from "../interface";

const Button: React.FC<IButton> = ({
  onClick,
  children,
  size = "small",
  width,
}: IButton) => {
  return (
    <button
      onClick={onClick}
      className={styles.wrapper}
      style={
        size === "small"
          ? { height: "40px", width: width ?? "100px" }
          : size === "medium"
          ? { height: "50px", width: width ?? "150px" }
          : { height: "60px", width: width ?? "180px" }
      }
    >
      {children}
    </button>
  );
};

export default Button;
