import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import React from "react";
const Button = ({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) => {
  const [buttonStyles, setButtonStyles] = useState<React.CSSProperties>({});
  const { theme, primaryColor, secondaryColor, defaultColor } = useTheme();
  useEffect(() => {
    if (theme === "custom") {
      setButtonStyles({
        backgroundColor: active ? secondaryColor : primaryColor,
        opacity: active ? 1 : 0.7,
      });
    } else {
      setButtonStyles({
        backgroundColor: defaultColor,
        opacity: active ? 1 : 0.7,
      });
    }
  }, [theme, primaryColor, secondaryColor, defaultColor, active]);
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "1";
    if (theme === "custom") {
      target.style.backgroundColor = active ? secondaryColor : primaryColor;
    }
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = active ? "1" : "0.7";
    if (theme === "custom") {
      target.style.backgroundColor = active ? secondaryColor : primaryColor;
    }
  };
  const childWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        style: {
          ...buttonStyles,
          transition: "background-color 0.3s ease, opacity 0.3s ease",
        },
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      });
    }
    return child;
  });
  return <>{childWithProps}</>;
};
export default Button;
