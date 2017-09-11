import React from "react";
import { Table } from "reactstrap";
import { NavLink } from "react-router-dom";

// date will be in this format
// row = {symbol: "AAPL", Price: 123.45, "1d": +1.54...}

const StocksTable = ({ tableData, handler }) => {
  if (!tableData || !tableData.length) return null;

  const headerData = ["Symbol", "Price", "1d", "7d", "30d", "Trade"];
  let tableHeader = headerData.map(data => {
    if (data === "Symbol" || data === "Price") {
      return (
        <th key={data} onClick={handler} value={data}>
          {data}
        </th>
      );
    }
    return (
      <th key={data}>
        {data}
      </th>
    );
  });

  const tableDataRows = tableData.map(rowData => {
    return (
      <tr>
        {Object.keys(rowData).map(key =>
          <td>
            {rowData[key]}
          </td>
        )}
        <NavLink className="nav-link" exact to="/Trade">
          trade
        </NavLink>
      </tr>
    );
  });

  return (
    <div className="row">
      <div className="col-xs-12">
        <Table striped>
          <thead>
            <tr>
              {tableHeader}
            </tr>
          </thead>
          <tbody>
            {tableDataRows}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default StocksTable;
