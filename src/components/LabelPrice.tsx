const LabelPrice = (Props: { label: string; price: number; nord: boolean }) => {
  return (
    <>
      <label className="text-nord3 text-xs">{Props.label}</label>
      <p
        className={
          Props.nord
            ? "text-nord8"
            : "text-nord3" + " text-xl tracking-widest font-bold"
        }
      >
        {Props.price}
      </p>
    </>
  );
};

export default LabelPrice;
