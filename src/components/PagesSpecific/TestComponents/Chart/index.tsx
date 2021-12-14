import React from "react";
import { Box } from "trolly/common";
import Chart from "trolly/charts";

const ChartComp: React.FC<{ color: any }> = ({ color }) => {
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Chart
        theme={color}
        legend={{
          align: "left",
          verticalAlign: "middle",
          itemStyle: {
            color: "#797878",
            cursor: "pointer",
            fontSize: "20px",
            fontFamily: "Poppins Medium",
            lineHeight: "45px",
            fontWeight: "500",
            textOverflow: "ellipsis",
          },
        }}
        type="pie"
        pieData={[
          {
            name: "Dud",
            data: [
              { name: "Sarwa", y: 20 },
              { name: "Wealthface", y: 65 },
              { name: "BMW", y: 15 },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default ChartComp;
