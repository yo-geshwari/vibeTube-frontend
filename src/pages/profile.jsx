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

  if (!state) return <p className="text-center mt-20 text-lg">Loading...</p>;

  const {
    coverImage,
    avatar,
    username,
    fullName,
    SubCount,
    subscribed,
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

  const navigate = useNavigate();

  const handleUploadClick = async () => {
    let token = accessToken;

    if (!token && refreshToken) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/refresh-token`,
          {
            refreshToken,
          }
        );
        token = res.data.data.accessToken;
      } catch (err) {
        console.error("Token refresh failed:", err);
        return navigate("/login"); // redirect to login on failure
      }
    }

    if (token) {
      navigate("/upload", {
        state: {
          accessToken: token,
          userId,
        },
      });
    } else {
      console.error("Failed");
      navigate("/login"); // fallback
    }
  };

  const handleVidClick = async (videoId) => {
    let token = accessToken;

    if (!token && refreshToken) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/refresh-token`,
          {
            refreshToken,
          }
        );
        token = res.data.data.accessToken;
      } catch (err) {
        console.error("Token refresh failed:", err);
        return navigate("/login"); // redirect to login on failure
      }
    }

    if (token) {
      navigate("/player", {
        state: {
          videoId,
          accessToken: token,
        },
      });
    } else {
      console.error("Failed");
      navigate("/login"); // fallback
    }
  };

  const handleWatchHistoryClick = async () => {
    let token = accessToken;

    if (!token && refreshToken) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/refresh-token`,
          {
            refreshToken,
          }
        );
        token = res.data.data.accessToken;
      } catch (err) {
        console.error("Token refresh failed:", err);
        return navigate("/login"); // redirect to login on failure
      }
    }

    if (token) {
      navigate("/history", {
        state: {
          accessToken: token,
          userId,
        },
      });
    } else {
      console.error("Failed");
      navigate("/login"); // fallback
    }
  };

  const handleExplore = () => {
    navigate('/all');
  }

  return (
    <>
      <Navbar register={false} login={false} home={true}/>
      <div className="w-full min-h-screen bg-gray-50">
        <ProfileNav coverImage={coverImage} avatar={avatar} />

        <div className="mt-24 px-8 md:px-20">
          <div className="bg-white rounded-xl shadow-md p-6 flex justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
              <p className="text-gray-500 text-lg">@{username}</p>
            </div>
            <div>
              <button
                onClick={handleExplore}
                className="w-40 mr-4 bg-[#A0E7E5] text-gray py-3 rounded-lg font-semibold hover:bg-[#d8faf9] transition-colors duration-200"
              >
                Explore the vibes!
              </button>
              <button
                onClick={handleUploadClick}
                className="w-40 mr-4 bg-[#A0E7E5] text-gray py-3 rounded-lg font-semibold hover:bg-[#d8faf9] transition-colors duration-200"
              >
                Upload video
              </button>
              <button
                onClick={handleWatchHistoryClick}
                className="w-40 bg-[#A0E7E5] text-gray py-3 rounded-lg font-semibold hover:bg-[#d8faf9] transition-colors duration-200"
              >
                Watch History
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mt-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1 text-center">
              <h3 className="text-xl font-semibold text-gray-700">
                Subscribers
              </h3>
              <p className="text-2xl font-bold text-gray-700">{SubCount}</p>
            </div>
            <div className="flex-1 text-center">
              <h3 className="text-xl font-semibold text-gray-700">
                Subscribed
              </h3>
              <p className="text-2xl font-bold text-gray-700">{subscribed}</p>
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
                    <h3 className="mt-2 font-medium">{video.title}</h3>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Buttons */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-4">
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

                <div className="bg-white rounded-xl shadow-md p-6 flex justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {fullName}
                    </h2>
                    <p className="text-gray-500 text-lg">@{username}</p>
                  </div>
                  <div>
                    <button
                      onClick={handleUploadClick}
                      className="w-40 bg-[#A0E7E5] text-gray py-3 rounded-lg font-semibold hover:bg-[#d8faf9] transition-colors duration-200"
                    >
                      Upload video
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 flex justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {fullName}
                    </h2>
                    <p className="text-gray-500 text-lg">@{username}</p>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}
