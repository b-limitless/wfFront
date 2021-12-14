import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles";
import { ThemeProvider } from "trolly/common";
import { Provider } from "react-redux";
import { storeInit } from "trolly/store";
import { Router } from "react-router-dom";
import { history } from "config";
import appReducers from "store/reducers";
import { INITIAL_APP_STATE } from "store/store.constants";
import { RouteLoader } from "components/Loaders";

const store = storeInit("AUTH_LOGOUT", INITIAL_APP_STATE, appReducers);

const generateClassName = createGenerateClassName({
  productionPrefix: "wealthfaceClasses-",
});
ReactDOM.render(
  <Provider store={store}>
    <StylesProvider injectFirst generateClassName={generateClassName}>
      <ThemeProvider themeMode="light">
        <CssBaseline />
        <Suspense fallback={<RouteLoader />}>
          <Router history={history}>
            <App />
          </Router>
        </Suspense>
      </ThemeProvider>
    </StylesProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
