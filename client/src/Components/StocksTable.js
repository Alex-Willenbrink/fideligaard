import React from "react";
import { Table } from "reactstrap";
import { NavLink } from "react-router-dom";

// date will be in this format
// row = {symbol: "AAPL", Price: 123.45, "1d": +1.54...}

const StocksTable = ({ tableData, handler }) => {
  if (!tableData || !tableData.length) return null;

  const headerData = ["Symbol", "Price", "1d", "7d", "30d", "Trade"];
  let tableHeader = headerData.map(field => {
    if (field === "Symbol" || field === "Price") {
      return (
        <th key={field} onClick={handler} value={field}>
          {field}
        </th>
      );
    }
    return (
      <th key={field}>
        {field}
      </th>
    );
  });

  const tableDataRows = tableData.map(rowData => {
    return (
      <tr key={rowData.Symbol}>
        {Object.keys(rowData).map(key =>
          <td key={rowData[key]}>
            {rowData[key]}
          </td>
        )}
        <td key={rowData.Symbol}>
          <NavLink key={rowData.Symbol} className="nav-link" exact to="/Trade">
            trade
          </NavLink>
        </td>
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
