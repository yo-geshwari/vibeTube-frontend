import { useState, useRef } from "react";
import axios from "axios";
import LiquidChrome from "../components/LiquidChrome";
import Navbar from "../components/navbar";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
  });

  const [preview, setPreview] = useState({
    avatar: null,
    coverImage: null,
  });

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleAvatarClick = () => {
    avatarInputRef.current.click();
  };

  const handleCoverClick = () => {
    coverInputRef.current.click();
  };
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      // Set image preview
      const imageURL = URL.createObjectURL(files[0]);
      setPreview((prev) => ({
        ...prev,
        [name]: imageURL,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("username", formData.username);
    data.append("password", formData.password);
    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }
    if (formData.coverImage) {
      data.append("coverImage", formData.coverImage);
    }

    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/users/register`,
        data
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-x-hidden hide-scrollbar">
      {/* Navbar stays on top */}
      <Navbar register={false} home={true} />

      {/* Background Liquid Effect */}
      <div className="fixed inset-0 -z-10">
        <LiquidChrome
          baseColor={[0.9, 0.9, 0.95]}
          speed={0.2}
          amplitude={0.3}
          interactive={false}
        />
      </div>

      {/* Form Container */}
      <div className="relative z-10 flex items-center justify-center px-4 pt-14 pb-12">
        <form
          onSubmit={handleSubmit}
          className="bg-black/10 backdrop-blur-md shadow-2xl p-8 rounded-2xl w-full max-w-md text-[#1A1A44]"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Join vibeTUBE</h2>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full mb-4 p-3 rounded-lg bg-white/60 placeholder-gray-700 outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mb-4 p-3 rounded-lg bg-white/60 placeholder-gray-700 outline-none"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full mb-4 p-3 rounded-lg bg-white/60 placeholder-gray-700 outline-none"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full mb-6 p-3 rounded-lg bg-white/60 placeholder-gray-700 outline-none"
          />
          <div className="flex flex-col items-center gap-4 mb-6">
            <div
              onClick={handleAvatarClick}
              className="w-full max-w-md cursor-pointer rounded-lg border-2 border-dashed border-gray-700 bg-white/60 p-6 text-center shadow-sm hover:border-blue-400 hover:bg-blue-50 transition"
            >
              <p className="text-gray-600 text-m">Avatar</p>
              <p className="text-gray-600 text-sm">
                Click to upload or drag & drop
              </p>
              <p className="text-gray-400 text-xs mt-1">
                PNG, JPG, etc. up to 10MB
              </p>
            </div>
            <input
              type="file"
              ref={avatarInputRef}
              accept="image/*"
              name="avatar"
              onChange={handleChange}
              className="hidden"
            />
            {preview.avatar && (
              <img
                src={preview.avatar}
                alt="Avatar Preview"
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
              />
            )}
          </div>
          <div className="flex flex-col items-center gap-4 mb-6">
            <div
              onClick={handleCoverClick}
              className="w-full max-w-md cursor-pointer rounded-lg border-2 border-dashed border-gray-700 bg-white/60 p-6 text-center shadow-sm hover:border-blue-400 hover:bg-blue-50 transition"
            >
              <p className="text-gray-600 text-m">Cover Image</p>
              <p className="text-gray-600 text-sm">
                Click to upload or drag & drop
              </p>
              <p className="text-gray-400 text-xs mt-1">
                PNG, JPG, etc. up to 10MB
              </p>
            </div>
            <input
              type="file"
              ref={coverInputRef}
              accept="image/*"
              name="coverImage"
              onChange={handleChange}
              className="hidden"
            />
            {preview.coverImage && (
              <img
                src={preview.coverImage}
                alt="Cover Preview"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#1A1A44] text-white py-3 rounded-lg font-semibold hover:bg-[#333366] transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
