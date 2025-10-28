
import './App.css'
import { AiOutlineSpotify } from 'react-icons/ai';
import { MdHomeFilled } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { BsCollection } from 'react-icons/bs';
import { useRef, useState } from 'react';
import { FaCloudArrowDown } from 'react-icons/fa6';
import { FaPlay } from 'react-icons/fa';

function App() {
  const inputref = useRef()
  const [isFocused,setIsFocused] = useState(false)


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
          <div onClick={()=>{inputref.current.focus()}} className={`text-white text-3xl bg-white/20 p-4 w-[400px] rounded-full flex gap-3 h-12 items-center justify-between ${isFocused ? "outline-2" : ""}`}>
            <FiSearch />
            <input ref={inputref} onFocus={()=>{setIsFocused(true)}} onBlur={()=>{setIsFocused(false)}} type="text" className='text-sm outline-none w-full' />
            <BsCollection />
          </div>
          <div className="ml-auto flex items-center text-white/70 gap-5 font-bold">
            <div className="hover:scale-105 hover:text-white">Premium</div>
            <div className="hover:scale-105 hover:text-white">Support</div>
            <div className="hover:scale-105 hover:text-white">Download</div>
            <div className="hover:scale-105 hover:text-white">|</div>
            <div className="hover:scale-105 hover:text-white flex gap-3 items-center"><FaCloudArrowDown /> Install App</div>
            <div className="hover:scale-105 hover:text-white">Signup</div>
            <div className="hover:scale-105 bg-white text-black p-3 rounded-4xl">Login</div>
          </div>

        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-5 ml-3 gap-6">
          <div className="text-white rounded-xl p-4 bg-gray-800 relative">
            <img src="/song1.jpeg" alt="" className='h-48 w-48 object-cover rounded-2xl' />
            <div className="font-bold text-2xl mt-2">Vizhi Veekura</div>
            <div className="font-thin">Sai Abhyankkar</div>
            <div className="absolute right-4 bottom-4 text-2xl bg-green-600 rounded-full w-12 h-12 flex items-center pl-3"><FaPlay /></div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
