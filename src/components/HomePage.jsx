// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-4">歡迎開始遊戲</h1>
      <button
        onClick={() => navigate('/game')}
        className="px-6 py-3 bg-green-500 text-white rounded-lg"
      >
        開始遊戲
      </button>
    </div>
  );
}

export default HomePage;
