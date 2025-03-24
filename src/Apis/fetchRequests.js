import axios from "axios";
import { BASE_URL } from "../utils/constraints";
import { addRequests } from "../utils/requestSlice";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

const fetchRequests = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/received`, {
        withCredentials: true,
      });
      console.log("this is requests ", response.data);
      dispatch(addRequests(response.data));
    } catch (error) {
      console.log(error);
    }
  };

export default fetchRequests;