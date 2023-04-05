import { Github, TrendingUp, TrendingDown, Send } from "lucide-react";

export default function Calculator() {
  return (
    <>
      <div className="w-screen flex justify-end px-8 mt-8 mb-12 relative">
        <div className="h-96 w-96 bg-gradient-to-r from-sky-500 to-sky-200 absolute rounded-full blur-3xl opacity-40 left-0 top-0 -ml-40 -mt-40 -z-10"></div>
        <Github />
      </div>
      <div className="w-screen px-12 mb-12 space-y-2">
        <h1 className="text-nord0 font-black text-xl tracking-widest">合約倉位計算器</h1>
        <h2 className="text-nord3 text-xs tracking-widest">以最大承受風險來回推倉位保證金大小</h2>
      </div>
      <div className="w-screen px-20 flex justify-between mb-12">
        <button className="flex items-center justify-center space-x-2 text-white bg-nord9 px-5 py-3 rounded-lg">
          <TrendingUp className="h-4 w-4" />
          <p className="text-xs font-semibold">做 多</p>
        </button>
        <button className="flex items-center justify-center space-x-2 text-nord0 bg-none px-5 py-3 rounded-lg">
          <TrendingDown className="h-4 w-4" />
          <p className="text-xs font-semibold">做 多</p>
        </button>
      </div>
      <div className="w-screen flex flex-col px-14 space-y-7">
        <div className="space-y-1">
          <label className="text-nord3 text-xs tracking-widest">最高承受風險（USDT）</label>
          <input className="w-full bg-nord6 rounded-lg h-12" type="text" />
        </div>
        <div className="space-y-1">
          <label className="text-nord3 text-xs tracking-widest">最高承受風險（USDT）</label>
          <input className="w-full bg-nord6 rounded-lg h-12" type="text" />
        </div>
        <div className="space-y-1">
          <label className="text-nord3 text-xs tracking-widest">最高承受風險（USDT）</label>
          <input className="w-full bg-nord6 rounded-lg h-12" type="text" />
        </div>
        <div className="flex space-x-5">
          <div className="space-y-1">
            <label className="text-nord3 text-xs tracking-widest">止損價格（USDT）</label>
            <input className="w-full bg-nord6 rounded-lg h-12" type="text" />
          </div>
          <div className="space-y-1">
            <label className="text-nord3 text-xs tracking-widest">止盈價格（USDT）</label>
            <input className="w-full bg-nord6 rounded-lg h-12" type="text" />
          </div>
        </div>
        <button className="flex items-center space-x-2 text-white bg-nord7 px-5 py-3 rounded-lg justify-center">
          <Send className="h-4 w-4" />
          <p className="text-xs font-semibold">產 生</p>
        </button>
      </div>
    </>
  );
}
