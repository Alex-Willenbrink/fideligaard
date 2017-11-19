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

const Portfolio = ({stocks}) => {
  const headerArr = [
    { label: "Symbol", value: "ticker" },
    { label: "Quantity", value: "quantity" },
    { label: "Current Price", value: "currentPrice" }
    { label: "Price", value: "price" }
  ];
}
