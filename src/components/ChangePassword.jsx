import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constraints";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(email, password, name);
        setLoading(true);
      const response = await axios.patch(
        `${BASE_URL}/forgotPassword`,
        { email, name, password },
        { withCredentials: true }
      );
      console.log(response);
      navigate("/login");
    } catch (err) {
        setLoading(false)
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-[400px] md:w-[500px] bg-base-300 shadow-xl p-6">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold mb-4">
            Change Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full text-lg focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Name Field (Fixed Label) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                className="input input-bordered w-full text-lg focus:outline-none"
                onChange={(e) => setName(e.target.value)}
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

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>

      {/* Toast for Error Message */}
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

export default ChangePassword;
