import Grid from "@material-ui/core/Grid";
import { useInvestAccountInfo } from "hooks/useAccountInfo";
import React, { useMemo, useState } from "react";
import { Box, Input, Text, Tooltip } from "trolly/common";
import PortfolioEvolutionChart from "./Chart";

const PortfolioEvolution: React.FC = () => {
  const { expected_return, portfolioValue } = useInvestAccountInfo({
    doNotFetchData: true,
  });
  const [monthlyDeposit, setMonthlyDeposit] = useState(0);
  const onChangeMonthlyDeposit = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (!isNaN(Number(value)) || !value) {
      setMonthlyDeposit(+value);
    }
  };

  const tooltipTitle = useMemo(
    () => `Based on you risk tolerance, this portfolio have an estimated rate of return of (${expected_return}%) net of fees.
  The rate of return is the annualized return from January 2008 until today and is based on the backtesting of our global minimum volatility portfolio.`,
    [expected_return]
  );

  return (
    <Grid container>
      <Box display="flex" flexDirection="column">
        <Text fontSize="16px" fontWeight={600}>
          Increase your monthly deposit
        </Text>

        <Tooltip
          title={tooltipTitle}
          wrapperAlignment="center"
          withHelpIcon={true}
          wrapperMargin="15px 0"
          isIconOnly={true}
          color="primary"
        >
          <Text fontSize="14px" fontWeight={500} color="text.secondary">
            How much your money can grow over time
          </Text>
        </Tooltip>
        <Box mb="15px">
          <Input
            label="Montly deposit"
            variant="outlined"
            value={monthlyDeposit}
            onChange={onChangeMonthlyDeposit}
            size="medium"
            color="primary"
            unit="$"
            unitPosition="end"
          />
        </Box>
      </Box>
      <Grid item xs={12}>
        <PortfolioEvolutionChart
          monthlyDeposit={monthlyDeposit ? +monthlyDeposit : 0}
          portfolioValue={portfolioValue}
          rateOfReturn={expected_return}
        />
      </Grid>
    </Grid>
  );
};

export default PortfolioEvolution;
