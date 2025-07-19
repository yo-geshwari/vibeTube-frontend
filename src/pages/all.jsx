import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

export const All = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVideos = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/videos/search`,
        { withCredentials: true }
      );

      const { videos, totalPages } = res.data.data;
      setVideos(videos || []);
      setTotalPages(totalPages || 1);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  return (
    <div>
        <Navbar login={false} register={false} home={true} explore={false}/>
    <div className="p-4 max-w-6xl mx-auto">

      {loading ? (
        <p className="text-center">Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-center">No videos found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Link
                to={`/watch/${video._id}`}
                key={video._id}
                className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition"
              >
                <img
                  src={video.thumbnail || "/placeholder.png"}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="mt-2 font-semibold text-lg">{video.title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {video.description?.slice(0, 60)}...
                </p>
                <p className="text-xs text-gray-400 mt-1">Views: {video.views}</p>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="fixed bottom-0 left-0 w-full flex justify-center z-50 bg-white">
          <div className="flex justify-center mb-6 gap-4">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="self-center text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default All;