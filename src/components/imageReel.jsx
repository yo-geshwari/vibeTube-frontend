
const images = [
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
];

export default function ImageReel() {
  return (
    <div className="overflow-hidden w-full h-100 relative">
      <div className="flex w-max animate-scroll whitespace-nowrap">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            className="h-40 w-auto object-cover mx-2 rounded-xl"
            alt={`img-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
