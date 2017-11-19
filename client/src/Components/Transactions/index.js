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
import RouterDropdown from "../RouterDropdown";

const Transactions = ({ transactions }) => {
  const headerArr = [
    { label: "Date", value: "date" },
    { label: "Symbol", value: "ticker" },
    { label: "Type", value: "type" },
    { label: "Quantity", value: "quantity" },
    { label: "Price", value: "price" }
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
    <Paper>
      <h2>Transactions</h2>
      <RouterDropdown route={"Transactions"} />
      <Paper>
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
