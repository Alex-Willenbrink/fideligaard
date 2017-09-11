import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class TradeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: this.props.symbol,
      price: this.props.stockCost,
      dough: 123123,
      quantity: 0
    };
  }

  onQuantityChange = e => {
    this.setState({
      quantity: parseInt(e.target.value)
    });
  };

  render() {
    const { symbol, date, stockCost } = this.props;
    return (
      <Form>
        <FormGroup row>
          <Label for="symbol">Symbol</Label>
          <FormText>
            {symbol}
          </FormText>
        </FormGroup>

        <FormGroup row>
          <Label for="stock-options">Select</Label>
          <Input type="select" name="select" id="stock-options">
            <option>Buy</option>
            <option>Sell</option>
          </Input>
        </FormGroup>

        <FormGroup row>
          <Label for="stock-quantity">Quantity</Label>
          <Input
            type="text"
            id="stock-quantity"
            onChange={this.onQuantityChange}
          />
        </FormGroup>

        <FormGroup row>
          <Label for="date">Date</Label>
          <FormText>
            {date}
          </FormText>
        </FormGroup>

        <FormGroup row>
          <Label for="stock-cost">Stock Cost: </Label>
          <FormText>
            ${stockCost}
          </FormText>
        </FormGroup>

        <FormGroup row>
          <Label for="stock-cost">Stock Cost: </Label>
          <FormText>
            ${stockCost}
          </FormText>
        </FormGroup>

        <FormGroup row>
          <Label for="total-cost">Total Cost: </Label>
          <FormText>
            ${this.state.quantity * this.state.price}
          </FormText>
        </FormGroup>

        <Button>Submit</Button>
      </Form>
    );
  }
}

export default TradeView;
