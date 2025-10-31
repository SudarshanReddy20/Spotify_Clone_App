import "./App.css";
import { AiOutlineSpotify } from "react-icons/ai";
import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { BsCollection } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { FaCloudArrowDown } from "react-icons/fa6";
import {
  FaPlay,
  FaPause,
  FaRandom,
  FaStepBackward,
  FaStepForward,
  FaRedo,
  FaVolumeUp,
} from "react-icons/fa";

function App() {
  const inputref = useRef();
  const audioRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playingSongId, setPlayingSongId] = useState(false);
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if(!audio) return;
    const updateProgress = () => {
      setProgress(audio.currentTime)
      setDuration(audio.duration || 0)
    }
    const handleEnded = () => {
      if(repeatMode === 'one'){
        audio.currentTime = 0
        audio.play()
      }
      else if(repeatMode == 'all'){
        handleNext()
      }
      else{
        setPlayingSongId(null)
      }
    }
    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateProgress)
    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateProgress)
      audio.removeEventListener('ended', handleEnded)
    }
  },[])

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value)
    audioRef.current.currentTime = newTime
    setProgress(newTime)
  }

  const songs = [
    {
      id: 1,
      title: "Vizhi Veekura",
      artist: "Sai Abhyankkar",
      image: "Songs/images/song1.jpeg",
      audio: "Songs/audios/song1.mp3",
    },
    {
      id: 2,
      title: "Our Cycle",
      artist: "Govind Vasantha",
      image: "Songs/images/song2.jpg",
      audio: "Songs/audios/song2.m4a",
    },
    {
      id: 3,
      title: "Oorum Blood",
      artist: "Sai Abhyankkar",
      image: "Songs/images/song3.jpg",
      audio: "Songs/audios/song3.m4a",
    },
  ];

  const song = songs.find((song) => song.id == playingSongId);
  const togglePlay = (id) => {
    if (isPaused) {
      setIsPaused(false);
      audioRef.current.pause();
    } else {
      setIsPaused(true);
      const song = songs.find((song) => song.id == id);
      audioRef.current.src = song.audio;
      audioRef.current.play();
      setPlayingSongId(id);
    }
  };

  const handlePrevious = ()=>{
    if(songs.length === 0) return;
    const currentIndex = songs.findIndex(s => s.id == playingSongId)
    const prevIndex = currentIndex <= 0 ? songs.length - 1 : currentIndex - 1;
    const prevSong = songs[prevIndex];
    setPlayingSongId(prevSong.id);
    audioRef.current.src = prevSong.audio
    audioRef.current.play()
    setIsPaused(true);
  }

  const handleNext = ()=>{
    const currentIndex = songs.findIndex(song => song.id == playingSongId)
    const nextIndex = currentIndex == songs.length - 1 ? 0 : currentIndex + 1;
    const nextSong = songs[nextIndex];
    setPlayingSongId(nextSong.id)
    audioRef.current.src = nextSong.audio
    audioRef.current.play();
    setIsPaused(true);
  }

 

  return (
    <>
      <div className="min-h-screen bg-black">
        <div className="flex gap-4 p-3 items-center">
          <div className="text-white text-3xl bg-white/20 p-4 rounded-full">
            <AiOutlineSpotify />
          </div>
          <div className="text-white text-3xl bg-white/20 p-4 rounded-full">
            <MdHomeFilled />
          </div>
          <div
            onClick={() => {
              inputref.current.focus();
            }}
            className={`text-white text-3xl bg-white/20 p-4 w-[400px] rounded-full flex gap-3 h-12 items-center justify-between ${
              isFocused ? "outline-2" : ""
            }`}
          >
            <FiSearch />
            <input
              ref={inputref}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                setIsFocused(false);
              }}
              type="text"
              className="text-sm outline-none w-full"
            />
            <BsCollection />
          </div>
          <div className="ml-auto flex items-center text-white/70 gap-5 font-bold">
            <div className="hover:scale-105 hover:text-white">Premium</div>
            <div className="hover:scale-105 hover:text-white">Support</div>
            <div className="hover:scale-105 hover:text-white">Download</div>
            <div className="hover:scale-105 hover:text-white">|</div>
            <div className="hover:scale-105 hover:text-white flex gap-3 items-center">
              <FaCloudArrowDown /> Install App
            </div>
            <div className="hover:scale-105 hover:text-white">Signup</div>
            <div className="hover:scale-105 bg-white text-black p-3 rounded-4xl">
              Login
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-5 ml-3 gap-6">
          {songs.map((song) => (
            <div
              key={song.id}
              className="text-white rounded-xl p-6 bg-gray-800 relative"
            >
              <audio ref={audioRef}></audio>
              <img
                src={song.image}
                alt=""
                className="h-48 w-48 object-cover rounded-2xl"
              />
              <div className="font-bold text-2xl mt-2">{song.title}</div>
              <div className="font-thin">{song.artist}</div>
              <div
                onClick={() => togglePlay(song.id)}
                className="absolute right-4 bottom-4 text-2xl bg-green-600 rounded-full w-12 h-12 flex items-center pl-3"
              >
                {playingSongId === song.id && isPaused ? (
                  <FaPause />
                ) : (
                  <FaPlay />
                )}
              </div>
            </div>
          ))}
        </div>
        {song && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
            <div className="flex items-center justify-between min-w-screen">
              <div className="flex items-center min-w-[180px] w-[30%]">
                <img
                  src={song?.image || ""}
                  alt=""
                  className="h-14 w-14 object-cover rounded-md mr-3"
                />
                <div className="overflow-hidden">
                  <div className="text-sm font-semibold truncate">
                    {song?.title}
                  </div>
                  <div className="font-light text-xs text-gray-400 truncate">
                    {song?.artist}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-1 max-w-[40%] flex-col">
                <div className="flex items-center gap-4 mb-2">
                  <button className="text-gray-400 text-2xl">
                    <FaRandom size={16} />
                  </button>
                  <button className="text-gray-400 text-2xl" onClick={handlePrevious}>
                    <FaStepBackward size={16} />
                  </button>
                  <button className="text-gray-400 text-2xl" onClick={() => togglePlay(playingSongId)}>
                    {isPaused ? (<FaPause/>) : (<FaPlay/>)}
                  </button>
                  <button className="text-gray-400 text-2xl" onClick={handleNext}>
                    <FaStepForward size={16} />
                  </button>
                  <button className="text-gray-400 text-2xl">
                    <FaRedo size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <span className="text-xs text-gray-400 min-w-10 text-right">
                    0:02
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={progress}
                    onChange={handleSeek}
                    className="flex-1 h-1 accent-green-500 cursor-pointer"
                  />
                  <span className="text-xs text-gray-400 min-w-10 text-right">
                    3:42
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 min-w-[180px] w-[30%] mr-10">
                <button className="text-gray-400 text-2xl">
                  <FaVolumeUp size={16} />
                </button>
                <input
                  type="range"
                  className="accent-green-500 h-1 w-24 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
