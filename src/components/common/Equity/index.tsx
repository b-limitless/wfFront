import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { Box, Skeleton, Text } from "trolly/common";
import { useTheme } from "@material-ui/core/styles";

const Loader = () => {
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="50%" />
      <Skeleton variant="text" width="90%" />
    </Box>
  );
};
const EquityPositions: React.FC<{ equity: number; fixedIncome: number }> = ({
  equity,
  fixedIncome,
}) => {
  const theme = useTheme();
  return (
    <Box display="flex" marginBottom="15px">
      {equity > 0 && (
        <Box
          display="flex"
          justifyContent="flex-start"
          bgcolor={theme.palette.primary.main}
          width={`${equity}%`}
          padding="0px 10px"
          color="#fff"
        >{`${equity}%`}</Box>
      )}
      {fixedIncome > 0 && (
        <Box
          display="flex"
          justifyContent="flex-end"
          bgcolor={theme.palette.secondary.main}
          width={`${fixedIncome}%`}
          padding="0px 10px"
          color="#fff"
        >{`${fixedIncome}%`}</Box>
      )}
    </Box>
  );
};

const AssetsMix: React.FC = () => {
  const { algoCombData } = useSelector((state: IAppState) => state.invest);

  const { Equity, Fixed_Income } = useMemo(() => {
    if (algoCombData) {
      const { asset_class } = algoCombData;
      return asset_class;
    }
    return {} as any;
  }, [algoCombData]);

  if (!algoCombData) {
    return <Loader />;
  }
  return (
    <Box height="fit-content">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="10px"
      >
        {Equity > 0 && (
          <Text
            color="text.secondary"
            fontSize="14px"
            fontWeight={500}
            marginBottom="5px"
          >
            Equity
          </Text>
        )}
        {Fixed_Income > 0 && (
          <Text
            color="text.secondary"
            fontSize="14px"
            fontWeight={500}
            marginBottom="5px"
          >
            Fixed income
          </Text>
        )}
      </Box>

      <EquityPositions equity={Equity} fixedIncome={Fixed_Income} />
      <Text fontSize="16px" color="text.primary" fontWeight={500}>
        We adjust allocations intelligently to make sure you’re always on track
        to your goals.
      </Text>
    </Box>
  );
};

export default AssetsMix;
