import _ from "lodash";
import { isDate } from "./validators.utils";
import { format } from "date-fns";
export const countDecimal = (number: number) => {
  if (Math.floor(number) === number) return 0;
  return number.toString().split(".")[1].length || 0;
};
/**
 *
 * @param number (number | null | undefined | string)
 * @param decimalNo (number)
 * @returns
 */
export const formatDecimal = (
  number: number | undefined | null | string,
  decimalNo: number,
  options?: { ignoreForceDecimal?: boolean }
): number | undefined | null | string => {
  const { ignoreForceDecimal } = options || {};
  if ((number || number === 0) && decimalNo > -1) {
    const convertedNumber = Number(number);
    if (
      !isNaN(convertedNumber) &&
      (countDecimal(convertedNumber) > decimalNo || !ignoreForceDecimal)
    ) {
      return convertedNumber.toFixed(decimalNo);
    }
    return number;
  }
  return number;
};

/**
 * 
 * @param value value which to check if object or not
 * @returns 
 */
export const isObject = (value: any) => {
  // less cost in comparison
  return !(
    !value ||
    Array.isArray(value) ||
    isDate(value) ||
    typeof value === "undefined" ||
    typeof value === "string" ||
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol"
  );
};

export const isObjectAndEmpty = (value: any) => {
  let empty: any[] = [];
  if (isObject(value)) {
    Object.keys(value).forEach((key) => {
      if (!value[key]) {
        empty.push(true);
      } else {
        empty.push(false);
      }
    });
  }
  return empty.length > 0 ? empty.filter((x) => !x).length === 0 : false;
};

export const isEmpty = (value: any) => {
  return (
    !value ||
    typeof value === "undefined" ||
    value === "" ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    value.length === 0
  );
};

export const countryToFlag = (isoCode: string) => {
  let value;
  value =
    typeof String.fromCodePoint !== "undefined"
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) =>
            String.fromCodePoint(char.charCodeAt(0) + 127397)
          )
      : null;
  return value;
};

export const CapString = (textString?: string) => {
  if (textString && typeof textString === "string") {
    return textString.charAt(0).toUpperCase() + textString.slice(1);
  }
  return textString;
};

export const scrollToTop = (behavior: ScrollBehavior = "smooth") => {
  window.scrollTo({ top: 0, behavior });
};

export const formatNumberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatNumberWithUnit = (
  value?: number | undefined,
  toDecimal?: number
): string | undefined => {
  const decimal = toDecimal ? toDecimal : -1;
  if (value) {
    if (value > 999999999999999) {
      return `${formatDecimal(value / 1000000000000000, decimal)}q`;
    } else if (value > 999999999999) {
      return `${formatDecimal(value / 1000000000000, decimal)}T`;
    } else if (value > 999999999) {
      return `${formatDecimal(value / 1000000000, decimal)}B`;
    } else if (value > 999999) {
      return `${formatDecimal(value / 1000000, decimal)}M`;
    } else if (value > 9999) {
      return `${formatDecimal(value / 1000, decimal)}K`;
    }
    return `${value}`;
  }
  return `${value}`;
};

/**
 *
 * @param {*} error
 * workarround wolution to get the error message based on some mess from the returned
 * response of different sources of API
 */
export const destructError = (
  error: any
): { errorMessage: string; statusCode: number } => {
  let errorMessage;
  let statusCode;
  const { response } = error;
  const { message } = error;
  if (message) {
    errorMessage = message;
    statusCode = response ? response.status : 500;
  } else if (response) {
    errorMessage = response.data.message;
    statusCode = response.status;
  } else if (error.constructor === "".constructor) {
    errorMessage = error;
    statusCode = 401;
  } else {
    statusCode = 500;
    errorMessage = "Oops! Something went wrong please try again later";
  }
  return { errorMessage, statusCode };
};

/**
 *
 * @param {*} date
 * convert timestamp to Month Day, year
 * ex: September 25, 1987
 */
