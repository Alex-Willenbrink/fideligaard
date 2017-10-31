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
// import { NavLink } from "react-router-dom";

// date will be in this format
// row = {symbol: "AAPL", Price: 123.45, "1d": +1.54...}

const StocksData = ({ stocksData }) => {
  const headerLabels = ["Symbol", "Price", "1d", "7d", "30d"]; //, "Trade"
  const tableHeaderRow = headerLabels.map(label =>
    <TableHeaderColumn key={label}>
      {label}
    </TableHeaderColumn>
  );

  const tableDataRows = stocksData.map(rowData => {
    return (
      <TableRow key={rowData.Symbol}>
        {Object.keys(rowData).map(key =>
          <TableRowColumn>
            {rowData[key] ? rowData[key] : "?"}
          </TableRowColumn>
        )}
        {/* <td key={rowData.Symbol}>
          <NavLink key={rowData.Symbol} className="nav-link" exact to="/Trade">
            trade
          </NavLink>
        </td> */}
      </TableRow>
    );
  });

  return (
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
  );
};

export default StocksData;
