import { history } from "config";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstrumentsAfList } from "store/actions/trade.actions";
import { IAppState } from "store/store.interface";
import { Box } from "trolly/common";
import { TickerSearch } from "components/common";
import { useBreakPoints } from "trolly/hooks";
import { useTradeAccountInfo } from "hooks/useAccountInfo";

const Header: React.FC = () => {
  const { appId } = useSelector((state: IAppState) => ({
    ...state.auth,
    ...state.trade,
  }));

  const [searchOption, setSearchOption] = useState<any>(null);
  const dispatch = useDispatch();
  const { xSmall } = useBreakPoints();
  useTradeAccountInfo();
  useEffect(() => {
    if (appId === "C") {
      dispatch(getInstrumentsAfList());
    }
  }, [dispatch, appId]);

  const onChangeHandler = useCallback((event: any, option: any) => {
    setSearchOption(option);
    if (option) {
      history.push(`/trade/ticker/${option.value}`);
      setSearchOption(null);
    }
  }, []);

  return (
    <Box
      marginRight="25px"
      marginLeft={["25px", "25px", "25px", "0px"]}
      display="flex"
    >
      <TickerSearch
        placeholder="Search for stocks"
        variant="search"
        searchIconPosition="start"
        noCloseIcon
        searchIconSpacing="10px"
        inputStartPadding="0px"
        fullWidth
        width={xSmall ? "240px" : "300px"}
        size="small"
        inputVariant="outlined"
        color="secondary"
        onChange={onChangeHandler}
        value={searchOption}
      />
    </Box>
  );
};

export default Header;
