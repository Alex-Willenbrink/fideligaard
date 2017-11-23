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
import TextField from "material-ui/TextField";
import { withRouter, Link } from "react-router-dom";

import { red400, green400 } from "material-ui/styles/colors";

import { UpArrow, DownArrow, UpWing, DownWing } from "../SvgIcons";
import "./StocksData.css";

const StocksData = ({ stocksData, onFilterChange, onSortChange, sortDir }) => {
  const headerLabels = ["Symbol", "Price", "1d", "7d", "30d", "Trade"];
  const tableHeaderRow = headerLabels.map((label, index) =>
    <TableHeaderColumn key={label}>
      <div className="stocks-table-label">
        <p>
          {label}
        </p>
        {index === 0
          ? sortDir === "DESC"
            ? <DownArrow className="svg-arrow" onClick={onSortChange} />
            : <UpArrow className="svg-arrow" onClick={onSortChange} />
          : null}
      </div>
    </TableHeaderColumn>
  );

  // divide into Symbol, Price, days, trade
  const tableDataRows = stocksData.map(rowData => {
    return (
      <TableRow key={rowData.Symbol}>
        {Object.keys(rowData).map(key =>
          <TableRowColumn key={`${rowData.Symbol}${key}`}>
            <div className="daily-stock-prices">
              <p>
                {rowData[key] ? rowData[key] : "?"}
              </p>
              {rowData[key] &&
              !isNaN(rowData[key]) &&
              key[key.length - 1] === "D"
                ? rowData[key] > 0
                  ? <UpWing className="svg-wing" color={green400} />
                  : rowData[key] < 0
                    ? <DownWing className="svg-wing" color={red400} />
                    : null
                : null}
            </div>
          </TableRowColumn>
        )}
        <TableRowColumn key={rowData.Symbol}>
          <div className="daily-stock-prices">
            <Link className="nav-link" to={`/Trade?t=${rowData.Symbol}`}>
              <p>Trade</p>
            </Link>
          </div>
        </TableRowColumn>
      </TableRow>
    );
  });

  return (
    <Paper id="stocks-container">
      <div className="top">
        <h2 className="header">Stocks</h2>
        <TextField
          floatingLabelText="Filter by Symbol"
          className="textfield"
          id="filter-by-symbol"
          onChange={onFilterChange}
        />
      </div>
      <div className="bottom">
        <Paper className="table-container">
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
      </div>
    </Paper>
  );
};

export default withRouter(StocksData);
