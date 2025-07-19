export default function ProfileNav({ coverImage, avatar }) {
    return (
        <div className="relative w-full">
            {/* Cover Image */}
            <img src={coverImage} alt="Cover" className="w-full h-60 object-cover" />

            {/* Avatar overlapping at ~1/5th from left */}
            <div className="absolute bottom-[-6rem] left-[10%] z-10">
                <img
                    src={avatar}
                    alt="Avatar"
                    className="w-48 h-48 rounded-full border-4 border-white shadow-lg object-cover"
                />
            </div>
        </div>
    );
}
