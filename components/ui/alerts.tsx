import { Alert } from "@heroui/react";
import { useEffect } from "react";

export default function Alerts(
  { title, description, color = "primary", variant = "solid", isVisible = false, visibility }:
    {
      title: string,
      description: string,
      color?: "primary" | "secondary" | "success" | "warning" | "danger",
      variant?: "solid" | "flat" | "faded" | "bordered",
      isVisible?: boolean,
      visibility: (isVisible: boolean) => void
    }
) {

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        visibility(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 w-11/12 max-w-lg z-50 transition-transform duration-300 ease-in-out 
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
    >
      <Alert
        color={color}
        description={description}
        isVisible={isVisible}
        title={title}
        variant={variant}
        onClose={() => visibility(false)}
      />
    </div>
  );
}
