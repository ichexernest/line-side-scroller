// GamePage.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GamePage() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const requestRef = useRef();
  const startTimeRef = useRef(null);

  // 將遊戲狀態存放在 ref 中，避免因頻繁更新 useState 而觸發重渲染
  const gameStateRef = useRef({
    player: { x: 50, y: 500, width: 50, height: 50, vy: 0 },
    obstacles: [],
    items: [],
    spawnCounter: 0,
    score: { prop1: 0, prop2: 0 },
    lives: 3,
  });

  const [jumping, setJumping] = useState(false);
  const gravity = 0.15;
  const jumpPower = -8;

  // 輔助函式：預先載入圖片，回傳 Promise 陣列
  const loadImages = (sources) => {
    const promises = sources.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`圖片載入失敗: ${src}`));
      });
    });
    return Promise.all(promises);
  };

  useEffect(() => {
    let isMounted = true; // 防止組件卸載後還在執行
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 預先載入圖片
    loadImages([
      '/assets/player.png',
      '/assets/background.png',
      '/assets/obstacle.png',
      '/assets/item1.png',
      '/assets/item2.png'
    ])
      .then(([playerImg, bgImg, obstacleImg, item1Img, item2Img]) => {
        if (!isMounted) return;

        // 生成障礙物與道具函數
        const spawnObstacle = () => {
          gameStateRef.current.obstacles.push({ x: canvas.width, y: 500, width: 50, height: 50 });
        };
        const spawnItem = (type) => {
          gameStateRef.current.items.push({ x: canvas.width, y:  500 - Math.random() *150, width: 30, height: 30, type });
        };

        // 遊戲主迴圈
        const gameLoop = (timestamp) => {
          if (!startTimeRef.current) startTimeRef.current = timestamp;
          const elapsed = timestamp - startTimeRef.current;
          if (elapsed > 30000) { // 遊戲 30 秒結束
            navigate('/result', { state: { score: gameStateRef.current.score, lives: gameStateRef.current.lives } });
            return;
          }

          // 清除畫布並繪製背景
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

          // 更新主角位置與物理效果
          const player = gameStateRef.current.player;
          player.vy += gravity;
          player.y += player.vy;
          if (player.y > 500) {
            player.y = 500;
            player.vy = 0;
            setJumping(false); // 結束跳躍狀態
          }
          ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

          // 每隔一定時間生成障礙物與道具
          gameStateRef.current.spawnCounter++;
          if (gameStateRef.current.spawnCounter % 200 === 0) {
            Math.random() < 0.5 && spawnObstacle();
          }
          if (gameStateRef.current.spawnCounter % 50 === 0 ) {
            if(gameStateRef.current.spawnCounter % 200 !== 0){
              Math.random() < 0.5 ? spawnItem('prop1') : spawnItem('prop2');
            }
          }

          // 更新並繪製障礙物，進行碰撞檢測
          gameStateRef.current.obstacles = gameStateRef.current.obstacles.filter((obs) => {
            obs.x -= 2;
            ctx.drawImage(obstacleImg, obs.x, obs.y, obs.width, obs.height);
            if (
              player.x < obs.x + obs.width &&
              player.x + player.width > obs.x &&
              player.y < obs.y + obs.height &&
              player.y + player.height > obs.y
            ) {
              gameStateRef.current.lives--;
              return false; // 移除碰撞到的障礙物
            }
            return obs.x + obs.width > 0;
          });

          // 更新並繪製道具，進行收集檢測
          gameStateRef.current.items = gameStateRef.current.items.filter((item) => {
            item.x -= 2;
            if (item.type === 'prop1') {
              ctx.drawImage(item1Img, item.x, item.y, item.width, item.height);
            } else {
              ctx.drawImage(item2Img, item.x, item.y, item.width, item.height);
            }
            if (
              player.x < item.x + item.width &&
              player.x + player.width > item.x &&
              player.y < item.y + item.height &&
              player.y + player.height > item.y
            ) {
              if (item.type === 'prop1') gameStateRef.current.score.prop1++;
              else gameStateRef.current.score.prop2++;
              return false; // 收集後移除該道具
            }
            return item.x + item.width > 0;
          });

          // 檢查生命數是否歸零
          if (gameStateRef.current.lives <= 0) {
            navigate('/result', { state: { score: gameStateRef.current.score, lives: gameStateRef.current.lives } });
            return;
          }

          // 顯示分數與生命數
          ctx.fillStyle = 'black';
          ctx.font = '20px Arial';
          ctx.fillText(
            `道具1: ${gameStateRef.current.score.prop1}  道具2: ${gameStateRef.current.score.prop2}  生命: ${gameStateRef.current.lives}`,
            10,
            30
          );

          requestRef.current = requestAnimationFrame(gameLoop);
        };

        requestRef.current = requestAnimationFrame(gameLoop);
      })
      .catch((error) => {
        console.error(error);
      });

    // 清理機制：組件卸載時取消動畫更新
    return () => {
      isMounted = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [navigate]);

  // 起跳事件：直接更新 gameStateRef 中的主角垂直速度
  const handleJump = () => {
    if (!jumping) {
      setJumping(true);
      gameStateRef.current.player.vy = jumpPower;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <canvas ref={canvasRef} width="400" height="600" className="border bg-white" />
      <button onClick={handleJump} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        起跳
      </button>
    </div>
  );
}

export default GamePage;
