export interface IAccountActivity {
  accountAmount: number;
  accountBalance: number;
  accountType: string;
  comment: string;
  dnb: false;
  feeBase: number;
  feeExchange: number;
  feeSec: number;
  feeTaf: number;
  feeXtraShares: number;
  fillPx: number;
  fillQty: number;
  finTranID: string;
  finTranTypeID: string;
  sendCommissionToInteliclear: false;
  systemAmount: number;
  tranAmount: number;
  tranSource: string;
  tranWhen: string;
  wlpAmount: number;
  wlpFinTranTypeID: string;
}

export interface IAccountStatement {
  fileKey: string;
  displayName: string;
  _id: string;
}
