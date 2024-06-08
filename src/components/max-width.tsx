import React from "react";

interface IMaxWidthProps {
  children: React.ReactNode;
  className?: string;
}

const MaxWidth: React.FC<IMaxWidthProps> = ({ children, className }) => {
  return (
    <div className={`w-full max-w-[1460px] sm:px-3 px-1 mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default MaxWidth;
