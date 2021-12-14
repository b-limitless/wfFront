import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearKycAlgoComb, getKycAlgoComb } from "store/actions/invest.actions";
import { IAppState } from "store/store.interface";
import { Box, Card, Skeleton, Text } from "trolly/common";
import { appUtils } from "trolly/utils";
import Chart from "trolly/charts";
import useAlgoChartsDataTransformer from "hooks/useAlgoChartData";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { STORE_TYPES } from "trolly/store";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Loader = () => {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap="30px">
      <Card
        display="flex"
        flexDirection="space-between"
        width="100%"
        alignItems="center"
      >
        <Box gridGap="20px" width="100%" display={["none", "grid"]}>
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={180} />
          <Skeleton variant="text" width={160} />
        </Box>
        <Skeleton height={200} width={200} variant="circle" />
      </Card>
      <Card
        display="flex"
        flexDirection="space-between"
        width="100%"
        alignItems="center"
      >
        <Box gridGap="20px" width="100%">
          <Skeleton height={200} width="100%" />
        </Box>
      </Card>
    </Box>
  );
};
const Charts = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { algoCombData, data } = useSelector((state: IAppState) => ({
    ...state.invest,
    ...state.auth,
  }));

  const { isLoading } = useApiInfo(STORE_TYPES.AUTH_VERIFY);

  const { theme: color } = useAppInfo();

  const { pieData, areasplineData } = useAlgoChartsDataTransformer();

  const [areasplineRowsData, categories] = useMemo(() => {
    const areasplineRowsData = [
      {
        name: "Wealthface",
        data: areasplineData.data,
        isGradient: true,
      },
    ];
    return [areasplineRowsData, areasplineData.categories];
  }, [areasplineData]);

  useEffect(() => {
    const { kycObj } = data;
    const { KYCPortfolio } = kycObj || {};
    if (KYCPortfolio && !appUtils.isEmpty(KYCPortfolio) && !isLoading) {
      const { id } = KYCPortfolio;
      dispatch(getKycAlgoComb(id));
    }
    return () => {
      dispatch(clearKycAlgoComb());
    };
  }, [dispatch, data, isLoading]);

  if (!algoCombData) {
    return <Loader />;
  }
  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap="30px">
      <Card padding="0px">
        <Text
          margin={["15px 10px", "30px 0 10px 80px"]}
          textAlign={["center", "left"]}
          fontSize="20px"
        >
          Asset class allocations
        </Text>
        <Chart
          theme={color}
          height={250}
          type="pie"
          pieData={pieData}
          legend={{
            align: "left",
            verticalAlign: "middle",
            itemStyle: {
              color: "#797878",
              cursor: "pointer",
              fontSize: isMobile ? "13px" : "15px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "500",
              textOverflow: "ellipsis",
            },
          }}
          seriesPieDataLabels={{
            style: {
              fontSize: isMobile ? "10px" : "13px",
              textOutline: "none",
            },
            formatter: function () {
              return `<br>${appUtils.formatDecimal(this.y, 0)} %`;
            },
          }}
        />
      </Card>
      <Card padding="0px">
        <Text
          margin={["15px 10px", "30px 0 10px 80px"]}
          textAlign={["center", "left"]}
          fontSize="20px"
        >
          Portfolio estimated value
        </Text>
        <Chart
          theme={color}
          height={250}
          type="areaspline"
          areasplineData={areasplineRowsData}
          YAxisOptions={{
            labels: {
              formatter: function () {
                return `$ ${appUtils.formatNumberWithCommas(+this.value)}`;
              },
            },
            visible: isMobile ? false : true,
          }}
          XAxisOptions={{
            categories: categories,
            tickmarkPlacement: "on",
            lineColor: "#ffffff00",
            tickInterval: 3,
            labels: {
              rotation: -30,
            },
          }}
          tooltip={{
            split: true,
            valueSuffix: " $",
          }}
          legend={{
            enabled: false,
          }}
        />
      </Card>
    </Box>
  );
};

export default Charts;
