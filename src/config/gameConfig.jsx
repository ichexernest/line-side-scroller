export const gameConfig = {
  // 定義遊戲資源和基本設定
  images: {
    character: '/images/character.png', // 替換為您的角色圖片路徑
    obstacles: [
      '/images/obstacle1.png', // 替換為您的障礙物圖片路徑
    ],
    itemTypeA: '/images/coin.png', // 替換為您的金幣圖片路徑
    itemTypeB: '/images/gem.png', // 替換為您的寶石圖片路徑
    background: '/images/background.png', // 替換為您的背景圖片路徑
  },
  physics: {
    gravity: 0.8,
    jumpForce: -15,
  },
  scoring: {
    itemTypeAValue: 10, // 金幣分數
    itemTypeBValue: 20, // 寶石分數
  },
};