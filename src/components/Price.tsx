function Price({ currency, num, numSize }: any) {
  return (
    <>
      {currency}
      <span className={numSize}>{num}</span>
    </>
  );
}

export default Price;
