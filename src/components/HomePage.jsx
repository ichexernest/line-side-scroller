import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGE_PATHS } from '../config/gameConfig';

function HomePage() {
  const navigate = useNavigate();
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = IMAGE_PATHS.bg;
    img.onload = () => {
      setBgLoaded(true);
    };
  }, []);

  if (!bgLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FCB1B2] text-white text-3xl font-bold animate-pulse">
        讀取中...
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-[#FCB1B2] transition-opacity duration-700"
      style={{
        backgroundImage: `url(${IMAGE_PATHS.bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <img src={IMAGE_PATHS.start} className="w-[350px] h-auto my-5" alt="" />
      <button
        onClick={() => navigate('/game')}
        className="p-6 mt-5 font-bold text-3xl bg-red-400 text-white rounded-lg"
      >
        開始挑戰！
      </button>
    </div>
  );
}

export default HomePage;
