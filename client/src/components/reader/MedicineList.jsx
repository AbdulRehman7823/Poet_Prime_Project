import React from "react";
import Medicine from "./Medicine";
import readerServices from "../Services/ReaderServices";
import RiseLoader from "react-spinners/RiseLoader";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
const MedicineList = () => {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
  function getData() {
    setLoading(true);
    readerServices
      .getProducts()
      .then((data) => {
        console.log(data);
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };
  const handleOnSelect = (item) => {
    console.log(item);
    setItems([item]);
  };
  const handleClear = () => {
    setItems([]);
    getData();
  };
  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {item.title}
        </span>
      </>
    );
  };

  React.useEffect(getData, []);
  return (
    <div
      className="container
"
      id="medicines"
    >
      <div className="row">
        <div className="col-lg-6">
          <h1>Medicines</h1>
        </div>
        <div className="col-lg-6 d-flex justify-content-end mt-2">
          <div style={{ width: 300 }}>
            <ReactSearchAutocomplete
              items={items}
              fuseOptions={{ keys: ["title"] }}
              resultStringKeyName="title"
              onSelect={handleOnSelect}
              onClear={handleClear}
              formatResult={formatResult}
              onSearch={handleOnSearch}
              styling={{ zIndex: 4 }}
              autoFocus
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <RiseLoader
          color={"#2237ac"}
          loading={loading}
          css={"margin-top:300px"}
        />
      </div>
      {items.length == 0 && !loading ? (
        <p>There ar no medicines</p>
      ) : (
        <div className="row cardLayOut" id="medicineList">
          {items.map((item, key) => (
            <div className="col-lg-3 col-md-4 col-sm-8 col-12 ">
              <Medicine key={key} item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicineList;
