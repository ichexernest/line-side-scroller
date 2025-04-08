// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGE_PATHS } from '../config/gameConfig';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FCB1B2]"
    style={{
      backgroundImage: `url(${IMAGE_PATHS.bg})`,
    }}>
      <img src={IMAGE_PATHS.start} className='w-[350px] h-auto my-5' alt="" />
      <button
        onClick={() => navigate('/game')}
        className="p-6  mt-5 font-bold text-3xl bg-red-400 text-white rounded-lg"
      >
        開始挑戰！
      </button>
    </div>
  );
}

export default HomePage;
