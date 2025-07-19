export default function ProfileNav({ coverImage, avatar }) {
  return (
    <div className="relative w-full">
      {/* Cover Image */}
      <img
        src={coverImage}
        alt="Cover"
        className="w-full h-40 sm:h-60 md:h-72 object-cover"
      />

      {/* Avatar */}
      <div className="absolute bottom-[-3.5rem] left-1/2 sm:left-[10%] transform -translate-x-1/2 sm:translate-x-0 z-10">
        <img
          src={avatar}
          alt="Avatar"
          className="w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full border-4 border-white shadow-lg object-cover"
        />
      </div>
    </div>
  );
}
