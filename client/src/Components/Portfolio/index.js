import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import RouterDropdown from "../RouterDropdown";
import Divider from "material-ui/Divider";

import "./Portfolio.css";

const Portfolio = ({ stocks }) => {
  const headerArr = [
    { label: "Symbol", value: "ticker" },
    { label: "Quantity", value: "quantity" },
    { label: "Current Price", value: "currentPrice" },
    { label: "Value", value: "value" }
  ];

  const tableHeaderRow = headerArr.map(headerObj =>
    <TableHeaderColumn key={headerObj.value}>
      <p>
        {headerObj.label}
      </p>
    </TableHeaderColumn>
  );

  const tableDataRows = stocks.map(rowData => {
    return (
      <TableRow key={rowData.ticker}>
        {Object.keys(rowData).map(key =>
          <TableRowColumn key={`${rowData.ticker}${key}`}>
            <p>
              {rowData[key] ? rowData[key] : "?"}
            </p>
          </TableRowColumn>
        )}
      </TableRow>
    );
  });

  return (
    <Paper id="portfolio-container">
      <div className="top">
        <h2 className="header">Portfolio</h2>
        <RouterDropdown route="Portfolio" />
      </div>
      <br />
      <br />
      <Divider className="divider" />
      <Paper className="table-container bottom">
        <Table fixedHeader={true}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            className="table-header"
          >
            <TableRow>
              {tableHeaderRow}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows={true}>
            {tableDataRows}
          </TableBody>
        </Table>
      </Paper>
    </Paper>
  );
};

export default Portfolio;
