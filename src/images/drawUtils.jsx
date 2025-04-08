// drawUtils.js

/**
 * 畫條形圖（可用於血條、時間條）
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {number} ratio (0 ~ 1)
 * @param {string} color 
 * @param {string} borderColor 
 */
export function drawBar(ctx, x, y, width, height, ratio, color, borderColor = '#800010') {
  ctx.fillStyle = 'gray';
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = color;
  ctx.fillRect(x, y, ratio * width, height);

  ctx.strokeStyle = borderColor;
  ctx.strokeRect(x, y, width, height);
}

/**
 * 畫 icon + 數量
 * @param {CanvasRenderingContext2D} ctx 
 * @param {[Image, number][]} iconDataList
 * @param {{ size: number, margin: number, top: number }} config 
 */
export function drawIcons(ctx, iconDataList, config) {
  iconDataList.forEach(([icon, count], index) => {
    const x = 10 + index * (config.size + config.margin + 20);
    ctx.drawImage(icon, x, config.top, config.size, config.size);
    ctx.fillStyle = '#800010';
    ctx.font = '18px Arial';
    ctx.fillText(`x${count}`, x + config.size + 2, config.top + config.size - 5);
  });
}

/**
 * 畫出16-bit格子風格條（帶像素感漸層 + 左側素材圖）
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {number} ratio 
 * @param {string[]} gradientColors - 漸層用顏色陣列
 * @param {HTMLImageElement} icon - 左側圖標素材
 */
export function drawPixelBar(ctx, x, y, width, height, ratio, gradientColors, icon) {
  const segmentCount = 10;
  const segmentWidth = width / segmentCount;
  const filledCount = Math.floor(ratio * segmentCount);

  // 畫邊框背景
  ctx.fillStyle = '#3c3c3c';
  ctx.fillRect(x - 2, y - 2, width + 4, height + 4);

  for (let i = 0; i < segmentCount; i++) {
    const segX = x + i * segmentWidth;
    if (i < filledCount) {
      const grad = ctx.createLinearGradient(segX, y, segX + segmentWidth, y);
      gradientColors.forEach((color, index) => {
        grad.addColorStop(index / (gradientColors.length - 1), color);
      });
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = '#555';
    }
    ctx.fillRect(segX + 1, y + 1, segmentWidth - 2, height - 2);
  }

  // 外框亮線
  ctx.strokeStyle = '#ffffff';
  ctx.strokeRect(x - 1, y - 1, width + 2, height + 2);

  // 畫左側圖示
  if (icon) {
    ctx.drawImage(icon, x - height - 14, y - 4, height + 8, height + 8);
  }
}
