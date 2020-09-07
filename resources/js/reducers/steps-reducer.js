import { ADD_STEP } from "../actions/steps-actions/types";

const stepsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_STEP:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default stepsReducer;
