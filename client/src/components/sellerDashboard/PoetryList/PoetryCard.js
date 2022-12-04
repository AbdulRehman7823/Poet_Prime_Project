import React from "react";

function PoetryCard() {
  return (
    <div className="p-2 md:max-w-lg ">
      <a className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-t-lg md:h-56 md:w-48 md:rounded-none md:rounded-l-lg"
          src="http://photos.demandstudios.com/getty/article/83/161/488307649.jpg"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">
            Sad Poetry
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Loving you is a looss sa sa  as assa as assa as asas dasda lorem implements lorem. Lore lorem in lore dasnfia iadsn nasdin isadn insad insad
          </p>
          <button className="text-gray-100 bg-blue-600 px-2 py-2 rounded-lg">Delete</button>
        </div>
        
      </a>
    </div>
  );
}

export default PoetryCard;
