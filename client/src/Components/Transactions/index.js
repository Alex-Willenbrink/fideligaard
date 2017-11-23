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

import "./Transactions.css";

const Transactions = ({ transactions }) => {
  const headerArr = [
    { label: "Date", value: "date" },
    { label: "Symbol", value: "ticker" },
    { label: "Type", value: "type" },
    { label: "Quantity", value: "quantity" },
    { label: "Price", value: "price" },
    { label: "Cost", value: "cost" }
  ];
  const tableHeaderRow = (
    <TableRow>
      {headerArr.map((headerObj, index) =>
        <TableHeaderColumn key={headerObj.label}>
          <p>
            {headerObj.label}
          </p>
        </TableHeaderColumn>
      )}
    </TableRow>
  );

  const tableDataRows = transactions.map(rowData =>
    <TableRow key={rowData.id}>
      {headerArr.map(headerObj => {
        let columnNode = null;
        switch (headerObj.value) {
          case "date":
            columnNode = (
              <p>
                {rowData[headerObj.value].format("MM/DD/YYYY")}
              </p>
            );
            break;
          case "cost":
            columnNode = (
              <p>
                {(rowData.price * rowData.quantity).toFixed(2)}
              </p>
            );
            break;
          default:
            columnNode = (
              <p>
                {rowData[headerObj.value]}
              </p>
            );
        }
        return (
          <TableRowColumn key={`${rowData.id}${headerObj.value}`}>
            {columnNode}
          </TableRowColumn>
        );
      })}
    </TableRow>
  );

  return (
    <Paper id="transactions-container">
      <div className="top">
        <h2 className="header">Transactions</h2>
        <RouterDropdown route={"Transactions"} />
      </div>
      <br />
      <br />
      <Divider className="divider" />
      <Paper className="table-container bottom">
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            {tableHeaderRow}
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows={true}>
            {tableDataRows}
          </TableBody>
        </Table>
      </Paper>
    </Paper>
  );
};

export default Transactions;
