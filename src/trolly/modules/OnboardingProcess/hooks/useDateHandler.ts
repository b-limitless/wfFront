import { useEffect, useState } from "react";
import { TField } from "../OnboardingProcess.interface";

const useDateHandler = (
  field: TField,
  value: any,
  onChangeHandler: (...args: any) => void
) => {
  useEffect(() => {
    const { type, defaultValue } = field;
    const { value: incomingValue } = defaultValue || {};
    let convertedDate;
    if (type === "date") {
      if (value) {
        convertedDate = new Date(value);
        if (!isNaN(convertedDate.getDate())) {
          setDate(convertedDate);
        } else {
          const { birthDay, birthMonth, birthYear } = value;
          if (birthDay && birthMonth && birthYear) {
            setDate(new Date(birthYear, birthMonth - 1, birthDay));
          }
        }
      } else {
        if (incomingValue) {
          setDate(new Date(incomingValue as string));
        }
        setDate(null);
      }
    }
  }, [field, value]);
  const [date, setDate] = useState<Date | null>(null);
  const onChangeDateHandler = (value: Date | null, date: string) => {
    setDate(value);
    onChangeHandler(value, date);
  };

  return [onChangeDateHandler, date];
};

export default useDateHandler;
