import React, { useEffect, useMemo } from "react";
import { Box, Button, Snackbar } from "trolly/common";
import { useStrategiesStyles } from "../Strategies.styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useDispatch, useSelector } from "react-redux";
import {
  getDescriptionsList,
  getStrategyDetails,
  getUserStrategies,
} from "store/actions/strategies.actions";
import { useApiInfo } from "trolly/hooks";
import {
  STRATEGIES_GET_DESCRIPTIONS,
  STRATEGIES_GET_STRATEGY_DETAILS,
} from "store/store.types";
import { StrategyDetailsLoader } from "../StrategiesLoaders";
import { IStrategy } from "store/reducers/strategies.reducers";
import StrategyBlocks from "./StrategyBlocks";
import { IAppState } from "store/store.interface";
import { apiActions, authActions, STORE_TYPES } from "trolly/store";

interface IProps {
  strategy: IStrategy;
  nStock: number;
  onBack?: () => void;
}
const StrategyDetails: React.FC<IProps> = ({ strategy, nStock, onBack }) => {
  const classes = useStrategiesStyles();
  const { strategy: strategySlug } = strategy;

  const { strategyDetails, afData, descriptions } = useSelector(
    (state: IAppState) => ({
      ...state.strategies,
      ...state.auth,
    })
  );

  const { isLoading: isLoadingAfToken, error: afTokenError } = useApiInfo(
    STORE_TYPES.AUTH_GET_AF_TOKEN
  );

  const { isLoading: isDetailsLoading, error: detailsError } = useApiInfo(
    STRATEGIES_GET_STRATEGY_DETAILS
  );
  const { isLoading: isDescriptionsLoading, error: descriptionsError } =
    useApiInfo(STRATEGIES_GET_DESCRIPTIONS);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!afData) {
      dispatch(authActions.getAfToken());
    }
  }, [dispatch, afData]);

  /**
   * get the strategy Details and descriptions for the tables tooltip
   * and get list of strategies to know if the copy to basket is available or not
   */
  useEffect(() => {
    if (afData) {
      dispatch(getStrategyDetails(strategySlug, nStock, "usa"));
      dispatch(getUserStrategies());
    }
  }, [dispatch, afData, strategySlug, nStock]);

  useEffect(() => {
    if (!descriptions && afData) {
      dispatch(getDescriptionsList());
    }
  }, [dispatch, descriptions, afData]);
  // ================================================================= //

  const onCloseError = () => {
    dispatch(apiActions.clearApi(STRATEGIES_GET_STRATEGY_DETAILS));
    dispatch(apiActions.clearApi(STRATEGIES_GET_DESCRIPTIONS));
  };

  const errors = useMemo(() => {
    let errors = [];
    if (detailsError) {
      errors.push(detailsError);
    }
    if (descriptionsError && Array.isArray(descriptionsError)) {
      errors = [...errors, ...descriptionsError];
    }
    if (afTokenError) {
      errors.push(afTokenError);
    }
    return errors;
  }, [descriptionsError, detailsError, afTokenError]);

  if (
    isDetailsLoading ||
    isDescriptionsLoading ||
    isLoadingAfToken ||
    errors.length > 0 ||
    !strategyDetails
  ) {
    return (
      <>
        {errors.length > 0 &&
          errors.map((error) => (
            <Snackbar
              vertical="top"
              horizontal="center"
              open={!!error}
              handleClose={onCloseError}
              severity="error"
            >
              {error}
            </Snackbar>
          ))}
        <StrategyDetailsLoader />
      </>
    );
  }
  return (
    <Box>
      <StrategyBlocks strategy={strategy} nStock={nStock} country="usa" />
      <Box display="block" marginTop="24px">
        <Button
          onClick={onBack}
          variant="outlined"
          round
          className={classes.back}
        >
          <ArrowBackIosIcon /> Strategies
        </Button>
      </Box>
    </Box>
  );
};

export default StrategyDetails;
