import React, { useState } from "react";
import { Accordion, Box, Select, TSelectOption } from "trolly/common";

const selectOptions: TSelectOption[] = [
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Main",
    value: "main",
  },
  {
    label: "Dark",
    value: "dark",
  },
];
const BadgeComp: React.FC<{ color: any }> = ({ color }) => {
  const [variant, setVariant] = useState("main");
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVariant(event.target.value);
  };
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Select
        options={selectOptions}
        variant="native"
        nativeValue={variant}
        onNativeChange={onChangeHandler}
        color={color}
        label="Select color gradient"
      />
      <Accordion
        variant="outlined"
        color={`${color}.${variant}`}
        marginOnExpand="0px"
        summary="Default theme outlined accordion with no margin on expand"
        square={true}
      >
        This is a customized accordion based on color gradient
      </Accordion>
      <Accordion
        borderRadius="4px"
        color={`${color}.${variant}`}
        summary="Default theme elevation accordion and rounded"
      >
        This is a customized accordion based on color gradient and rounded
      </Accordion>
      <Accordion
        color={`#00FFFF`}
        summary="predefined colored elevation Accordion"
      >
        This is a customized accordion based on pre defined color
      </Accordion>
      <Accordion summary="Default accordion">
        This is a default accordion
      </Accordion>
    </Box>
  );
};

export default BadgeComp;
