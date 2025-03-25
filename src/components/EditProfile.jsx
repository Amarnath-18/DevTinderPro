import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {BASE_URL} from "../utils/constraints"


const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    photoUrl: user?.photoUrl || "",
    about: user?.about || "",
    skills: user?.skills?.join(", ") || "",
    gender: user?.gender || "",
    age: user?.age || "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        photoUrl: user?.photoUrl || "",
        about: user?.about || "",
        skills: user?.skills?.join(", ") || "",
        gender: user?.gender || "",
        age: user?.age || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        photoUrl: formData.photoUrl,
        about: formData.about,
        skills: formData.skills.split(",").map((skill) => skill.trim()), 
        gender: formData.gender,
        age: Number(formData.age), 
      };

      const response = await axios.patch(
        `${BASE_URL}/userUpdate/${user?._id}`,
        updatedData,
        { withCredentials: true }
      );

      dispatch(addUser(response.data.user));
      setSuccess("Profile updated successfully!");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
      setSuccess(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-[500px] md:w-[600px] bg-base-300 shadow-xl p-8">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold mb-6">Edit Profile</h2>

          {error && <div className="alert alert-error">{error}</div>
          }
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Photo URL */}
            <div className="form-control">
              <label className="label text-lg font-semibold">Photo URL</label>
              <input
                type="text"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                className="input input-bordered text-lg p-3 w-full"
                placeholder="Enter profile photo URL"
              />
            </div>

            {/* About */}
            <div className="form-control">
              <label className="label text-lg font-semibold">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="textarea textarea-bordered text-lg p-3 w-full"
                placeholder="Tell something about yourself"
              ></textarea>
            </div>

            {/* Skills */}
            <div className="form-control">
              <label className="label text-lg font-semibold">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="input input-bordered text-lg p-3 w-full"
                placeholder="E.g., React, Node.js, MongoDB"
              />
              <small className="text-gray-500">Comma-separated values</small>
            </div>

            {/* Gender */}
            <div className="form-control w-full max-w-lg mx-auto">
              <label className="label">
                <span className="text-lg font-semibold">Gender</span>
              </label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Enter your gender"
                className="input input-bordered text-lg p-3 w-full md:w-[400px]"
              />
            </div>

            {/* Age */}
            <div className="form-control">
              <label className="label text-lg font-semibold">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input input-bordered text-lg p-3 w-full"
                placeholder="Enter age"
                min="1"
              />
            </div>

            {/* Submit Button */}
            <button
              className="btn btn-primary w-full text-lg py-3"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
