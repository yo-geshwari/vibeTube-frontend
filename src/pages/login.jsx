import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LiquidChrome from "../components/LiquidChrome";
import Navbar from "../components/navbar";

export default function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/users/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res.data);
      alert("Login successful");

      navigate('/profile', {
      state: {
        coverImage: res.data.data.user.coverImage,
        avatar: res.data.data.user.avatar,
        username: res.data.data.user.username,
        fullName: res.data.data.user.fullName,
        SubCount: res.data.data.user.subscribers?.length ?? 0,
        subscribed: res.data.data.user.subscribed?.length ?? 0,
        userId: res.data.data.user._id,
        accessToken: res.data.data.accessToken,
        refreshToken: res.data.data.refreshToken
      }
    });
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Navbar stays on top */}
      <Navbar register={false} login={false} home={true} />

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
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email / Username"
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
          <button
            type="submit"
            className="w-full bg-[#1A1A44] text-white py-3 rounded-lg font-semibold hover:bg-[#333366] transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
