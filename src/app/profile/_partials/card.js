import React from "react";

export const Card = ({ children, className }) => (
  <div className={`border rounded-2xl p-4 shadow-md bg-white ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => <div>{children}</div>;
