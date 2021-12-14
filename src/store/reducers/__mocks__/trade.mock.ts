export const accountSummary = {
  accountNo: "DWPH000003",
  tradingType: "CASH",
  cash: {
    cashAvailableForTrade: 143069.36,
    cashAvailableForWithdrawal: 143074.41,
    cashBalance: 143074.41,
  },
  equity: {
    equityValue: 128814.16,
    equityPositions: [
      {
        symbol: "AAPL",
        instrumentID: "a67422af-8504-43df-9e63-7361eb0bd99e",
        openQty: 31.65120151,
        costBasis: 975.98,
        marketValue: 4540.36,
        side: "B",
        priorClose: 144.29,
        availableForTradingQty: 31.65120151,
        avgPrice: 30.84,
        mktPrice: 143.45,
        unrealizedPL: 3564.38,
        unrealizedDayPLPercent: -0.58,
        unrealizedDayPL: -26.59,
      },
      {
        symbol: "KO",
        instrumentID: "c771f9bc-a745-4d66-bcf3-bed0d2749aac",
        openQty: 17.22172596,
        costBasis: 726.88,
        marketValue: 778.59,
        side: "B",
        priorClose: 45.25,
        availableForTradingQty: 17.22172596,
        avgPrice: 42.21,
        mktPrice: 45.21,
        unrealizedPL: 51.71,
        unrealizedDayPLPercent: -0.09,
        unrealizedDayPL: -0.69,
      },
      {
        symbol: "MSFT",
        instrumentID: "e234cc98-cd08-4b04-a388-fe5c822beea6",
        openQty: 978,
        costBasis: 50376.78,
        marketValue: 68019.9,
        side: "B",
        priorClose: 69.9,
        availableForTradingQty: 978,
        avgPrice: 51.51,
        mktPrice: 69.55,
        unrealizedPL: 17643.12,
        unrealizedDayPLPercent: -0.5,
        unrealizedDayPL: -342.3,
      },
    ],
  },
};

export const accountPerformance = {
  accountID: "cc07f91b-7ee1-4868-b8fc-823c70a1b932.1407775317759",
  accountNo: "DWKU000001",
  startDate: "2018-09-18",
  endDate: "2018-09-18",
  lastUpdated: "2018-09-18T17:34:00.370Z",
  performance: [
    {
      realizedDayPL: 0,
      unrealizedDayPL: 13.11,
      cumRealizedPL: 0,
      date: "2018-09-18",
      equity: 9941.59,
      cash: 2698.49,
      deposits: 0,
      withdrawals: 0,
      fees: 0,
    },
  ],
};

export const historicalChart = {
  instrumentID: "675cc7c2-e24b-42fa-9d1f-4b3a97ae8d2f",
  compression: 1,
  dateStart: "2019-06-06T00:00:00Z",
  dateEnd: "2019-06-12T23:59:59Z",
  data: "2019-06-06T20:00:00Z,8.8,8.8,8.8,8.8,182|2019-06-10T19:43:00Z,8.96,8.96,8.96,8.96,100|2019-06-10T19:59:00Z,8.96,8.96,8.95,8.95,210|2019-06-10T20:00:00Z,8.95,8.95,8.95,8.95,400|2019-06-11T13:47:00Z,9.07,9.07,9.07,9.07,270|2019-06-11T13:52:00Z,9.05,9.05,9.05,9.05,100|2019-06-11T15:08:00Z,9.05,9.05,9.05,9.05,100|2019-06-11T15:24:00Z,9.07,9.07,9.07,9.07,100|2019-06-11T19:21:00Z,9.04,9.04,9.04,9.04,100|2019-06-11T19:52:00Z,9.06,9.06,9.06,9.06,200|2019-06-11T20:00:00Z,9.06,9.06,9.06,9.06,300",
};

export const statements = [
  {
    _id: "123",
    displayName: "23, Mar 2020 Statement file",
  },
  {
    _id: "1234",
    displayName: "23, Apr 2020 Statement file",
  },
  {
    _id: "12345",
    displayName: "23, May 2020 Statement file",
  },
  {
    _id: "123456",
    displayName: "23, June 2020 Statement file",
  },
  {
    _id: "1234567",
    displayName: "23, Jul 2020 Statement file",
  },
  {
    _id: "12345678",
    displayName: "23, Aug 2020 Statement file",
  },
  {
    _id: "123456789",
    displayName: "23, Sep 2020 Statement file",
  },
];
