export type EPriceType = "MARKET" | "STOP" | "LIMIT";

export type EOrderType = "BUY" | "SELL";

export type TOrderDetails = {
  cash?: number;
  shares: number;
  priceType: EPriceType;
  price?: number;
  wayToSend?: "cash" | "shares";
};
