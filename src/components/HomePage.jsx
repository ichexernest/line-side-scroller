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
      <h1 className="text-4xl font-bold mb-4">歡迎開始遊戲</h1>
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
