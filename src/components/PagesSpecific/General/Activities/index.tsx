import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getInvestAccountActivities } from "store/actions/invest.actions";
import { getTradeAccountActivities } from "store/actions/trade.actions";
import { Box, Card, Link, Select, Text, TSelectOption } from "trolly/common";
import { useAppInfo } from "trolly/hooks";
import { ACTIVITY_OPTIONS } from "../../Trade/Trade.config";
import ActivityListing from "./ActivitiyListing";
import { useActivityData } from "./useActivityData.hooks";

const options: TSelectOption[] = [
  { label: "1 Month", value: "1" },
  { label: "3 Months", value: "3" },
  { label: "6 Months", value: "6" },
  { label: "1 Year", value: "12" },
  { label: "3 Years", value: "36" },
  { label: "5 Years", value: "60" },
];

const tabsOptions = [
  { label: "All activities", value: "ALL" },
  { label: "Trades", value: "TRADES" },
  { label: "Deposits & withdrawals", value: "WITHDRAWALS_AND_DEPOSITS" },
  { label: "Dividends & interests", value: "DIVIDENDS_AND_INTERESTS" },
  { label: "Other activities", value: "OTHERS" },
];

const Activities: React.FC = () => {
  const { appId, theme } = useAppInfo();
  const [numOfMonth, setNumOfMonth] = useState<string>(options[0].value);
  const [tab, setTab] = useState<string>(tabsOptions[0].value);
  const dispatch = useDispatch();

  const { columnsData, rowsData } = useActivityData(
    ACTIVITY_OPTIONS[tab],
    appId
  );

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumOfMonth(event.target.value);
  };

  const onClickHandler = (value: string) => () => {
    setTab(value);
  };

  useEffect(() => {
    if (appId === "A") {
      dispatch(getInvestAccountActivities(+numOfMonth));
    } else if (appId === "C") {
      dispatch(getTradeAccountActivities(+numOfMonth));
    }
  }, [dispatch, numOfMonth, appId]);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="30px"
      >
        <Text fontSize="20px" fontWeight={600}>
          Activity
        </Text>
        <Select
          options={options}
          label="Period"
          color={theme}
          fullWidth={true}
          width="200px"
          inputVariant="outlined"
          size="small"
          variant="native"
          onNativeChange={onChangeHandler}
          nativeValue={numOfMonth}
        />
      </Box>
      <Box
        gridTemplateColumns={["1fr", "1fr", "3fr 9fr", "3fr 9fr"]}
        gridGap="25px"
      >
        <Card
          display="flex"
          flexDirection="column"
          justifyContent={["center", "center", "flex-start", "flex-start"]}
          alignItems={["center", "center", "flex-start", "flex-start"]}
          padding="20px"
          height="fit-content"
        >
          {tabsOptions.map((item) => (
            <Link
              variant="header"
              fontColor="#707070"
              color={theme}
              onClick={onClickHandler(item.value)}
              active={tab === item.value}
              marginBottom="20px"
            >
              {item.label}
            </Link>
          ))}
        </Card>
        <ActivityListing columnsData={columnsData} rowsData={rowsData} />
      </Box>
    </Box>
  );
};

export default Activities;
