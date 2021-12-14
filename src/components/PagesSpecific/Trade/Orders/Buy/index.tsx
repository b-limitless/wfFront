import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccountSummary,
  getConsolidatedQuote,
  placeTradeOrder,
} from "store/actions/trade.actions";
import { IAppState } from "store/store.interface";
import { Alert, Dialog } from "trolly/common";
import Loader from "./Loader";
import useLoadingState from "./useLoadingState.hooks";
import TakeOrder from "./TakeOrder";
import Summary from "./Summary";
import Status from "./OrderStatus";
import { useApiInfo } from "trolly/hooks";
import { TRADE_POST_ORDER } from "store/store.types";
import { apiActions } from "trolly/store";
import { TOrderDetails } from "../Orders.interface";
import { appUtils } from "trolly/utils";
import ErrorComponent from "../ErrorComponent";

interface IBuyOrder {
  symbol: string;
  instrumentId?: string;
  open: boolean;
  onCancel: () => void;
}

const tabsOptions = [
  { label: "Market", value: "MARKET" },
  { label: "Limit", value: "LIMIT" },
  { label: "Stop", value: "STOP" },
];

const BuyOrder: React.FC<IBuyOrder> = ({ symbol, open, onCancel }) => {
  const { formatDecimal } = appUtils;
  const [step, setStep] = useState("takeOrder");
  const [selectedOrder, setSelecetedOrder] = useState(tabsOptions[0].value);

  const onChangeOrder = (value: any) => {
    setSelecetedOrder(value);
  };

  const [summaryData, setSummaryData] = useState<any>({});
  const dispatch = useDispatch();

  const { isLoading, error, isSuccess, clearError } = useLoadingState();

  const getOrderData = useCallback(() => {
    dispatch(getAccountSummary());
    dispatch(getConsolidatedQuote(symbol));
  }, [dispatch, symbol]);

  useEffect(() => {
    if (open && symbol) {
      getOrderData();
    }
  }, [dispatch, open, symbol, getOrderData]);

  const { instrumentFundamental, instrumentQuote, accountSummary, trade } =
    useSelector((state: IAppState) => ({ ...state.trade, ...state.general }));

  const [min, cps] = useMemo(() => {
    if (trade) {
      const { commission } = trade || {};
      if (commission && commission.buy) {
        return [commission.buy.min, commission.buy.cps];
      }
    }
    return [];
  }, [trade]);

  const symbolData = useMemo(() => {
    if (
      isSuccess &&
      instrumentFundamental &&
      instrumentQuote &&
      instrumentQuote.length > 0 &&
      accountSummary
    ) {
      const { image, name } = instrumentFundamental;
      const { ask, bid, askSize, bidSize, timeOffset } = instrumentQuote[0];
      const { cash, equity, accountNo } = accountSummary;
      const { cashAvailableForTrade, cashBalance } = cash || {};
      const { equityValue } = equity || {};
      return {
        accountNo,
        image,
        name,
        ask,
        bid,
        askSize,
        bidSize,
        timeOffset,
        cashAvailableForTrade,
        portolioValue: equityValue + cashBalance,
      };
    }
  }, [isSuccess, instrumentFundamental, accountSummary, instrumentQuote]);

  const {
    isLoading: isOrderLoading,
    isSuccess: isOrderSuccess = true,
    error: orderError,
    done: orderDone,
  } = useApiInfo(TRADE_POST_ORDER);

  useEffect(() => {
    if (orderDone && !isOrderLoading) {
      setStep("status");
    }
  }, [orderDone, isOrderLoading]);

  const onPreviewOrder = (orderDetails: TOrderDetails) => {
    setSummaryData(orderDetails);
    setStep("summary");
  };

  const onPlaceOrder = useCallback(() => {
    if (symbolData) {
      const { accountNo } = symbolData;
      const {
        priceType,
        cash: amountCash,
        shares: quantity,
        wayToSend,
        price,
      } = summaryData;
      if (priceType && amountCash) {
        dispatch(
          placeTradeOrder({
            accountNo,
            orderType: priceType,
            amountCash,
            quantity,
            side: "BUY",
            symbol,
            wayToSend,
            price,
          })
        );
      }
    }
  }, [dispatch, summaryData, symbolData, symbol]);

  const onModifyOrder = useCallback(() => {
    dispatch(apiActions.clearApi(TRADE_POST_ORDER));
    setStep("takeOrder");
  }, [dispatch]);

  const orderStepComponent = useMemo(() => {
    const { cash, shares, priceType, price } = summaryData;
    if (symbolData) {
      switch (step) {
        case "takeOrder":
          return (
            <TakeOrder
              onCancel={onCancel}
              symbol={symbol}
              onPreview={onPreviewOrder}
              options={tabsOptions}
              onChangeOrder={onChangeOrder}
              selectedOrder={selectedOrder}
              {...symbolData}
            />
          );
        case "summary":
          // define the order type display
          let orderTypeText = "";
          if (priceType === "MARKET") {
            orderTypeText = "Market Order";
          } else if (priceType === "LIMIT") {
            orderTypeText = "Buy Limit";
          } else if (priceType === "STOP") {
            orderTypeText = "Buy Stop";
          }

          // defined the final price
          let finalPrice = 0;
          if (priceType === "MARKET") {
            finalPrice = symbolData.ask;
          } else {
            finalPrice = price;
          }

          if (cash && shares && min && cps) {
            const finalCommission = formatDecimal(
              Math.max(Math.ceil(shares) * cps, min),
              2
            ) as string;
            return (
              <Summary
                cash={cash}
                shares={shares}
                onCancel={onCancel}
                onPlaceOrder={onPlaceOrder}
                isLoading={isOrderLoading}
                symbol={symbol}
                commission={finalCommission}
                orderType={orderTypeText}
                price={finalPrice}
                {...symbolData}
              />
            );
          }
          return null;
        case "status":
          return (
            <Status
              isSuccess={isOrderSuccess}
              error={orderError}
              onModifyOrder={onModifyOrder}
              priceType={priceType}
            />
          );
        default:
          return null;
      }
    }
    return (
      <ErrorComponent
        type="BUY"
        onCancel={onCancel}
        onTryAgain={getOrderData}
      />
    );
  }, [
    symbolData,
    step,
    onCancel,
    symbol,
    summaryData,
    isOrderLoading,
    onPlaceOrder,
    isOrderSuccess,
    orderError,
    onModifyOrder,
    selectedOrder,
    formatDecimal,
    cps,
    min,
    getOrderData,
  ]);

  const dialogContent = useMemo(() => {
    if (isLoading || error) {
      return (
        <>
          {error && (
            <Alert severity="error" variant="standard" onClose={clearError}>
              {error}
            </Alert>
          )}
          <Loader />
        </>
      );
    } else if (isSuccess) {
      return orderStepComponent;
    }
  }, [isSuccess, isLoading, error, clearError, orderStepComponent]);

  return (
    <Dialog
      open={open}
      withAnimation={true}
      animationVariant="fade"
      onBackdropClick={onCancel}
      contentWrapperStyles={{ padding: "20px" }}
    >
      {dialogContent}
    </Dialog>
  );
};

export default BuyOrder;
