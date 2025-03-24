import React, { useEffect } from "react";
import NavBer from "./NavBer";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constraints";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user)
  console.log("body Called");
  
  const FetchUser = async () => {
    try {
      const user = await axios.get(BASE_URL+"/profile" , {withCredentials:true});
      dispatch(addUser(user.data));
      console.log(user.data);
    } catch (error) {
      if(location.pathname !== "/changePassword")
      return navigate("/login");
    }
  };

  useEffect(()=>{
    if(!user)
    FetchUser();
  } , [])

  return (
    <div className="flex flex-col min-h-screen">
      <NavBer />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
