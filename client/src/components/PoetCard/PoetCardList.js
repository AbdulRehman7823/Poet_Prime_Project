import React from "react";
import readerServices from "../Services/ReaderServices";
import RiseLoader from "react-spinners/RiseLoader";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import PoetCard from "./PoetCard";
const PoetCardList = () => {
  const [loading, setLoading] = React.useState(false);
  const [poets, setPoets] = React.useState([]);
  function getData() {
    setLoading(true);
    readerServices
      .getPoets()
      .then((data) => {
        console.log(data);
        setPoets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };
  const handleOnSelect = (poet) => {
    setPoets([poet]);
  };
  const handleClear = () => {
    setPoets([]);
    getData();
  };
  const formatResult = (poet) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {poet.username}
        </span>
      </>
    );
  };

  React.useEffect(getData, []);
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between m-6">
          <div className="w-1/2">
            <h1 className="text-5xl">Poets</h1>
          </div>

          <div>
            <div className="">
              <div style={{ width: 300 }}>
                <ReactSearchAutocomplete
                  items={poets}
                  fuseOptions={{ keys: ["username"] }}
                  resultStringKeyName="username"
                  onSelect={handleOnSelect}
                  onClear={handleClear}
                  formatResult={formatResult}
                  onSearch={handleOnSearch}
                  styling={{ zIndex: 4 }}
                  autoFocus
                  placeholder="Search poet"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -m-4">
          {poets.map((poet) => (
            <div class="xl:w-1/4 md:w-1/2 w-full p-4">
              <PoetCard poet={poet}></PoetCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoetCardList;
