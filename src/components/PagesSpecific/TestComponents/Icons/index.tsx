import React from "react";
import { Box } from "trolly/common";
import {
  // BigLogo,
  // CheckboxChecked,
  // CheckboxUnchecked,
  // HalalLogo,
  // Logo,
  // LogoCircle,
  // MasterCard,
  // RadioChecked,
  // RadioUnChecked,
  // VisaCard,
  // IconCards,
  // IconDirectDeposit,
  // IconLocalTransfer,
  // IconOtherOptions,
  // IconWireTransfer,
  // WealthfaceCoin,
  // Invest3dLogo,
  // Trade3dLogo,
  // Factor3dLogo,
  // WealthfaceProducts,
  Icon,
} from "trolly/icons";

const IconsComp: React.FC<{ color: any }> = ({ color }) => {
  return (
    <Box gridTemplateColumns="repeat(4, 1fr)" gridGap="15px">
      {/* <BigLogo
        customColor={color}
        iconSize="CUSTOM"
        width="250px"
        height="40px"
      />
      <BigLogo
        customColor={color}
        iconSize="CUSTOM"
        width="250px"
        height="40px"
        color="secondary"
      />
      <CheckboxChecked customColor={color} />
      <CheckboxUnchecked />
      <HalalLogo
        viewBox="0 0 100 90"
        customColor={color}
        iconSize="CUSTOM"
        width="100px"
        height="100px"
      />
      <Logo
        customColor={color}
        viewBox="0 0 50 50"
        iconSize="CUSTOM"
        width="50px"
        height="50px"
      />
      <LogoCircle customColor={color} />
      <MasterCard customColor={color} />
      <RadioChecked customColor={color} />
      <RadioUnChecked />
      <VisaCard customColor={color} />
      <IconCards iconSize="L" />
      <IconDirectDeposit iconSize="L" />
      <IconLocalTransfer iconSize="L" />
      <IconOtherOptions iconSize="L" />
      <IconWireTransfer iconSize="L" />
      <WealthfaceCoin iconSize="CUSTOM" width="50px" height="50px" />
      <Invest3dLogo iconSize="L" />
      <Trade3dLogo iconSize="L" />
      <Factor3dLogo iconSize="L" />
      <WealthfaceProducts /> */}
      <Icon iconName="Basket" iconSize="L" />
      <Icon iconName="BasketOff" iconSize="CUSTOM" width="40px" height="40px" />
      <Icon iconName="BigLogo" iconSize="CUSTOM" width="200px" height="100%" />
      <Icon iconName="CheckboxChecked" iconSize="L" />
      <Icon iconName="CheckboxUnchecked" iconSize="L" />
      <Icon iconName="RadioChecked" iconSize="L" />
      <Icon iconName="RadioUnchecked" iconSize="L" />
      <Icon iconName="RiskLevelHigh" iconSize="L" />
      <Icon iconName="RiskLevelLow" iconSize="L" />
      <Icon iconName="RiskLevelMedium" iconSize="L" />
      <Icon iconName="LogoCircle" iconSize="L" />
      <Icon iconName="Factor3dLogo" iconSize="L" />
      <Icon iconName="Invest3dLogo" iconSize="L" />
      <Icon iconName="Trade3dLogo" iconSize="L" />
    </Box>
  );
};

export default IconsComp;
