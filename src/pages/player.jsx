import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";

export default function Player() {
  const { state } = useLocation();
  const { videoId, accessToken } = state || {};

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/v1/videos/${videoId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        setVideo(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching video:", err);
        setLoading(false);
      }
    };

    if (videoId) fetchVideo();
  }, [videoId]);

  if (loading) {
    return (
    <div>
      <div>
          <Navbar login={false} register={false} home={true}/>
        </div>
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading video...</p>
      </div>
    </div>
    );
  }

  if (!video) {
    return (
      <div>
        <div>
          <Navbar login={false} register={false} home={true}/>
        </div>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500 text-lg">Video not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar login={false} register={false} home={true}/>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Video Player */}
        <div className="w-full bg-black rounded-lg shadow-lg overflow-hidden">
          <video
            src={video.videoFile}
            controls
            className="w-full h-[480px] object-contain"
          />
        </div>

        {/* Video Details */}
        <div className="mt-6 bg-white p-6 rounded shadow-sm">
          <h1 className="text-2xl font-semibold mb-2">{video.title}</h1>
          <p className="text-gray-700 mb-4">{video.description}</p>

          <div className="flex items-center justify-between flex-wrap text-sm text-gray-500">
            <span>{video.views} views</span>
            <span>{new Date(video.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Owner Info */}
          <div className="flex items-center mt-6">
            <img
              src={video.owner?.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <span className="text-gray-800 font-medium">
              {video.owner?.username}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
