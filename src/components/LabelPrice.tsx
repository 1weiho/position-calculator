const LabelPrice = (Props: {
  label: string;
  price: number;
  priceNordColor: boolean;
}) => {
  return (
    <>
      <label className="text-nord3 text-xs">{Props.label}</label>
      <p
        className={
          (Props.priceNordColor ? "text-nord8" : "text-nord3") +
          " text-xl tracking-widest font-bold"
        }
      >
        {Props.price.toLocaleString()}
      </p>
    </>
  );
};

export default LabelPrice;
