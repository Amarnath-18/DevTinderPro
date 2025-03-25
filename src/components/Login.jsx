import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import {BASE_URL} from "../utils/constraints"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state=> state.user)
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const data = await axios.post(
        `${BASE_URL}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      dispatch(addUser(data.data))
      navigate('/');

    } catch (err) {
      setError(err.response?.data?.message);
      console.log(err);
    }finally{setLoading(false)};

  };

  setTimeout(() => {
    setError(null)
  }, 5000);

  useEffect(() =>{
    if(user?.email){
      navigate('/');
    }
  } ,[user , navigate])

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-[400px] md:w-[500px] bg-base-300 shadow-xl p-6">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full  text-lg focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full text-lg focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <button className="btn btn-primary w-full text-lg" type="submit">
              {loading ? <span className="loading loading-spinner" ></span> : "Login"}
            </button>

            {/* Forgot Password Link */}
            <div className="text-center mt-2 flex">
              <a onClick={()=>navigate("/changePassword")} className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
              <p className="" onClick={()=>navigate("/signup")} >
                Don't have account ?
                <Link className="text-text-sm text-primary hover:underline" to="/signup"> Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {error && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
