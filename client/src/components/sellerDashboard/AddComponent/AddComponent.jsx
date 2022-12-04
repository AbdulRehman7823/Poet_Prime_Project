import React from "react";

function AddComponent() {
  return (
    <div className="p-14 justify-center">
                 <h1 className="text-3xl font-lg text-gray-700 underline">ADD POETRY</h1>

      <div className="flex flex-row justify-around shadow-xl rounded-xl mt-14 p-10">
        <div className="w-2/3">
          <div>
            <label
              for="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Poetry Title
            </label>
            <input
              type="text"
              id="title"
              className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title"
              required
            />
          </div>
          <div>
            <label
              for="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an Poetry Type
            </label>
            <select
              id="countries"
              className=" mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Select Category</option>
              <option value="US">Sad</option>
              <option value="CA">Love</option>
              <option value="FR">Attitude</option>
              <option value="DE">Life</option>
            </select>
          </div>

          <div>
            <label
              for="detaile"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Poetry
            </label>
            <textarea
              id=""
              rows="4"
              className="mb-6 block p-2.5 w-full text-m text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your Poetry or Poetry related here...."
            ></textarea>
          </div>
          <button className="px-16 py-2 rounded-lg hover:bg-blue-500  bg-blue-600 text-white" >ADD</button>
        </div>

        <div className="flex items-center justify-center w-1/2 px-14">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
       

      </div>
     
    </div>
  );
}

export default AddComponent;
