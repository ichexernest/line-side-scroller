// ResultPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // 從 state 取得遊戲結果，若沒有則給預設值
  const { score = { prop1: 0, prop2: 0 }, lives = 0 } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-100">
      <h1 className="text-3xl font-bold mb-4">遊戲結果</h1>
      <p className="mb-2">道具1 獲得數量: {score.prop1}</p>
      <p className="mb-2">道具2 獲得數量: {score.prop2}</p>
      <p className="mb-4">剩餘生命: {lives}</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-green-500 text-white rounded-lg"
      >
        回首頁
      </button>
    </div>
  );
}

export default ResultPage;
