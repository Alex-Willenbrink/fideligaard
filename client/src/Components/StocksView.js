import React from "react";

const StocksView = ({ stocksData, isFetching }) => {
  return (
    <div>
      {isFetching ? <p>Loading...</p> : <p>Successfully loaded</p>}
    </div>
  );
};

export default StocksView;
