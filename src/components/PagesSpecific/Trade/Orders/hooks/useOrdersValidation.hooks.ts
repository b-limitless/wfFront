import { useCallback, useEffect, useState } from "react";
import { validators } from "trolly/utils";
import { EOrderType, EPriceType } from "../Orders.interface";

interface IValidationHooksProps {
  cash?: string;
  shares?: string;
  priceStop?: string;
  priceLimit?: string;
  position?: number;
  bid?: number;
  ask?: number;
  availableCash?: number;
  orderType: EOrderType;
  priceType: EPriceType;
}

const useOrderValidation = ({
  cash,
  shares,
  priceStop,
  priceLimit,
  position,
  bid,
  priceType,
  ask,
  availableCash,
  orderType,
}: IValidationHooksProps) => {
  const [cashErr, setCashErr] = useState("");
  const [shareErr, setShareErr] = useState("");
  const [stopErr, setStopErr] = useState("");
  const [limitErr, setLimitErr] = useState("");
  const [touched, setTouched] = useState<boolean>(false);

  const isInputValid = useCallback(
    (number: any, inputType: "cash" | "share" | "limit" | "stop") => {
      if (inputType === "share" && priceType === "LIMIT") {
        return validators.isNumber(number);
      }
      return validators.isFloat(number);
    },
    [priceType]
  );

  const getPriceStopValidationMessage = useCallback(() => {
    if (!isInputValid(priceStop, "stop")) {
      return "Please enter correct number";
    } else if (priceStop) {
      if (
        orderType === "SELL" &&
        typeof bid !== "undefined" &&
        +priceStop >= bid
      ) {
        return "Price stop cannot be more than or equal to bid price";
      } else if (
        orderType === "BUY" &&
        typeof ask !== "undefined" &&
        +priceStop <= ask
      ) {
        return "Price stop cannot be less than or equal to ask price";
      }
    }
    return "";
  }, [bid, isInputValid, priceStop, orderType, ask]);

  const getPriceLimitValidationMessage = useCallback(() => {
    if (!isInputValid(priceLimit, "limit")) {
      return "Please enter correct number";
    } else if (priceLimit) {
      if (
        orderType === "SELL" &&
        typeof bid !== "undefined" &&
        +priceLimit <= bid
      ) {
        return "Price limit cannot be less than or equal to bid price";
      } else if (
        orderType === "BUY" &&
        typeof ask !== "undefined" &&
        +priceLimit >= ask
      ) {
        return "Price limit cannot be more than or equal to ask price";
      }
    }
    return "";
  }, [isInputValid, priceLimit, bid, orderType, ask]);

  const getSharesValidationMessage = useCallback(() => {
    if (!isInputValid(shares, "share")) {
      return "Please enter correct number";
    } else if (shares) {
      if (+shares <= 0.000001) {
        return "Quantity should be greater than 1 millionth";
      } else if ((position || position === 0) && +shares > position) {
        return "You cannot exceed the total shares you own";
      } else if (
        typeof bid !== "undefined" &&
        typeof position !== "undefined" &&
        bid * (position - +shares) < 1
      ) {
        return "The remaining quantity is less than $1";
      }
    }
    return "";
  }, [shares, position, bid, isInputValid]);

  const getCashValidationMessage = useCallback(() => {
    if (!isInputValid(cash, "cash")) {
      return "Please enter correct number";
    } else if (cash) {
      if (+cash < 1) {
        return "You cannot send an order for less than 1$";
      } else if (
        typeof availableCash !== "undefined" &&
        availableCash < +cash
      ) {
        return "The buying power in your account will not cover this trade";
      }
    }
    return "";
  }, [cash, isInputValid, availableCash]);

  const marketOrderValidation = useCallback(() => {
    setShareErr(getSharesValidationMessage());
    setCashErr(getCashValidationMessage());
  }, [getSharesValidationMessage, getCashValidationMessage]);

  const limitOrderValidation = useCallback(() => {
    setShareErr(getSharesValidationMessage());
    setLimitErr(getPriceLimitValidationMessage());
    if (orderType === "BUY") {
      setCashErr(getCashValidationMessage());
    }
  }, [
    getSharesValidationMessage,
    getPriceLimitValidationMessage,
    getCashValidationMessage,
    orderType,
  ]);

  const stopOrderValidation = useCallback(() => {
    setShareErr(getSharesValidationMessage());
    setCashErr(getCashValidationMessage());
    setStopErr(getPriceStopValidationMessage());
  }, [
    getSharesValidationMessage,
    getCashValidationMessage,
    getPriceStopValidationMessage,
  ]);

  useEffect(() => {
    if (touched) {
      if (priceType === "MARKET") {
        marketOrderValidation();
      } else if (priceType === "LIMIT") {
        limitOrderValidation();
      } else if (priceType === "STOP") {
        stopOrderValidation();
      }
    } else {
      setTouched(true);
    }
    // eslint-disable-next-line
  }, [
    marketOrderValidation,
    priceType,
    limitOrderValidation,
    stopOrderValidation,
  ]);

  return { cashErr, shareErr, limitErr, stopErr };
};

export default useOrderValidation;
