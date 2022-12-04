import React from "react";

function TopCard() {
  return (
    <div className="flex flex-row justify-between items-center">
      <a
        className=" block p-6 bg-green-700 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 pr-14 text-2xl font-bold tracking-tight text-gray-100 dark:text-white">
          Total Sales
        </h5>
        <p className="font-bold text-5xl  text-gray-100 dark:text-gray-400">
            2$
        </p>
      </a>

      <a
        className="block w-92 p-6 bg-blue-700 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-100 dark:text-white">
          Total Subscribers
        </h5>
        <p className="font-bold text-5xl  text-gray-100 dark:text-gray-400">
            10
        </p>
      </a>

      <a
        className="block max-w-sm p-6 bg-red-800 border border-gray-200 rounded-lg shadow-md  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-100 dark:text-white">
          Remaining Requests
        </h5>
        <p className="font-bold text-5xl  text-gray-100 dark:text-gray-400">
            22
        </p>
      </a>
    </div>
  );
}

export default TopCard;
