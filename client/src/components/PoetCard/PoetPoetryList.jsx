import React, { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import PoetryCard from "../Poetries/PoetryCard";
import { useLocation, useNavigate } from "react-router-dom";
import poetServices from "../Services/PoetServices";
const PoetPoetryList = () => {
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [poetId, setPoetId] = useState(location.state.poetId);
  const navigation = useNavigate();
  const [poetries, setPoetries] = React.useState([
    {
      title: "abc",
      description:
        "  Lorem ipsum dolor sit amet consectetur, adipisicing elit. A aperiam commodi saepe nulla architecto voluptatum possimus, laboriosam fugit cumque officia adipisci laudantium eum error quia eligendi doloremque temporibus ullam? Ratione",
    },
    {
      title: "def",
      description:
        "  Lorem ipsum dolor sit amet consectetur, adipisicing elit. A aperiam commodi saepe nulla architecto voluptatum possimus, laboriosam fugit cumque officia adipisci laudantium eum error quia eligendi doloremque temporibus ullam? Ratione",
    },
  ]);
  useEffect(() => {
    getData();
  }, [poetId]);
  function getData() {
    setLoading(true);

    poetServices
      .getPoetries(poetId._id)
      .then((data) => {
        console.log(data);
        setPoetries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };
  const handleOnSelect = (poetry) => {
    setPoetries([poetry]);
  };
  const handleClear = () => {
    setPoetries([]);
    getData();
  };
  const formatResult = (poet) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {poet.title}
        </span>
      </>
    );
  };
  const handleSubscription = () => {
    navigation("/poet/buysubscription", { state: { poet: poetId } });
  };
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between m-6">
          <div className="w-1/2">
            <h1 className="text-5xl">Poetries</h1>
          </div>

          <div>
            <div className="">
              <div style={{ width: 300 }}>
                <ReactSearchAutocomplete
                  items={poetries}
                  fuseOptions={{ keys: ["title"] }}
                  resultStringKeyName="title"
                  onSelect={handleOnSelect}
                  onClear={handleClear}
                  formatResult={formatResult}
                  onSearch={handleOnSearch}
                  styling={{ zIndex: 4 }}
                  autoFocus
                  placeholder="Search poetry by title"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <RiseLoader
            color={"#2237ac"}
            loading={loading}
            css={"margin-top:400px"}
          />
        </div>
        {poetries.length === 0 && !loading ? (
          <p>There is poetry yet!</p>
        ) : (
          <div class="flex flex-wrap -m-4">
            {poetries.map((poetry) => (
              <div class="xl:w-1/4 md:w-1/2 w-full p-4">
                <PoetryCard poetry={poetry}></PoetryCard>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center my-10">
          <button
            onClick={handleSubscription}
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Buy subscription
          </button>
        </div>
      </div>
    </section>
  );
};

export default PoetPoetryList;
