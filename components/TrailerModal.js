import ReactPlayer from "react-player/lazy";
import { XIcon } from "@heroicons/react/solid";

const TrailerModal = ({ showPlayer, result, index, setShowPlayer }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_YOUTUBE_BASE_URL;
  console.log("BASE_URL", BASE_URL);
  return (
    <>
      {showPlayer && (
        <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50"></div>
      )}
      <div
        className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden 
                        transition duration-1000 
                        ${showPlayer ? "opacity-100 z-50" : "opacity-0"} 
                      `}
      >
        <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
          <span className="font-semibold">Play Trailer</span>
          <div
            className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
            onClick={() => setShowPlayer(false)}
          >
            <XIcon className="h-5" />
          </div>
        </div>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`${BASE_URL}${result.videos?.results[index]?.key}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            controls={true}
            playing={showPlayer}
          />
        </div>
      </div>
    </>
  );
};

export default TrailerModal;
