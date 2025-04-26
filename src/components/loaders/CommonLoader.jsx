import React from "react";

const CommonLoader = ({ onlyLoader, className }) => {
  return (
    <div className="text-center">
      <div
        className={`border-4 border-dashed rounded-full animate-spin border-purple-200 mx-auto ${className}`}
      ></div>

      {onlyLoader == false && (
        <>
          <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Your adventure is about to begin
          </p>
        </>
      )}
    </div>
  );
};

export default CommonLoader;
