import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileNav from "../components/profileNav";
import Navbar from "../components/navbar";

export default function Profile() {
  const { state } = useLocation();
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  if (!state)
    return <p className="text-center mt-20 text-lg">Loading...</p>;

  const {
    coverImage,
    avatar,
    username,
    fullName,
    userId,
    accessToken,
    refreshToken,
  } = state;

  useEffect(() => {
    if (userId) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}api/v1/videos/search`, {
          params: {
            userId,
            page,
            limit: 6,
            sortBy: "createdAt",
            sortType: "desc",
          },
        })
        .then((res) => {
          const data = res.data.data;
          setVideos(data.videos || []);
          setTotalPages(data.totalPages || 1);
        })
        .catch((err) => {
          console.error("Error fetching videos:", err);
        });
    }
  }, [userId, page]);

  const getValidToken = async () => {
    if (!accessToken && refreshToken) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/refresh-token`,
          { refreshToken }
        );
        return res.data.data.accessToken;
      } catch (err) {
        console.error("Token refresh failed:", err);
        navigate("/login");
        return null;
      }
    }
    return accessToken;
  };

  const handleUploadClick = async () => {
    const token = await getValidToken();
    if (token) navigate("/upload", { state: { accessToken: token, userId } });
  };

  const handleVidClick = async (videoId) => {
    const token = await getValidToken();
    if (token) navigate("/player", { state: { videoId, accessToken: token } });
  };

  const handleWatchHistoryClick = async () => {
    const token = await getValidToken();
    if (token) navigate("/history", { state: { accessToken: token, userId } });
  };

  const handleExplore = () => {
    navigate("/all", { state: { accessToken } });
  };

  return (
    <>
      <Navbar register={false} login={false} home={true} logout={true} />
      <div className="w-full min-h-screen bg-gray-50">
        <ProfileNav coverImage={coverImage} avatar={avatar} />

        <div className="mt-24 px-4 sm:px-8 md:px-20">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col lg:flex-row justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
              <p className="text-gray-500 text-lg break-words">@{username}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleExplore}
                className="w-full sm:w-40 bg-[#A0E7E5] text-gray py-3 rounded-lg font-semibold hover:bg-[#d8faf9] transition-colors duration-200"
              >
                Explore the vibes!
              </button>
              <button
                onClick={handleUploadClick}
                className="w-full sm:w-40 bg-[#A0E7E5] text-gray py-3 rounded-lg font-semibold hover:bg-[#d8faf9] transition-colors duration-200"
              >
                Upload video
              </button>
              <button
                onClick={handleWatchHistoryClick}
                className="w-full sm:w-40 bg-[#A0E7E5] text-gray py-3 rounded-lg font-semibold hover:bg-[#d8faf9] transition-colors duration-200"
              >
                Watch History
              </button>
            </div>
          </div>

          <div className="mt-8 mb-8">
            <h2 className="text-xl font-bold mb-4">Uploaded Videos</h2>
            {videos.length === 0 ? (
              <p className="text-gray-600 mb-10">No videos uploaded yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div
                    key={video._id}
                    onClick={() => handleVidClick(video._id)}
                    className="border p-4 rounded shadow-sm bg-white cursor-pointer"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-40 object-cover rounded"
                    />
                    <h3 className="mt-2 font-medium break-words">{video.title}</h3>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-4 flex-wrap">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700 font-medium">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
