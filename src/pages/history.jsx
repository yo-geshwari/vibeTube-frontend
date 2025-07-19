import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";

export default function WatchHistory() {
  const { state } = useLocation();
  const { accessToken } = state || {};

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/v1/users/history`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        setVideos(res.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching video:", err);
        setLoading(false);
      }
    };

    if (accessToken) fetchVideo();
  }, [accessToken]);

  if (loading) {
    return (
      <div>
      <div>
          <Navbar login={false} register={false} home={true}/>
        </div>
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading videos...</p>
      </div>
    </div>
    );
  }

  if (!videos.length) {
    return (
      <div>
        <Navbar login={false} register={false} home={true} />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray text-lg">No videos found in history</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar login={false} register={false} home={true} logout={true}/>
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl font-semibold mb-4">Watch History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Link
              to={`/watch/${video._id}`}
              key={video._id}
              className="group cursor-pointer"
            >
              <div className="rounded-lg overflow-hidden shadow hover:shadow-md transition">
                <img
                  src={video.thumbnail?.url || "/default-thumbnail.jpg"}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="flex items-start gap-3 p-3">
                  <img
                    src={video.owner?.avatar?.url || "/default-avatar.jpg"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-sm line-clamp-2">
                      {video.title}
                    </h2>
                    <p className="text-gray-500 text-xs mt-1">
                      {video.owner?.username || "Unknown"}
                    </p>
                    <p className="text-gray-400 text-xs line-clamp-2 mt-1">
                      {video.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
