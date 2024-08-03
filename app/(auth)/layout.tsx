import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary-50 bg-dotted-pattern flex-center  w-full min-h-screen bg-fixed bg-center bg-cover">
      {children}
    </div>
  );
};

export default layout;
