import axios from "axios";
import { BASE_URL } from "../utils/constraints";

const FetchConnections = async (dispatch, addConnections) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/connections`, {
      withCredentials: true,
    });
    console.log(response.data.data);
    dispatch(addConnections(response.data.data));
  } catch (error) {
    console.log(error);
  }
};

export default FetchConnections;
