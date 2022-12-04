import React from "react";

function PoetryCard({ poetry }) {
  return (
    <div>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {poetry?.title}
          </h5>
          <hr className=" h-1 bg-slate-400 w-40" />
          <span className="text-md p-4 text-justify text-gray-500 dark:text-gray-400">
            {poetry?.description}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PoetryCard;
