import { combineReducers } from "redux";
//import reducers

import userReducer from "./reducers/userReducer";

//thi is very important note during accessing the state in components
const rootReducer = combineReducers({
   user:userReducer
});

export default rootReducer;
