import { CalculatorIcon } from "lucide-react";
import { useState } from "react";
import ResultModal from "./components/ResultModal";
import Head from "./components/Head";
import LongShortSwitch from "./components/LongShortSwitch";
import { Toaster, toast } from "sonner";
import {
  ProfitLossSummary,
  calculatePositionCost,
  calculateSl,
  calculateTp,
} from "./utils/positionCalculator";

const handleErrorInput = (errMsg: string) => {
  toast.error(errMsg);
};

export default function Calculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [longOrShort, setLongOrShort] = useState<"long" | "short">("long");
  const [maxLoss, setMaxLoss] = useState<number>(0);
  const [enterPrice, setEnterPrice] = useState<number>(0);
  const [leverage, setLeverage] = useState<number>(0);
  const [slPrice, setSlPrice] = useState<number>(0);
  const [tpPrice, setTpPrice] = useState<number>(0);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmit = () => {
    if (maxLoss <= 0) {
      handleErrorInput("最高承受風險需大於 0");
      return;
    }
    if (enterPrice <= 0) {
      handleErrorInput("入場價格需大於 0");
      return;
    }
    if (leverage < 1 || leverage > 100) {
      handleErrorInput("杠桿需介於 1 ~ 100");
      return;
    }
    if (slPrice <= 0) {
      handleErrorInput("止損價格需大於 0");
      return;
    }
    if (tpPrice <= 0) {
      handleErrorInput("止盈價格需大於 0");
      return;
    }
    if (slPrice >= enterPrice && longOrShort === "long") {
      handleErrorInput("止損價格需小於入場價格");
      return;
    }
    if (slPrice <= enterPrice && longOrShort === "short") {
      handleErrorInput("止損價格需大於入場價格");
      return;
    }
    if (tpPrice <= enterPrice && longOrShort === "long") {
      handleErrorInput("止盈價格需大於入場價格");
      return;
    }
    if (tpPrice >= enterPrice && longOrShort === "short") {
      handleErrorInput("止盈價格需小於入場價格");
      return;
    }
    openModal();
  };

  const positionCost: number = calculatePositionCost(
    longOrShort,
    enterPrice,
    slPrice,
    maxLoss,
    leverage
  );

  const tp: ProfitLossSummary = calculateTp(
    positionCost,
    leverage,
    enterPrice,
    tpPrice
  );

  const sl: ProfitLossSummary = calculateSl(
    positionCost,
    leverage,
    enterPrice,
    slPrice
  );

  return (
    <>
      <Toaster position="top-center" duration={2000} richColors />
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
        positionCost={positionCost}
        tp={tp}
        sl={sl}
      />
      <Head />
      <div className="w-full px-14 flex justify-between mb-8">
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
      <div className="w-full flex flex-col px-14 space-y-5">
        <div className="space-y-1">
          <label className="text-nord3 text-xs tracking-widest">
            最高承受風險（USDT）
          </label>
          <input
            className="w-full bg-nord6 rounded-lg h-10 ps-4"
            type="number"
            onChange={(d) => setMaxLoss(Number(d.target.value))}
          />
        </div>
        <div className="space-y-1">
          <label className="text-nord3 text-xs tracking-widest">
            入場價格（USDT）
          </label>
          <input
            className="w-full bg-nord6 rounded-lg h-10 ps-4"
            type="number"
            onChange={(d) => setEnterPrice(Number(d.target.value))}
          />
        </div>
        <div className="space-y-1">
          <label className="text-nord3 text-xs tracking-widest">
            槓桿倍數（1 - 100）
          </label>
          <input
            className="w-full bg-nord6 rounded-lg h-10 ps-4"
            type="number"
            onChange={(d) => setLeverage(Number(d.target.value))}
          />
        </div>
        <div className="flex space-x-5 w-full">
          <div className="space-y-1 w-full">
            <label className="text-nord3 text-xs tracking-widest">
              止盈價格（USDT）
            </label>
            <input
              className="w-full bg-nord6 rounded-lg h-10 ps-4"
              type="number"
              onChange={(d) => setTpPrice(Number(d.target.value))}
            />
          </div>
          <div className="space-y-1 w-full">
            <label className="text-nord3 text-xs tracking-widest">
              止損價格（USDT）
            </label>
            <input
              className="w-full bg-nord6 rounded-lg h-10 ps-4"
              type="number"
              onChange={(d) => setSlPrice(Number(d.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-8 px-14">
        <button
          className="w-full flex items-center space-x-2 text-white bg-nord7 px-5 py-3 rounded-lg justify-center"
          onClick={handleSubmit}
        >
          <CalculatorIcon className="h-4 w-4" />
          <p className="text-xs font-semibold">計 算</p>
        </button>
      </div>
    </>
  );
}
