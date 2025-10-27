
import './App.css'
import { AiOutlineSpotify } from 'react-icons/ai';
import { MdHomeFilled } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { BsCollection } from 'react-icons/bs';

function App() {


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
          <div className="text-white text-3xl bg-white/20 p-4 rounded-full flex gap-3 h-12 items-center">
            <FiSearch />
            <input type="text" className='text-sm outline-none' />
            <BsCollection />
          </div>

        </div>

      </div>
    </>
  )
}

export default App
