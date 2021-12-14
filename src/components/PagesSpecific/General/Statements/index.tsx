import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTradeAccountStatements } from "store/actions/trade.actions";
import { Box, Select, Text, TSelectOption } from "trolly/common";
import { useStatementsData } from "./useStatementsData.hooks";
import StatementsListing from "./StatementsListing";
import { useAppInfo } from "trolly/hooks";
import { getInvestAccountStatements } from "store/actions/invest.actions";

const options: TSelectOption[] = [
  { label: "1 Year", value: "1" },
  { label: "2 Years", value: "2" },
  { label: "3 Years", value: "3" },
  { label: "4 Years", value: "4" },
  { label: "5 Years", value: "5" },
  { label: "Max", value: "30" },
];

const Statements: React.FC = () => {
  const { theme, appId } = useAppInfo();
  const [numOfYears, setNumOfYears] = useState<string>(options[0].value);
  const dispatch = useDispatch();

  const { columnsData, rowsData } = useStatementsData(theme, appId);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumOfYears(event.target.value);
  };

  useEffect(() => {
    if (appId === "A") {
      dispatch(getInvestAccountStatements());
    } else if (appId === "C") {
      dispatch(getTradeAccountStatements(+numOfYears));
    }
  }, [dispatch, numOfYears, appId]);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="30px"
      >
        <Text fontSize="20px" fontWeight={600}>
          Statements
        </Text>
        {appId === "C" && (
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
            nativeValue={numOfYears}
          />
        )}
      </Box>
      <StatementsListing columnsData={columnsData} rowsData={rowsData} />
    </Box>
  );
};

export default Statements;
