import { TFilterOption } from "components/common/Filters";

export const DiCTIONARIES: { [key: string]: any } = {
  orderStatusDic: {
    "0": "New",
    "1": "Partial Fill",
    "2": "Fill",
    "4": "Canceled",
    "6": "Pending Cancel",
    "8": "Rejected",
  },
  orderTypeDic: {
    "1": "Market",
    "2": "Limit",
    "3": "Stop",
  },
  orderSideDic: {
    B: "Buy",
    S: "Sell",
  },
};

export const filterOptions: TFilterOption[] = [
  { label: "Order, symbol...", name: "search", type: "search" },
  {
    label: "Side",
    name: "side",
    options: [
      { label: "All", value: "all" },
      { label: DiCTIONARIES.orderSideDic["B"], value: "B" },
      { label: DiCTIONARIES.orderSideDic["S"], value: "S" },
    ],
    type: "select",
  },
  {
    label: "Type",
    name: "orderType",
    options: [
      { label: "All", value: "all" },
      { label: DiCTIONARIES.orderTypeDic["1"], value: "1" },
      { label: DiCTIONARIES.orderTypeDic["2"], value: "2" },
      { label: DiCTIONARIES.orderTypeDic["3"], value: "3" },
    ],
    type: "select",
  },
  {
    label: "Status",
    name: "status",
    options: [
      { label: "All", value: "all" },
      { label: DiCTIONARIES.orderStatusDic["0"], value: "0" },
      { label: DiCTIONARIES.orderStatusDic["1"], value: "1" },
      { label: DiCTIONARIES.orderStatusDic["2"], value: "2" },
      { label: DiCTIONARIES.orderStatusDic["4"], value: "4" },
      { label: DiCTIONARIES.orderStatusDic["6"], value: "6" },
      { label: DiCTIONARIES.orderStatusDic["8"], value: "8" },
    ],
    type: "select",
  },
  {
    label: "From",
    name: "dateRange",
    type: "dateRange",
    dateEndLabel: "To",
    dateStartLabel: "From",
  },
];

export const defaultValue = "---";

export const ACTIVITY_OPTIONS: { [key: string]: string[] } = {
  ALL: [],
  TRADES: ["SPUR", "SSAL"],
  WITHDRAWALS_AND_DEPOSITS: ["CSR", "CSD"],
  DIVIDENDS_AND_INTERESTS: ["DIV", "INT"],
  OTHERS: ["DIVTAX", "FEE", "COMM"],
};

export const MONTHS_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
