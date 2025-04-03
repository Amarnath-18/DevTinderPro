import { io } from "socket.io-client";
import {BASE_URL} from "./constraints"
export const createSocketConnection = () => {
    console.log("Connecting to socket server at:", BASE_URL);
    return io(BASE_URL);
  };
  