import { CalculatorIcon } from "lucide-react";
import { useState } from "react";
import ResultModal from "./components/ResultModal";
import Head from "./components/Head";
import LongShortSwitch from "./components/LongShortSwitch";

export default function Calculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [longOrShort, setLongOrShort] = useState<"long" | "short">("long");
  const [maxLoss, setMaxLoss] = useState<number>(0);
  const [enterPrice, setEnterPrice] = useState<number>(0);
  const [leverage, setLeverage] = useState<number>(1);
  const [slPrice, setSlPrice] = useState<number>(0);
  const [tpPrice, setTpPrice] = useState<number>(0);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <ResultModal
        isOpen={isOpen}
        closeModal={closeModal}
        inputData={{
          longOrShort: longOrShort,
          maxLoss: maxLoss,
          enterPrice: enterPrice,
          leverage: leverage,
          slPrice: slPrice,
          tpPrice: tpPrice,
        }}
      />
      <Head />
      <div className="w-screen px-14 flex justify-between mb-8">
        <LongShortSwitch
          switchType="long"
          longOrShort={longOrShort}
          setLongOrShort={setLongOrShort}
        />
        <LongShortSwitch
          switchType="short"
          longOrShort={longOrShort}
          setLongOrShort={setLongOrShort}
        />
      </div>
      <div className="w-screen flex flex-col px-14 space-y-5">
        <div className="space-y-1">
          <label className="text-nord3 text-xs tracking-widest">
            最高承受風險（USDT）
          </label>
          <input
            className="w-full bg-nord6 rounded-lg h-10 ps-4"
            type="text"
            onChange={(d) => setMaxLoss(Number(d.target.value))}
          />
        </div>
        <div className="space-y-1">
          <label className="text-nord3 text-xs tracking-widest">
            入場價格（USDT）
          </label>
          <input
            className="w-full bg-nord6 rounded-lg h-10 ps-4"
            type="text"
            onChange={(d) => setEnterPrice(Number(d.target.value))}
          />
        </div>
        <div className="space-y-1">
          <label className="text-nord3 text-xs tracking-widest">
            槓桿倍數（1 - 100）
          </label>
          <input
            className="w-full bg-nord6 rounded-lg h-10 ps-4"
            type="text"
            onChange={(d) => setLeverage(Number(d.target.value))}
          />
        </div>
        <div className="flex space-x-5">
          <div className="space-y-1">
            <label className="text-nord3 text-xs tracking-widest">
              止損價格（USDT）
            </label>
            <input
              className="w-full bg-nord6 rounded-lg h-10 ps-4"
              type="text"
              onChange={(d) => setSlPrice(Number(d.target.value))}
            />
          </div>
          <div className="space-y-1">
            <label className="text-nord3 text-xs tracking-widest">
              止盈價格（USDT）
            </label>
            <input
              className="w-full bg-nord6 rounded-lg h-10 ps-4"
              type="text"
              onChange={(d) => setTpPrice(Number(d.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-10 px-14">
        <button
          className="w-full flex items-center space-x-2 text-white bg-nord7 px-5 py-3 rounded-lg justify-center"
          onClick={openModal}
        >
          <CalculatorIcon className="h-4 w-4" />
          <p className="text-xs font-semibold">計 算</p>
        </button>
      </div>
    </>
  );
}
