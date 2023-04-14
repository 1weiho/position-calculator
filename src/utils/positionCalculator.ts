type SlAndTpDescription = {
  profitLossAmount: number;
  roi: number;
};

export const calculatePositionCost = (
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

export const calculateSl = (
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

export const calculateTp = (
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
