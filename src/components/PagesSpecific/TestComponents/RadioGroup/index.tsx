import React, { useState } from "react";
import { Box } from "trolly/common";
import { RadioGroup, TGroupOption } from "trolly/custom";

const options = [
  { id: "first", label: "ten thousand", value: "1000" },
  { id: "second", label: "twenty thousand", value: "2000" },
];
const SelectComp: React.FC<{ color: any }> = ({ color }) => {
  const [value, setValue] = useState<string>();
  const onChangeValue = (value: TGroupOption | string) => {
    setValue(value as string);
  };
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <RadioGroup
        onChangeValue={onChangeValue}
        options={options}
        color={color}
        value={value}
      />
    </Box>
  );
};

export default SelectComp;
