import React from "react";
import StocksTable from "./StocksTable";

const StocksView = ({ stocksData, isFetching, handler }) => {
  return (
    <div>
      {isFetching
        ? <p>Loading...</p>
        : <StocksTable tableData={stocksData} handler={handler} />}
    </div>
  );
};

export default StocksView;
