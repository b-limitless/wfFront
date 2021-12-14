import React, { useState } from "react";
import { DatePicker, Box, Text, Select } from "trolly/common";

const options = [
  { label: "Inline", value: "inline" },
  { label: "Dialog", value: "dialog" },
  { label: "Static", value: "static" },
];
const DateComponent: React.FC<{ color: any; variant: any }> = ({
  color,
  variant,
}) => {
  const [dateVariant, setDateVariant] = useState("inline");
  const [date, setDate] = useState<Date | null>(null);

  const onChangeDate = (date: any) => {
    setDate(date);
  };

  const onNativeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateVariant(event.target.value);
  };
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Text
        fontSize="16px"
        color={color === "primary" ? "primary.main" : "secondary.main"}
      >
        the Selected Date is: {`${date || "unknown"}`}
      </Text>
      <Select
        options={options}
        variant="native"
        nativeValue={dateVariant}
        onNativeChange={onNativeChange}
        label="Select Date Variant"
        inputVariant={variant}
      />
      <DatePicker
        color={color}
        variant={dateVariant as any}
        inputVariant={variant}
        value={date}
        onChange={onChangeDate}
        label="Date picker and input"
      />
      <DatePicker
        color={color}
        variant={dateVariant as any}
        inputVariant={variant}
        value={date}
        onChange={onChangeDate}
        label="Date picker and input rounded"
        round
      />
    </Box>
  );
};

export default DateComponent;
