import { fetchSuccess } from "../../redux/actions";
import { fetchData } from "../../firebase/firebase";

export const fetchRealTimeData = (params, dealsItem) => {
  return dispatch =>
    new Promise((resolve, reject) => {
      fetchData.on("value", snapshot => {
        dispatch(fetchSuccess(snapshot.val()));
        resolve();
      });
    });
};
export default fetchRealTimeData;
