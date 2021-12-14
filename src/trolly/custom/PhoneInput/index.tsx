import React, { useEffect, useState } from "react";
import { Select, Input, Box } from "@wf-org/trolly.common";
import { IPhoneInputProps, TPhoneOption } from "./PhoneInput.interface";
import FormControl from "@material-ui/core/FormControl";
import HelperText from "@material-ui/core/FormHelperText";
import { validators } from "@wf-org/trolly.utils";
import { isValidPhoneNumber } from "libphonenumber-js/max";
import { useFormErrorStyles } from "./PhoneInput.style";

const PhoneInput: React.FC<IPhoneInputProps> = ({
  codeLabel,
  gridTemplateColumns,
  options,
  phoneLabel,
  withCountryFlagLabel,
  withCountryFlagList,
  gridColumnGap,
  gridGap,
  gridRowGap,
  error,
  onChange,
  code,
  phone,
  fontSize,
  fontWeight,
  errorMessage,
  color,
  variant,
  phoneName,
  codeName,
  size,
  disableCode,
  disablePhone,
}) => {
  const { container, helper } = useFormErrorStyles({ error });
  const [codeOption, setCodeOption] = useState<TPhoneOption | undefined>({
    label: "",
    value: "",
    iso2: "",
    codeNumber: "",
  });
  const [phoneValue, setPhoneValue] = useState<string | undefined>(phone);

  // set initial code value
  useEffect(() => {
    if (code) {
      const option = options.filter((option) => option.value === code)[0];
      if (option) {
        setCodeOption(option);
      }
    }
    if (phone && !phoneValue) {
      setPhoneValue(phone);
    }
  }, [code, options, phone, phoneValue]);

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      setPhoneValue("");
    }
    if (value.length <= 10 && validators.regEx.number.test(value)) {
      setPhoneValue(value);
      if (codeOption) {
        const updatedPhone = `${codeOption.codeNumber}${value}`;
        if (isValidPhoneNumber(updatedPhone) && onChange) {
          onChange(value, codeOption.value, codeOption, updatedPhone);
        } else if (onChange) {
          onChange();
        }
      }
    }
  };

  const onChangeCode = (event: any, option: TPhoneOption) => {
    setCodeOption(option);
    if (phoneValue) {
      if (option) {
        const updatedPhone = `${option.codeNumber}${phoneValue}`;
        if (isValidPhoneNumber(updatedPhone) && onChange) {
          onChange(phoneValue, option.value, option, updatedPhone);
        } else if (onChange) {
          onChange();
        }
      } else if (onChange) {
        onChange();
      }
    }
  };

  return (
    <FormControl error={error}>
      <Box
        display="grid"
        gridTemplateColumns={gridTemplateColumns}
        gridColumnGap={gridColumnGap}
        gridGap={gridGap}
        gridRowGap={gridRowGap}
        className={container}
      >
        <Select
          withCountryFlagLabel={withCountryFlagLabel}
          withCountryFlagList={withCountryFlagList}
          label={codeLabel}
          options={options}
          onChange={onChangeCode as any}
          value={codeOption as TPhoneOption}
          fontSize={fontSize}
          fontWeight={fontWeight}
          color={color}
          noCloseIcon={true}
          withSpacing={false}
          inputVariant={variant}
          name={codeName}
          size={size}
          disabled={disableCode}
        />
        <Input
          label={phoneLabel}
          fullWidth={true}
          onChange={onChangePhoneNumber}
          value={phoneValue}
          fontSize={fontSize}
          fontWeight={fontWeight}
          color={color}
          autoComplete="off"
          variant={variant}
          name={phoneName}
          size={size}
          disabled={disablePhone}
        />
      </Box>
      {error && errorMessage && (
        <HelperText className={helper}>{errorMessage}</HelperText>
      )}
    </FormControl>
  );
};

PhoneInput.defaultProps = {
  options: [],
  gridTemplateColumns: ["1fr", "5fr 7fr", "4fr 8fr", "4fr 8fr"],
  gridGap: "10px",
  phone: "",
};

export default PhoneInput;
