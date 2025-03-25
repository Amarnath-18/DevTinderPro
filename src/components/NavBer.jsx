import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constraints';
import { addUser } from '../utils/userSlice';

const NavBer = () => {
  const user = useSelector(state=>state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userimg = user?.photoUrl;
  const toggleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/user/logout`, {}, { withCredentials: true }); // ✅ Fix here
      dispatch(addUser(null));
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm py-5 px-10">
        <div onClick={()=>navigate("/")} className="flex-1">
          <a className="btn btn-ghost  text-xl">DevTinder</a>
        </div>
        {user && <div className="flex gap-2  ">
          {/* <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          /> */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userimg}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li onClick={()=>navigate("/profile")} >
                <Link className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li onClick={()=>navigate("/connections")} >
                <Link >Connections</Link>
              </li>
              <li onClick={()=>navigate("/requests")} >
                <Link>Requests</Link>
              </li>
              <li onClick={toggleLogout} >
                <Link>Logout</Link>
              </li>
            </ul>
          </div>
        </div>}
      </div>
  )
}

export default NavBer