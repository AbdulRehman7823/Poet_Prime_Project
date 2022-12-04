import { useEffect, useState } from "react";
import React from "react";
function IncDecCounter({ tData, items, itemId, setTData }) {
  const [num, setNum] = useState(1);

  let incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);

      setTData(
        tData.map((data) =>
          data._id === itemId ? { ...data, orderQuantity: num + 1 } : data
        )
      );
    }
  };
  let decNum = () => {
    if (num > 1) {
      setNum(num - 1);
      setTData(
        tData.map((data) =>
          data._id === itemId ? { ...data, orderQuantity: num - 1 } : data
        )
      );
    }
  };
  let handleChange = (e) => {
    setNum(e.target.value);
    setTData(
      tData.map((data) =>
        data._id === itemId ? { ...data, orderQuantity: e.target.value } : data
      )
    );
  };

  return (
    <>
      <div id="counter">
        <div class="input-group">
          <div class="input-group-prepend">
            <button
              class="btn btn-outline-primary"
              type="button"
              onClick={decNum}
            >
              -
            </button>
          </div>
          <input
            type="text"
            class="form-control"
            value={num}
            onChange={handleChange}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <div class="input-group-prepend">
            <button
              class="btn btn-outline-primary"
              type="button"
              onClick={incNum}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default IncDecCounter;
