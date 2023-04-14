import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import LabelPrice from "./LabelPrice";
import ProfitLossDescription from "./ProfitLossDescription";
import { X } from "lucide-react";
import { ProfitLossSummary } from "../utils/positionCalculator";

type inputData = {
  longOrShort: "long" | "short";
  maxLoss: number;
  enterPrice: number;
  leverage: number;
  slPrice: number;
  tpPrice: number;
};

const ResultModal = (Props: {
  isOpen: boolean;
  closeModal: () => void;
  inputData: inputData;
  positionCost: number;
  tp: ProfitLossSummary;
  sl: ProfitLossSummary;
}) => {
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
                        label="持倉成本（USDT）"
                        price={Props.positionCost}
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
                        profitLossAmount={Props.tp.profitLossAmount}
                        roi={Props.tp.roi}
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
                        profitLossAmount={Props.sl.profitLossAmount}
                        roi={Props.sl.roi}
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
