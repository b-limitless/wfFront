import React from "react";
import { Accordion, Table, TTableData } from "trolly/common";
import { useStrategiesStyles } from "../../../Strategies.styles";

const ReturnTable: React.FC<{
  columns?: TTableData[];
  rows?: TTableData[][];
}> = ({ columns = [], rows = [] }) => {
  const { accordionDetails, accordion } = useStrategiesStyles();
  return (
    <Accordion
      panelId="return"
      color="secondary.main"
      summary="Return"
      accordionDetailsProps={{ className: accordionDetails }}
      className={accordion}
      fontSize="14px"
      fontWeight={600}
      borderRadius="3px"
      marginOnExpand="0px"
      fontColor="#fff"
    >
      <Table
        columns={columns}
        rows={rows}
        withPagination={false}
        withSorting={false}
        boxShadow={0}
        withBorder={true}
        borderLayout="horizontal"
        borderColor="#e0e0e0"
        containerWidth="100%"
      />
    </Accordion>
  );
};

export default ReturnTable;
