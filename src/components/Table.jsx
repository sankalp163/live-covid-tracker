import React from "react";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <b>{numeral(cases).format("0,0")}</b>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