export const formatDate = (
  date: number | Date,
  options: {
    isFull?: boolean;
    getObject?: boolean;
    isLocal?: boolean;
    withTime?: boolean;
    monthNaming?: "full" | "part";
  }
) => {
  const {
    isFull,
    getObject,
    isLocal,
    withTime,
    monthNaming = "full",
  } = options;
  if (date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const shortcutMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthsArr = monthNaming === "full" ? months : shortcutMonths;
    const newDate =
      typeof date === "number"
        ? new Date(isFull ? date : date * 1000)
        : new Date(date);
    const day = isLocal ? newDate.getDate() : newDate.getUTCDate();
    const month = isLocal
      ? monthsArr[newDate.getMonth()]
      : monthsArr[newDate.getUTCMonth()];
    const year = isLocal ? newDate.getFullYear() : newDate.getUTCFullYear();
    const hours = isLocal ? newDate.getHours() : newDate.getUTCHours();
    const minutes = isLocal ? newDate.getMinutes() : newDate.getUTCMinutes();
    const seconds = isLocal ? newDate.getSeconds() : newDate.getUTCSeconds();
    if (getObject) {
      return {
        day,
        month,
        year,
        hours,
        minutes,
        seconds,
      };
    }
    if (withTime) {
      return `${month} ${day}, ${year} at ${hours > 9 ? hours : `0${hours}`}:${
        minutes > 9 ? minutes : `0${minutes}`
      }:${seconds > 9 ? seconds : `0${seconds}`}`;
    }
    return `${month} ${day}, ${year}`;
  }
};

/*
 * responsible to get the date format based on the chart data period
 */
export const formatChartsDate = (date: Date, options: { period: any }) => {
  const { period } = options;
  if (date) {
    if (!isNaN(+period)) {
      if (+period === 1) {
        return format(date, "kk':'mm");
      } else if (+period > 1 && +period < 8) {
        return format(date, "EEE");
      } else if (+period > 8 && +period < 365) {
        return format(date, "MMM', 'dd");
      } else {
        return format(date, "MMM','yyy");
      }
    } else {
      switch (period) {
        case "1d":
          return format(date, "kk':'mm");
        case "5d":
          return format(date, "EEE");
        case "1m":
          return format(date, "MMM', 'dd");
        case "3m":
          return format(date, "MMM', 'dd");
        default:
          return format(date, "MMM','yyy");
      }
    }
  }
  return date;
};

/**
 * responsible to get the interval positions of the chart xAxis
 * @param dataToLoop the array of xAxis data
 * @param numberOfTicks how many ticks you need to place in the xAxis
 * @param checkFrom when the length of the array is exceed this arg then pass the array of placements
 */
export const getIntervalPositions = (
  dataToLoop: any[],
  numberOfTicks: number,
  checkFrom: number
) => {
  const ticksArray = Array.from(Array(numberOfTicks).keys());
  if (dataToLoop.length > checkFrom) {
    return [
      0,
      ...ticksArray.map((number, index) =>
        Math.ceil(((dataToLoop.length - 2) / numberOfTicks) * index)
      ),
      dataToLoop.length - 1,
    ];
  }
  return dataToLoop.map((text, index) => index);
};

/**
 * standard way to get the initial regulation from the website
 */
export const getInitialRegulation = (): string | null => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("wealthface_regulation");
  }
  return null;
};

/**
 * convert array of keys to object
 */
export const convertArrayOfKeysToObject = (
  keys: string[],
  value: any
): object => {
  let initialObject = {};
  if (keys) {
    for (let i = keys.length - 1; i >= 0; i--) {
      if (i === keys.length - 1) {
        initialObject = { [keys[i]]: value };
      } else {
        initialObject = { [keys[i]]: { ...initialObject } };
      }
    }
  }
  return initialObject;
};

/**
 * get the environment
 */
export const isProd =
  window.location.hostname === "wealthface.com" ? true : false;

