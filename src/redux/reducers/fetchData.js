import { FETCH_DATA_SUCCESS } from "../actionTypes/fetch";

const INITIAL_STATE = {
  data: {}
};

function fetchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_DATA_SUCCESS: {
      return {
        data: action.payload
      };
    }
    default:
      return state;
  }
}
export default fetchReducer;
