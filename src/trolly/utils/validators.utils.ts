export const isObjectEmpty = (object: any) =>
  typeof object === "undefined" || !Object.keys(object).length;

export const isEmail = (email: any) => {
  return regEx.email.test(email);
};

export const isFloat = (float: any) => {
  return regEx.float.test(float);
};

export const isNumber = (number: any) => {
  return regEx.number.test(number);
};

export const isText = (text: any) => {
  return regEx.text.test(text);
};

export const isDate = (value: string | Date | undefined | null) => {
  if (value) {
    return !isNaN(new Date(value).getDate());
  }
};

export const getPasswordErrorMessage = (value: string) => {
  if (
    !value ||
    !regEx.hasNumber.test(value) ||
    !regEx.hasUpperCase.test(value)
  ) {
    return "Password must contain at least 8 characters, including uppercase and numbers";
  } else if (value && value.length >= 8) {
    return "";
  }
  return "Password must contain at least 8 characters";
};

export const getPasswordCheckList = (value?: string) => {
  const checkList = {
    hasNumber: false,
    hasUpperCase: false,
  };
  if (value) {
    if (regEx.hasNumber.test(value)) {
      checkList.hasNumber = true;
    }
    if (regEx.hasUpperCase.test(value)) {
      checkList.hasUpperCase = true;
    }
  }
  return checkList;
};

export const regEx: { [key: string]: RegExp } = {
  float: /^(\d+(\.\d+)?)$/,
  text: /^[A-Za-z\s]*$/,
  textWithNumbers: /^[A-Za-z0-9\s]*$/,
  number: /^(\d+)$/,
  note: /(\w+)$/,
  email:
    /^[A-Za-z0-9]+?([A-Za-z0-9_\-.]+)[A-Za-z0-9-_]+[@]+[A-Za-z0-9]+?([A-Za-z0-9.]+)[.]([a-z]+)$/,
  fullPhone: /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/,
  phone: /(\d[0-9]{8,9})$/,
  hasNumber: /^(.*[0-9])/,
  hasLowerCase: /^(.*[a-z])/,
  hasUpperCase: /^(.*[A-Z])/,
};
