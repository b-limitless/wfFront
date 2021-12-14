import React from "react";
import { Text, Box } from "trolly/common";
import { EApps } from "trolly/store";
import InvitedList from "./InvitedList";
import RewardDetail from "./RewardDetail";

export interface IRewardsProps {
  prodType: EApps;
}

const Index: React.FC<IRewardsProps> = ({ prodType }) => {
  return (
    <div>
      <Text fontSize="20px" fontWeight={600} mb="30px">
        Rewards
      </Text>

      <Box
        display="grid"
        gridTemplateColumns={["100%", "1fr", "350px 1fr"]}
        gridGap="24px"
      >
        <InvitedList prodType={prodType} />
        <RewardDetail prodType={prodType} />
      </Box>
    </div>
  );
};

export default Index;
