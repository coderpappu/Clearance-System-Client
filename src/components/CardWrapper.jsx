import React from "react";

const CardWrapper = ({ children }) => {
  return (
    <div className="w-[400px] md:w-[680px] lg:w-full h-auto bg-white dark:bg-dark-card  rounded-md ">
      {children}
    </div>
  );
};

export default CardWrapper;
