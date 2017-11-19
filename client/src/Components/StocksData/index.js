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

// import NeoSans from "../../assets/NeoSansStd-Bold.otf"
import SvgIcon from "material-ui/SvgIcon";
import { red400, green400 } from "material-ui/styles/colors";

import "./StocksData.css";

const UpArrow = props =>
  <SvgIcon {...props}>
    <path d="M7 14l5-5 5 5z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgIcon>;

const DownArrow = props =>
  <SvgIcon {...props}>
    <path d="M7 10l5 5 5-5z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgIcon>;

const UpWing = props =>
  <SvgIcon {...props}>
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgIcon>;

const DownWing = props =>
  <SvgIcon {...props}>
    <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
    <path d="M0-.75h24v24H0z" fill="none" />
  </SvgIcon>;

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
    <Paper>
      <article className="stocks-data-top-container">
        <h2 className="stocks-data-top" id="stocks-data-header">
          STOCKS
        </h2>
        <TextField
          floatingLabelText="Filter by Symbol"
          className="stocks-data-top"
          id="filter-by-symbol"
          onChange={onFilterChange}
        />
      </article>
      <div className="stocks-table-container">
        <Paper>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
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
