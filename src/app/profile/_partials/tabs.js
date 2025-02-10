import React from "react";

export const Tabs = ({ children, className }) => (
  <div className={`border rounded-2xl p-4 shadow-md bg-white ${className}`}>
    {children}
  </div>
);

export const TabsContent = ({ children }) => <div>{children}</div>;
