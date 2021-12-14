import { useTheme } from "@material-ui/core";
import React from "react";
import { Box, TTableData, Table, Text } from "trolly/common";

export const rows: TTableData[][] = [
  [
    { id: "name", value: "noubar", node: <p>Noubar</p>, align: "right" },
    { id: "code", value: "AFSDD", node: <p>AFSDD</p>, align: "right" },
    { id: "number", value: "1234567", node: <p>1234567</p>, align: "right" },
  ],
  [
    { id: "name", value: "maya", node: <p>Maya</p>, align: "right" },
    { id: "code", value: "AFSDA", node: <p>AFSDA</p>, align: "right" },
    { id: "number", value: "1234568", node: <p>1234568</p>, align: "right" },
  ],
  [
    { id: "name", value: "jack", node: <p>Jack</p>, align: "right" },
    { id: "code", value: "AFSDE", node: <p>AFSDE</p>, align: "right" },
    { id: "number", value: "1234569", node: <p>1234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "bashar", node: <p>Bashar</p>, align: "right" },
    { id: "code", value: "EFSDE", node: <p>EFSDE</p>, align: "right" },
    { id: "number", value: "2234569", node: <p>2234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "sawsan", node: <p>Sawsan</p>, align: "right" },
    { id: "code", value: "RFSDE", node: <p>RFSDE</p>, align: "right" },
    { id: "number", value: "3234569", node: <p>3234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "angela", node: <p>Angela</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
  [
    { id: "name", value: "noura", node: <p>Noura</p>, align: "right" },
    { id: "code", value: "IFSDE", node: <p>IFSDE</p>, align: "right" },
    { id: "number", value: "9234569", node: <p>9234569</p>, align: "right" },
  ],
];

const columns: TTableData[] = [
  {
    id: "name",
    node: <p>Name</p>,
    align: "right",
    padding: "default",
  },
  {
    id: "code",
    node: <p>Code</p>,
    align: "right",
    padding: "default",
  },
  {
    id: "number",
    node: <p>Number</p>,
    align: "right",
    padding: "default",
  },
];

const BadgeComp: React.FC<{ color: any }> = ({ color }) => {
  const theme = useTheme();
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px" padding="10px">
      <Text>Table with red borders and outside pagination with sorting</Text>
      <Table
        columns={columns}
        rows={rows}
        stickyHeader
        containerWidth="100%"
        maxHeight="330px"
        withBorder
        borderColor="red"
        headerColor="black"
        headerBgColor="#fff"
        borderRadius="10px"
        color={color}
        withSorting={true}
        withPagination={true}
        paginationAlignment="center"
        paginationSpacing="10px"
        paginationPlacement="outside"
      />
      <Text>Table without borders and inside pagination without sorting</Text>
      <Table
        columns={columns}
        rows={rows}
        stickyHeader
        containerWidth="100%"
        maxHeight="400px"
        borderRadius="10px"
        headerBgColor={
          color === "primary"
            ? theme.palette.primary.main
            : theme.palette.secondary.main
        }
        withBorder={true}
        color={color}
        withSorting={false}
        withPagination={true}
        paginationAlignment="center"
        paginationSpacing="10px"
        paginationPlacement="inside"
      />
      <Text>
        Table with default borders and without pagination but with sorting
      </Text>
      <Table
        columns={columns}
        rows={rows}
        stickyHeader
        containerWidth="100%"
        maxHeight="400px"
        borderRadius="10px"
        headerBgColor={
          color === "primary"
            ? theme.palette.primary.main
            : theme.palette.secondary.main
        }
        withBorder={true}
        color={color}
        withSorting={true}
        withPagination={false}
        paginationAlignment="center"
        paginationSpacing="10px"
        paginationPlacement="inside"
      />
    </Box>
  );
};

export default BadgeComp;
