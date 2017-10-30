import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./Components/App";

import configureStore from "./Store";

ReactDOM.render(
  <Provider store={configureStore()}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
