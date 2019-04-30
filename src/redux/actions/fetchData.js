import { FETCH_DATA_SUCCESS } from "../actionTypes/fetch";

export const fetchSuccess = data => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
});