export const isUAT =
  window.location.hostname === "demo.wealthface.ca" ? true : false;

/**
 *
 * @returns string
 * responsible to make new id
 */
export const getRandomId = (radix: number, length: number): string => {
  const newId = Math.random().toString(radix).substring(length);
  return newId;
};

export const cleanObject = (obj: any) => {
  const internalClean = (obj: any) => {
    return _.transform(obj, (result: any, value, key) => {
      var isCollection = _.isObject(value);
      var cleaned = isCollection ? internalClean(value) : value;

      if (isCollection && _.isEmpty(cleaned)) {
        return;
      }

      _.isArray(result) ? result.push(cleaned) : (result[key] = cleaned);
    });
  };

  return _.isObject(obj) ? internalClean(obj) : obj;
};

export const getAgeFromDate = (dateString: string) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const addToToday = (options: {
  days?: number;
  months?: number;
  years?: number;
  format?: "yyyyMMdd";
}) => {
  const today = new Date();
  const { days = 0, months = 0, years = 0, format } = options;
  const newDate = new Date(today.setHours(0, 0, 0, 0));
  if (days > 0) {
    newDate.setDate(today.getDate() + days);
  }
  if (months > 0) {
    newDate.setMonth(today.getMonth() + months);
  }
  if (years > 0) {
    newDate.setFullYear(today.getFullYear() + years);
  }
  if (format && format === "yyyyMMdd") {
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${year}${month < 10 ? `0${month}` : month}${
      day < 10 ? `0${day}` : day
    }`;
  }
  return newDate.toISOString().replace(/\.\d+Z/, "Z");
};

export const removeFromToday = (options: {
  days?: number;
  months?: number;
  years?: number;
  format?: "yyyyMMdd";
}) => {
  const today = new Date();
  const { days = 0, months = 0, years = 0, format } = options;
  const newDate = new Date(today.setHours(0, 0, 0, 0));
  if (days > 0) {
    newDate.setDate(today.getDate() - days);
  }
  if (months > 0) {
    newDate.setMonth(today.getMonth() - months);
  }
  if (years > 0) {
    newDate.setFullYear(today.getFullYear() - years);
  }
  if (format && format === "yyyyMMdd") {
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${year}${month < 10 ? `0${month}` : month}${
      day < 10 ? `0${day}` : day
    }`;
  }
  return newDate.toISOString().replace(/\.\d+Z/, "Z");
};

export const ascendingSort = (
  arr: any[],
  keyToCompare: string,
  type?: "date"
) => {
  if (arr.length > 2) {
    return arr.sort((prev, next) => {
      if (type === "date") {
        const prevDate = new Date(prev[keyToCompare]);
        const nextDate = new Date(next[keyToCompare]);
        if (prevDate > nextDate) {
          return -1;
        }
        if (prevDate < nextDate) {
          return 1;
        }
        return 0;
      } else {
        if (prev[keyToCompare] > next[keyToCompare]) {
          return -1;
        }
        if (prev[keyToCompare] < next[keyToCompare]) {
          return 1;
        }
        return 0;
      }
    });
  }
  return arr;
};

export const descendingSort = (
  arr: any[],
  keyToCompare: string,
  type?: "date"
) => {
  if (arr.length > 2) {
    return arr.sort((prev, next) => {
      if (type === "date") {
        const prevDate = new Date(prev[keyToCompare]);
        const nextDate = new Date(next[keyToCompare]);
        if (prevDate < nextDate) {
          return -1;
        }
        if (prevDate > nextDate) {
          return 1;
        }
        return 0;
      } else {
        if (prev[keyToCompare] < next[keyToCompare]) {
          return -1;
        }
        if (prev[keyToCompare] > next[keyToCompare]) {
          return 1;
        }
        return 0;
      }
    });
  }
  return arr;
};

export const formatTime = (time: number) => {
  return time < 10 ? `0${time}` : time;
};