// ResultPage.jsx
import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IMAGE_PATHS } from '../config/gameConfig';

function ResultPage() {
  const [btnMessage, setBtnMessage] = useState("點我複製優惠碼到剪貼簿");
  const [canRetry, setCanRetry] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => setCanRetry(true), 2000);
  return () => clearTimeout(timer); // 清除定時器避免記憶體洩漏
}, []);

  const location = useLocation();
  const navigate = useNavigate();
  // 從 state 取得遊戲結果，若沒有則給預設值
  const { score = { prop1: 0, prop2: 0, prop3:0, prop4:0, prop5:0 }, lives = 0 } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FCB1B2] text-amber-950"
    style={{
      backgroundImage: `url(${IMAGE_PATHS.bg})`,
    }}>


      {
        lives > 0 ? (
          <>
          <img className='max-w-[350px] h-auto' src={(score.prop1+score.prop3+score.prop4 > score.prop2+score.prop4+score.prop5)? IMAGE_PATHS.success2:IMAGE_PATHS.success1} alt="" />
          <div className='flex w-[350px] gap-2 justify-between items-center p-3 m-3 bg-white rounded-2xl'>

          <div className='flex flex-col items-center justify-center'>
          <img className='max-w-[40px] h-auto' src={IMAGE_PATHS.items.prop1} alt="" />
          <p className="mb-2">{score.prop1}</p>
          </div>
          <div className='flex flex-col items-center justify-center'>
          <img className='max-w-[40px] h-auto'  src={IMAGE_PATHS.items.prop2} alt="" />
          <p className="mb-2">{score.prop2}</p>
</div>
<div className='flex flex-col items-center justify-center'>
<img className='max-w-[40px] h-auto' src={IMAGE_PATHS.items.prop3} alt="" />
<p className="mb-2">{score.prop3}</p>
</div>
<div className='flex flex-col items-center justify-center'>
<img className='max-w-[40px] h-auto' src={IMAGE_PATHS.items.prop4} alt="" />
<p className="mb-2">{score.prop4}</p>
</div>
<div className='flex flex-col items-center justify-center'>
<img className='max-w-[40px] h-auto' src={IMAGE_PATHS.items.prop5} alt="" />
<p className="mb-2">{score.prop5}</p>
</div>

          </div>
          <p>9折優惠碼，可用於所有商品：</p>
          <p className='font-bold text-2xl'>GOODMOTHERSDAY2025</p>
          <button className='text-md bg-white rounded-2xl shadow-2xl p-3 mt-3'   onClick={() => {
            navigator.clipboard.writeText("GOODMOTHERSDAY2025")
        .then(() => setBtnMessage("複製成功！"))
          .catch(() => alert("複製失敗 😢"));
    }}>{btnMessage}</button>
          <button
  onClick={() => window.location.href = "https://goodmoods.store/shop/"}
  className={`p-5 mt-5 font-bold text-3xl text-white rounded-lg transition-all duration-300 ${
    canRetry ? 'bg-amber-500 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
  }`}
  disabled={!canRetry}
>
  前往逛逛選購
</button>
          </>
        ) : (
          <img className='max-w-[350px] h-auto' src={IMAGE_PATHS.fail} alt="" />
        )
      }
<button
  onClick={() => canRetry && navigate('/')}
  className={`p-5 mt-3 font-bold text-3xl text-white rounded-lg transition-all duration-300 ${
    canRetry ? 'bg-red-400 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
  }`}
  disabled={!canRetry}
>
  再試一次！
</button>
    </div>
  );
}

export default ResultPage;
