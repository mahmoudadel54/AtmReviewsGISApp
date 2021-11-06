import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
//thunk for async API calls -> pass it to applyMiddleware
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./rootReducer";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
