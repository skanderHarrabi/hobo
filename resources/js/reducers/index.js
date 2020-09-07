import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import errorsReducer from "./errors-reducer";
import stepsReducer from "./steps-reducer";
import questionsReducer from "./questions-reducer";

const rootReducer = combineReducers({
  authReducer,
  errorsReducer,
  stepsReducer,
  questionsReducer
});

export default rootReducer;
