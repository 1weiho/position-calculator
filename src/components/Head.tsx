import { Github } from "lucide-react";

const Head = () => {
  return (
    <>
      {/* FIX: Wrong color display on ios safari. */}
      {/* <div className="h-72 w-72 bg-gradient-to-r from-sky-500 to-sky-200 absolute rounded-full blur-3xl opacity-25 -left-28 -top-28 -z-10"></div> */}
      <div className="w-screen flex justify-end px-8 mt-6 mb-8 relative">
        <a href="https://github.com/davidho0403/position-calculator">
          <Github />
        </a>
      </div>
      <div className="w-screen px-12 mb-6 space-y-2">
        <h1 className="text-nord0 font-black text-xl tracking-widest">
          合約倉位計算器
        </h1>
        <h2 className="text-nord3 text-xs tracking-widest">
          以最大承受風險來回推倉位保證金大小
        </h2>
      </div>
    </>
  );
};

export default Head;
