import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Skeleton } from "trolly/common";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { IAppState } from "store/store.interface";
import { getFundingOptions } from "store/actions/funding.actions";
import Home from "./Home";
import TransferProcess from "./TransferProcess";
import Status from "./Status";
import useStyles from "./Funding.style";
import {
  FUNDING_GET_FUNDING_OPTIONS_COUNTRIES,
  FUNDING_PAGE_HOME,
  LOCAL_TRANSFER,
  FUNDING_PAGE_OTHER_OPTIONS,
  FUNDING_SET_FUNDING_OPTIONS,
  FUNDING_TRANSFER_PROCESS_STATUS,
  WIRE_TRANSFER,
  TRADE_GET_ACCOUNT_SUMMARY,
  INVEST_GET_ACCOUNT_INFO,
} from "store/store.types";
import useFundingApproval from "hooks/useAccountApproval";
import { history } from "config";

const Loader: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      {[1, 2, 3].map((item) => (
        <Typography key={item} variant="h1">
          <Skeleton width="100%" animation="wave" />
        </Typography>
      ))}
    </div>
  );
};

const FundingComponent: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    data: { fundingOptionsByCountry, fundingOptions },
    render,
    regulation,
    address_country,
    account: tradeAccount,
    accountInfo: investAccount,
  } = useSelector((state: IAppState) => ({
    ...state.funding,
    ...state.auth.data.user,
    ...state.trade,
    ...state.invest,
  }));

  const { appId } = useAppInfo();

  const { isLoading: isFetchingCountries } = useApiInfo(
    FUNDING_GET_FUNDING_OPTIONS_COUNTRIES
  );

  const { isLoading: isFetchingTrade } = useApiInfo(TRADE_GET_ACCOUNT_SUMMARY);
  const { isLoading: isFetchingInvest } = useApiInfo(INVEST_GET_ACCOUNT_INFO);

  const setFundingOptions = useCallback(() => {
    let fundingOptionsList = [];
    const fundingRegulationBased = fundingOptionsByCountry[regulation][0];
    switch (address_country.toLowerCase()) {
      case "united arab emirates":
        fundingOptionsList =
          fundingRegulationBased.UAE || fundingRegulationBased.others;
        break;
      case "united states":
        fundingOptionsList =
          fundingRegulationBased.USA || fundingRegulationBased.others;
        break;
      default:
        fundingOptionsList = fundingRegulationBased.others;
    }

    dispatch({
      type: FUNDING_SET_FUNDING_OPTIONS,
      payload: {
        fundingOptions: fundingOptionsList,
        otherFundingMethods: fundingRegulationBased.other_funding_methods,
      },
    });
  }, [fundingOptionsByCountry, address_country, regulation, dispatch]);

  useEffect(() => {
    if (!fundingOptions.length) {
      dispatch(getFundingOptions());
    }
  }, [dispatch, fundingOptions]);

  useEffect(() => {
    if (
      fundingOptionsByCountry &&
      Object.keys(fundingOptionsByCountry).length !== 0
    ) {
      setFundingOptions();
    }
  }, [fundingOptionsByCountry, setFundingOptions]);

  // responsible to redirect the user if funding is not allowed
  const { isSuccess: isDoneInvestAccount } = useApiInfo(
    INVEST_GET_ACCOUNT_INFO
  );
  const { isSuccess: isDoneTradeAccount } = useApiInfo(
    TRADE_GET_ACCOUNT_SUMMARY
  );
  const [isFundingAllowed] = useFundingApproval();

  useEffect(() => {
    if (
      appId === "A" &&
      isDoneInvestAccount &&
      !isFundingAllowed &&
      investAccount
    ) {
      history.push("/invest/dashboard");
    } else if (
      appId === "C" &&
      isDoneTradeAccount &&
      !isFundingAllowed &&
      tradeAccount
    ) {
      history.push("/trade/dashboard");
    }
  }, [
    isDoneInvestAccount,
    isFundingAllowed,
    isDoneTradeAccount,
    appId,
    tradeAccount,
    investAccount,
  ]);
  ////////////////////////////////////////

  const renderComponent = () => {
    switch (render) {
      case FUNDING_PAGE_HOME:
        return <Home otherOptions={false} />;
      case FUNDING_PAGE_OTHER_OPTIONS:
        return <Home otherOptions={true} />;
      case LOCAL_TRANSFER:
        return <TransferProcess transferType={LOCAL_TRANSFER} />;
      case WIRE_TRANSFER:
        return <TransferProcess transferType={WIRE_TRANSFER} />;
      case FUNDING_TRANSFER_PROCESS_STATUS:
        return <Status />;

      default:
        return null;
    }
  };

  if (isFetchingCountries || isFetchingInvest || isFetchingTrade)
    return <Loader />;

  return <div className={classes.funding}>{renderComponent()}</div>;
};

export default FundingComponent;
