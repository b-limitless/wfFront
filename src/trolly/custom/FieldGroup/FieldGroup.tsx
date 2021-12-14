import React from "react";
import { Box, ETheme, Input, Select, Text } from "@wf-org/trolly.common";
import { IFieldGroupProps } from "./FieldGroup.interface";

interface IFieldProps {
  color?: ETheme;
  inputValue?: string;
  selectValue?: string;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const PercentageOptions: React.FC<IFieldGroupProps & IFieldProps> = (props) => {
  const {
    options,
    optionsLabel,
    color,
    optionsPlaceholder,
    optionsTitle,
    inputLabel,
    inputPlaceholder,
    inputTitle,
    fontSize,
    fontWeight,
    spacing,
    titleColor,
    onChangeInput,
    onChangeSelect,
    inputValue,
    selectValue,
  } = props;
  return (
    <Box>
      {options && optionsTitle && (
        <Text
          color={titleColor}
          fontSize={fontSize}
          fontWeight={fontWeight}
          marginBottom={spacing}
        >
          {optionsTitle}
        </Text>
      )}
      {options && (
        <Box marginBottom={spacing}>
          <Select
            options={options}
            label={optionsLabel}
            color={color}
            placeholder={optionsPlaceholder}
            variant="native"
            onNativeChange={onChangeSelect}
            nativeValue={selectValue}
            fontWeight={fontWeight}
            listItemFontSize="14px"
            fontSize={fontSize}
          />
        </Box>
      )}
      {inputTitle && (
        <Text
          color={titleColor}
          fontSize={fontSize}
          fontWeight={fontWeight}
          marginBottom={spacing}
        >
          {inputTitle}
        </Text>
      )}
      <Input
        onChange={onChangeInput}
        value={inputValue}
        label={inputLabel}
        fontSize={fontSize}
        fontWeight={fontWeight}
        placeholder={inputPlaceholder}
        color={color}
      />
    </Box>
  );
};

export default PercentageOptions;
