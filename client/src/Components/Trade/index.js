import React from "react";

import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";

import RouterDropdown from "../RouterDropdown";
import { MoneyBag } from "../SvgIcons";

import "./Trade.css";

const Trade = ({
  balance,
  onTradeInfoChange,
  onQuantityChange,
  symbol,
  tradeType,
  quantity,
  date,
  price,
  cost,
  onTradeTransaction,
  isValidTransaction,
  moneyBagSize
}) => {
  const tradeInfo = [
    {
      label: "Symbol",
      element: (
        <p>
          {symbol}
        </p>
      )
    },
    {
      label: "Buy/Sell",
      element: (
        <RadioButtonGroup
          onChange={onTradeInfoChange}
          name="tradeType"
          defaultSelected={tradeType}
        >
          <RadioButton value="Buy" label="Buy" />
          <RadioButton value="Sell" label="Sell" />
        </RadioButtonGroup>
      )
    },
    {
      label: "Quantity",
      element: (
        <TextField
          floatingLabelText="Quantity"
          name="quantity"
          onChange={onQuantityChange}
          value={quantity}
        />
      )
    },
    {
      label: "Date",
      element: (
        <p>
          {date}
        </p>
      )
    },
    {
      label: "Price",
      element: (
        <p>
          {price}
        </p>
      )
    },
    {
      label: "Cost",
      element: (
        <p>
          {cost}
        </p>
      )
    }
  ];

  const balanceAmountStyle = {
    fontSize: `${24}px`,
    margin: 0,
    padding: 0
  };

  return (
    <Paper id="trade-container">
      <div className="top">
        <h2 className="header">Trade</h2>
        <div className="trade-balance-container">
          <div id="balance-container">
            <h4 style={balanceAmountStyle}>Balance: </h4>
            <MoneyBag width={moneyBagSize} height={moneyBagSize} />
            <h4 style={balanceAmountStyle}>
              {balance}
            </h4>
          </div>
          <RouterDropdown route="Trade" />
        </div>
      </div>

      <Divider className="divider" />
      <Paper id="trade-info-container">
        {tradeInfo.map((infoObj, index) => {
          let className =
            index % 2 === 0
              ? "trade-info-instance-container even"
              : "trade-info-instance-container";
          return (
            <div className={className} key={infoObj.label}>
              <div className="trade-info label">
                <h4>
                  {infoObj.label}
                </h4>
              </div>
              <div className="trade-info value">
                {infoObj.element}
              </div>
            </div>
          );
        })}
      </Paper>
      <RaisedButton
        label="Place Order"
        primary={true}
        onClick={onTradeTransaction}
        disabled={!isValidTransaction}
        data-tip="test"
      />
    </Paper>
  );
};

export default Trade;
