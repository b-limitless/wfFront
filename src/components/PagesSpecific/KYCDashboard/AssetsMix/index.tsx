import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { Box, Chip, Skeleton, Text } from "trolly/common";

const Loader = () => {
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Skeleton height={50} />
      <Skeleton height={50} />
      <Skeleton height={50} />
      <Skeleton height={50} />
      <Skeleton height={50} />
      <Skeleton height={50} />
    </Box>
  );
};
const Record: React.FC<{ sym: string; weight: number; name: string }> = ({
  sym,
  weight,
  name,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginBottom="25px"
    >
      <Box display="flex" alignContent="center">
        <Chip
          label={sym}
          color="primary"
          padding="5px"
          width="100px"
          fontSize="16px"
          margin="0 25px 0 0"
        />
        <Text
          color="text.primary"
          fontSize={["13px", "13px", "14px"]}
          fontWeight={600}
          marginRight="25px"
          textAlign="left"
        >
          {name}
        </Text>
      </Box>
      <Text
        color="text.primary"
        fontSize={["13px", "13px", "14px"]}
        fontWeight={600}
      >{`${weight}%`}</Text>
    </Box>
  );
};

const AssetsMix: React.FC = () => {
  const { algoCombData } = useSelector((state: IAppState) => state.invest);

  const data = useMemo(() => {
    if (algoCombData) {
      const { actual_members } = algoCombData;
      return actual_members.map(({ name, sym, weight }) => ({
        name,
        sym,
        weight,
      }));
    }
    return [];
  }, [algoCombData]);

  if (!algoCombData) {
    return <Loader />;
  }
  return (
    <Box>
      <Text
        color="text.secondary"
        fontSize="20px"
        fontWeight={500}
        marginBottom="20px"
      >
        Your assets mix
      </Text>
      {data.map((record) => (
        <Record {...record} />
      ))}
    </Box>
  );
};

export default AssetsMix;
