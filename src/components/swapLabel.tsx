function SwapLabel({ text }: Readonly<{ text: string }>) {
  return (
    <span className="swap" data-text={text}>
      <span className="swap-inner">{text}</span>
    </span>
  );
}

export default SwapLabel;