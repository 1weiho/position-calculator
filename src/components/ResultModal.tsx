import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import LabelPrice from "./LabelPrice";
import ProfitLossDescription from "./ProfitLossDescription";
import { X } from "lucide-react";

type inputData = {
  longOrShort: "long" | "short";
  maxLoss: number;
  enterPrice: number;
  leverage: number;
  slPrice: number;
  tpPrice: number;
};

const calculateSecurityValue = (
  longOrShort: "long" | "short",
  enterPrice: number,
  slPrice: number,
  maxLoss: number,
  leverage: number
) => {
  let sl;
  if (longOrShort === "long") {
    sl = (enterPrice - slPrice) / enterPrice;
  } else {
    sl = (slPrice - enterPrice) / enterPrice;
  }
  let value = maxLoss / sl;
  let security = Math.round((value / leverage) * 100) / 100;
  return security;
};

type SlAndTpDescription = {
  profitLossAmount: number;
  roi: number;
};

const calculateSl = (
  security: number,
  leverage: number,
  enterPrice: number,
  stopLossPrice: number
): SlAndTpDescription => {
  const roi = (enterPrice - stopLossPrice) / enterPrice;
  return {
    profitLossAmount: Math.abs(security * leverage * roi),
    roi: -Math.abs(roi * leverage),
  };
};

const calculateTp = (
  security: number,
  leverage: number,
  enterPrice: number,
  takeProfitPrice: number
): SlAndTpDescription => {
  const roi = Math.abs((takeProfitPrice - enterPrice) / enterPrice);
  return {
    profitLossAmount: security * leverage * roi,
    roi: Math.abs(roi * leverage),
  };
};

const ResultModal = (Props: {
  isOpen: boolean;
  closeModal: () => void;
  inputData: inputData;
}) => {
  const security: number = calculateSecurityValue(
    Props.inputData.longOrShort,
    Props.inputData.enterPrice,
    Props.inputData.slPrice,
    Props.inputData.maxLoss,
    Props.inputData.leverage
  );

  const tp: SlAndTpDescription = calculateTp(
    security,
    Props.inputData.leverage,
    Props.inputData.enterPrice,
    Props.inputData.tpPrice
  );

  const sl: SlAndTpDescription = calculateSl(
    security,
    Props.inputData.leverage,
    Props.inputData.enterPrice,
    Props.inputData.slPrice
  );

  return (
    <>
      <Transition appear show={Props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={Props.closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="flex w-full justify-between">
                    <label className="bg-nord9 px-2 py-1 rounded-lg tracking-widest text-white text-xs flex justify-center items-center">
                      做{Props.inputData.longOrShort === "long" ? "多" : "空"}{" "}
                      {Props.inputData.leverage}x
                    </label>
                    <X onClick={Props.closeModal} />
                  </Dialog.Title>
                  <div className="mt-4 w-full flex justify-between">
                    <div className="w-1/2">
                      <LabelPrice
                        label="保證金（USDT）"
                        price={security}
                        priceNordColor={true}
                      />
                    </div>
                    <div className="w-1/2">
                      <LabelPrice
                        label="入場價格（USDT）"
                        price={Props.inputData.enterPrice}
                        priceNordColor={false}
                      />
                    </div>
                  </div>
                  <div className="mt-4 w-full flex justify-between">
                    <div>
                      <LabelPrice
                        label="止盈（USDT）"
                        price={Props.inputData.tpPrice}
                        priceNordColor={false}
                      />
                      <ProfitLossDescription
                        type="profit"
                        profitLossAmount={tp.profitLossAmount}
                        roi={tp.roi}
                      />
                    </div>
                  </div>
                  <div className="mt-4 w-full flex justify-between">
                    <div>
                      <LabelPrice
                        label="止損（USDT）"
                        price={Props.inputData.slPrice}
                        priceNordColor={false}
                      />
                      <ProfitLossDescription
                        type="loss"
                        profitLossAmount={sl.profitLossAmount}
                        roi={sl.roi}
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ResultModal;
