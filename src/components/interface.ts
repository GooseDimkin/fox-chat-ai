import { ReactNode } from "react";

export interface IButton {
  onClick?: () => void;
  children?: ReactNode;
  size?: "small" | "medium" | "large";
  width?: string;
  disabled?: boolean;
  color?: "default" | "secondary"
}
