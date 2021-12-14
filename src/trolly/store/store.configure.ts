import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import apiMiddleware from "./middleware/api.middleware";
import { combineReducers } from "redux";
import apiReducer from "./reducers/api.reducers";
import authReducer from "./reducers/auth.reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { IStoreAction } from "./store.interface";

const storeInit = (
  logoutIdentifier: string,
  initialState = {},
  reducers = {},
  additionalMiddlewares = []
) => {
  const middlewares = [...additionalMiddlewares, apiMiddleware, reduxThunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const storeEnhancers = [middlewareEnhancer] as any[];
  if (process.env.NODE_ENV === "development") {
    const devTools = composeWithDevTools();
    if (devTools) {
      storeEnhancers.push(devTools);
    }
  }

  const appReducer = combineReducers({
    api: apiReducer,
    auth: authReducer,
    ...reducers,
  });
  const rootReducer = (state: any, action: IStoreAction) => {
    if (action.type === logoutIdentifier) {
      state = undefined;
    }

    return appReducer(state, action);
  };

  const composedEnhancers = compose(...storeEnhancers) as any;

  return createStore(rootReducer, initialState, composedEnhancers);
};

export default storeInit;
