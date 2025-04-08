// gameConfig.js

export const PLAYER_SIZE = { width: 50, height: 90 };
export const GROUND_Y = 500;

export const MAX_LIVES = 5;
export const GAME_DURATION = 45; // 秒數

export const BAR = {
  width: 250,
  height: 20,
  lives: { x: 10, y: 60 },
  time: { x: 10, y: 90 },
};

export const ICON = {
  size: 35,
  margin: 10,
  top: 10,
};

export const ITEM_TYPES = ['prop1', 'prop2', 'prop3', 'prop4', 'prop5'];
export const OBSTACLE_TYPES = ['prop1', 'prop2', 'prop3'];

export const IMAGE_PATHS = {
  player: '/assets/player.png',
  playerJump: '/assets/player_jump.png',
  background: '/assets/background.png',
  obstacles: {
    prop1: '/assets/obstacle1.png',
    prop2: '/assets/obstacle2.png',
    prop3: '/assets/obstacle3.png',
  },
  items: {
    prop1: '/assets/item1.png',
    prop2: '/assets/item2.png',
    prop3: '/assets/item3.png',
    prop4: '/assets/item4.png',
    prop5: '/assets/item5.png',
  },
  life: '/assets/life.png',
  goal: '/assets/goal.png',
  success1: '/assets/successCard1.png',
  success2: '/assets/successCard2.png',
  fail: '/assets/failCard.png',
  bg: '/assets//bg-mtd.png',
  start: '/assets//start.png',
};