import React from "react";

export const Input = ({ children, className }) => (
  <div className={`border rounded-2xl p-4 shadow-md bg-white ${className}`}>
    {children}
  </div>
);

export const InputContent = ({ children }) => <div>{children}</div>;
