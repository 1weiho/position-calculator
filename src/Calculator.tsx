import {
  Github,
  TrendingUp,
  TrendingDown,
  CalculatorIcon,
  X,
} from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function Calculator() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                      做多 100x
                    </label>
                    <X onClick={closeModal} />
                  </Dialog.Title>
                  <div className="mt-4 w-full flex justify-between">
                    <div className="w-1/2">
                      <label className="text-nord3 text-xs">
                        保證金（USDT）
                      </label>
                      <p className="text-nord8 text-xl tracking-widest font-bold">
                        1,000
                      </p>
                    </div>
                    <div className="w-1/2">
                      <label className="text-nord3 text-xs">
                        入場價格（USDT）
                      </label>
                      <p className="text-nord3 text-xl tracking-widest font-bold">
                        30,000
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 w-full flex justify-between">
                    <div>
                      <label className="text-nord3 text-xs">止盈（USDT）</label>
                      <p className="text-nord3 text-xl tracking-widest font-bold">
                        3,1000
                      </p>
                      <p className="text-nord3 text-xs tracking-widest">
                        預估獲利 <span className="text-nord8">30USDT</span>{" "}
                        回報率 <span className="text-nord8">+20.5%</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 w-full flex justify-between">
                    <div>
                      <label className="text-nord3 text-xs">止損（USDT）</label>
                      <p className="text-nord3 text-xl tracking-widest font-bold">
                        2,8000
                      </p>
                      <p className="text-nord3 text-xs tracking-widest">
                        預估獲利 <span className="text-nord11">30USDT</span>{" "}
                        回報率 <span className="text-nord11">+10.5%</span>
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="h-72 w-72 bg-gradient-to-r from-sky-500 to-sky-200 absolute rounded-full blur-3xl opacity-25 -left-28 -top-28 -z-10"></div>
      <div className="w-screen flex justify-end px-8 mt-6 mb-8 relative">
        <Github />
      </div>
      <div className="w-screen px-12 mb-6 space-y-2">
        <h1 className="text-nord0 font-black text-xl tracking-widest">
          合約倉位計算器
        </h1>
        <h2 className="text-nord3 text-xs tracking-widest">
          以最大承受風險來回推倉位保證金大小
        </h2>
      </div>
      <div className="w-screen px-20 flex justify-between mb-8">
        <button className="flex items-center justify-center space-x-2 text-white bg-nord9 px-5 py-3 rounded-lg">
          <TrendingUp className="h-4 w-4" />
          <p className="text-xs font-semibold">做 多</p>
        </button>
        <button className="flex items-center justify-center space-x-2 text-nord0 bg-none px-5 py-3 rounded-lg">
          <TrendingDown className="h-4 w-4" />
          <p className="text-xs font-semibold">做 空</p>
        </button>
      </div>
      <div className="w-screen flex flex-col px-14 space-y-5">
        <div className="space-y-1">
          <label className="text-nord3 text-xs tracking-widest">
            最高承受風險（USDT）
          </label>
          <input className="w-full bg-nord6 rounded-lg h-10" type="text" />
        </div>
        <div className="space-y-1">
          <label className="text-nord3 text-xs tracking-widest">
            入場價格（USDT）
          </label>
          <input className="w-full bg-nord6 rounded-lg h-10" type="text" />
        </div>
        <div className="space-y-1">
          <label className="text-nord3 text-xs tracking-widest">槓桿倍數</label>
          <input className="w-full bg-nord6 rounded-lg h-10" type="text" />
        </div>
        <div className="flex space-x-5">
          <div className="space-y-1">
            <label className="text-nord3 text-xs tracking-widest">
              止損價格（USDT）
            </label>
            <input className="w-full bg-nord6 rounded-lg h-10" type="text" />
          </div>
          <div className="space-y-1">
            <label className="text-nord3 text-xs tracking-widest">
              止盈價格（USDT）
            </label>
            <input className="w-full bg-nord6 rounded-lg h-10" type="text" />
          </div>
        </div>
        <button
          className="flex items-center space-x-2 text-white bg-nord7 px-5 py-3 rounded-lg justify-center"
          onClick={openModal}
        >
          <CalculatorIcon className="h-4 w-4" />
          <p className="text-xs font-semibold">計 算</p>
        </button>
      </div>
    </>
  );
}
