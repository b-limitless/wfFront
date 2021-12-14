import React, { useMemo, useState } from "react";
import { Box, Card, Select } from "trolly/common";
import InputComp from "./Input";
import SelectComp from "./Select";
import ChartComp from "./Chart";
import BadgeComp from "./Badge";
import IndicatorComp from "./Indicator";
import TableComp from "./Table";
import PhoneComp from "./Phone";
import TabsComp from "./Tabs";
import IconsComp from "./Icons";
import DialogComp from "./Dialog";
import LinkComp from "./Link";
import DateComp from "./Date";
import OnboardingComp from "./OnboaardingProcess";
import ButtonComp from "./Button";
import AccordionComp from "./Accordion";
import RadioGroupComp from "./RadioGroup";
import CameraComp from "./Camera";
import AlertComp from "./Alert";
import Header from "./Header";

type ECompType =
  | "input"
  | "select"
  | "table"
  | "badge"
  | "chart"
  | "indicator"
  | "phone"
  | "tabs"
  | "icons"
  | "dialog"
  | "link"
  | "datePicker"
  | "onboardingProcess"
  | "button"
  | "accordion"
  | "radiogroup"
  | "alert"
  | "header"
  | "camera";
const TestComponentsGroup: React.FC = () => {
  const options = [
    { label: "Input", value: "input" },
    { label: "Accordion", value: "accordion" },
    { label: "Select", value: "select" },
    { label: "Camera", value: "camera" },
    { label: "Radio Group", value: "radiogroup" },
    { label: "Button", value: "button" },
    { label: "Table", value: "table" },
    { label: "Badge", value: "badge" },
    { label: "Alert", value: "alert" },
    { label: "Chart", value: "chart" },
    { label: "Indicator", value: "indicator" },
    { label: "Phone", value: "phone" },
    { label: "Tabs", value: "tabs" },
    { label: "Icons", value: "icons" },
    { label: "Dialog", value: "dialog" },
    { label: "Link", value: "link" },
    { label: "datePicker", value: "datePicker" },
    { label: "Header", value: "header" },
    { label: "Onboarding Process", value: "onboardingProcess" },
  ];

  const colorOptions = [
    { label: "Primary", value: "primary" },
    { label: "Secondary", value: "secondary" },
  ];

  const variantOptions = [
    { label: "Filled", value: "filled" },
    { label: "Outlined", value: "outlined" },
  ];

  const [currentComp, setCurrentComp] = useState(options[0]);
  const [currentTheme, setCurrentTheme] = useState(colorOptions[0]);
  const [currentVariant, setCurrentVariant] = useState(variantOptions[1]);

  const onChangeHandler = (event: any, option: any) => {
    setCurrentComp(option);
  };

  const onChangeTheme = (event: any, option: any) => {
    setCurrentTheme(option);
  };

  const onChangeVariant = (event: any, option: any) => {
    setCurrentVariant(option);
  };

  const ComponentGroup = useMemo(() => {
    const { value: color } = currentTheme;
    const { value: variant } = currentVariant;
    switch (currentComp.value as ECompType) {
      case "input":
        return <InputComp color={color} variant={variant} />;
      case "select":
        return <SelectComp color={color} variant={variant} />;
      case "table":
        return <TableComp color={color} />;
      case "chart":
        return <ChartComp color={color} />;
      case "badge":
        return <BadgeComp color={color} />;
      case "indicator":
        return <IndicatorComp />;
      case "phone":
        return <PhoneComp color={color} variant={variant} />;
      case "tabs":
        return <TabsComp color={color} />;
      case "icons":
        return <IconsComp color={color} />;
      case "dialog":
        return <DialogComp color={color} />;
      case "link":
        return <LinkComp color={color} />;
      case "datePicker":
        return <DateComp color={color} variant={variant} />;
      case "onboardingProcess":
        return <OnboardingComp color={color} />;
      case "button":
        return <ButtonComp color={color} />;
      case "accordion":
        return <AccordionComp color={color} />;
      case "radiogroup":
        return <RadioGroupComp color={color} />;
      case "camera":
        return <CameraComp color={color} />;
      case "header":
        return <Header />;
      case "alert":
        return <AlertComp />;
      default:
        return null;
    }
  }, [currentComp, currentTheme, currentVariant]);

  return (
    <Card>
      <Box
        gridTemplateColumns={["1fr", "1fr", "repeat(3, 1fr)"]}
        gridGap="20px"
      >
        <Select
          options={options}
          onChange={onChangeHandler}
          variant="default"
          label="Choose Component"
          fullWidth={true}
          value={currentComp}
        />
        <Select
          options={colorOptions}
          onChange={onChangeTheme}
          variant="default"
          fullWidth={true}
          label="Choose theme"
          value={currentTheme}
        />
        <Select
          options={variantOptions}
          onChange={onChangeVariant}
          variant="default"
          fullWidth={true}
          label="Choose variant"
          value={currentVariant}
        />
      </Box>
      <Box padding={["0px", "20px"]} marginTop="30px">
        {ComponentGroup}
      </Box>
    </Card>
  );
};

export default TestComponentsGroup;
