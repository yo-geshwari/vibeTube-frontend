import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";

export default function UploadVid() {
  const location = useLocation();
  const { userId, accessToken } = location.state || {};

  useEffect(() => {
    console.log("userId:", userId);
    console.log("accessToken:", accessToken);
  }, [userId, accessToken]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  const handleVideoSelect = (file) => {
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleThumbnailSelect = (file) => {
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleVideoDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleVideoSelect(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title || !description || !videoFile || !thumbnailFile) {
      setError("All fields are required.");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("videoFile", videoFile);
    data.append("thumbnail", thumbnailFile);

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/videos/publish`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true
        }
      );
      alert("Upload successful");
      console.log(res.data);
      // Reset
      setTitle("");
      setDescription("");
      setVideoFile(null);
      setVideoPreview(null);
      setThumbnailFile(null);
      setThumbnailPreview(null);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar register={false} login={false} home={true} logout={true}/>
      <div className="flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Upload Video</h2>

          {/* Video Preview / Drag & Drop */}
          <div
            className="w-full aspect-video bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 cursor-pointer hover:border-blue-400 transition-all"
            onClick={() => videoInputRef.current?.click()}
            onDrop={handleVideoDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {videoPreview ? (
              <video
                src={videoPreview}
                className="w-full h-full object-contain rounded-lg"
                controls
              />
            ) : (
              <span>Click or drag and drop video here</span>
            )}
            <input
              type="file"
              accept="video/*"
              hidden
              ref={videoInputRef}
              onChange={(e) => {
                if (e.target.files?.[0]) handleVideoSelect(e.target.files[0]);
              }}
            />
          </div>

          {/* Thumbnail + Title/Description */}
          <div className="mt-6 flex flex-col md:flex-row gap-6">
            {/* Thumbnail */}
            <div
              className="flex-shrink-0 w-full md:w-48 h-32 border rounded-md bg-gray-100 flex items-center justify-center text-sm text-gray-400 cursor-pointer hover:border-blue-400 transition"
              onClick={() => thumbnailInputRef.current?.click()}
            >
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <span>Thumbnail</span>
              )}
              <input
                type="file"
                accept="image/*"
                hidden
                ref={thumbnailInputRef}
                onChange={(e) => {
                  if (e.target.files?.[0])
                    handleThumbnailSelect(e.target.files[0]);
                }}
              />
            </div>

            {/* Title and Description */}
            <div className="flex-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full px-4 py-2 border rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
