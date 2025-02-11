import React from "react";

export const Button = ({ children, className }) => (
  <div className={`border rounded-2xl p-4 shadow-md bg-white ${className}`}>
    {children}
  </div>
);

export const ButtonContent = ({ children }) => <div>{children}</div>;
