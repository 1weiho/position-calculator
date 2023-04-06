import { TrendingUp, TrendingDown } from "lucide-react";

const LongShortSwitch = (Props: {
  switchType: "long" | "short";
  longOrShort: "long" | "short";
  setLongOrShort: (longOrShort: "long" | "short") => void;
}) => {
  return (
    <>
      <button
        className={
          (Props.switchType === Props.longOrShort
            ? "bg-nord9 text-white "
            : "bg-none text-nord0 ") +
          "flex items-center justify-center space-x-2 px-7 py-3 rounded-lg duration-300 transition-color"
        }
        onClick={() => Props.setLongOrShort(Props.switchType)}
      >
        {Props.switchType === "long" ? (
          <TrendingUp className="h-4 w-4" />
        ) : (
          <TrendingDown className="h-4 w-4" />
        )}

        <p className="text-xs font-semibold">
          做 {Props.switchType === "long" ? "多" : "空"}
        </p>
      </button>
    </>
  );
};

export default LongShortSwitch;
