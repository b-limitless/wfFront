export const isSharesRejected = (shares: number | string) => {
  let formatedShares = shares;
  if (typeof shares === "string") {
    formatedShares = +shares;
  }
  return formatedShares && formatedShares <= 0.000001;
};

export const isCashRejected = (amount: number | string) => {
  let formatedAmount = amount;
  if (typeof amount === "string") {
    formatedAmount = +amount;
  }
  return formatedAmount && formatedAmount <= 1;
};

export const isRemainingRejected = (
  bid: number,
  position: number,
  shares: number
) => {
  return shares && position !== shares && bid * (position - shares) <= 1;
};
