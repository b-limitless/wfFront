import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import {
  Select,
  Input,
  DatePicker,
  TSelectOption,
  Box,
  ETheme,
  Alert,
  Button,
} from "trolly/common";

export type TFilterOption = {
  name: string;
  type: "search" | "select" | "dateRange";
  label: string;
  dateStartLabel?: string;
  dateEndLabel?: string;
  options?: TSelectOption[];
};

export interface IFiltersProps {
  options: TFilterOption[];
  onChange: (filters: { [key: string]: any }) => void;
  color?: ETheme;
  initialFilters?: { [key: string]: any };
}

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    color: "#898989",
    marginLeft: "-10px",
  },
  button: {
    width: "150px",
    marginLeft: "15px",
    height: "40px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: "0px",
      marginTop: "15px",
    },
  },
}));
const Filters: React.FC<IFiltersProps> = ({
  options,
  onChange,
  color,
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const [error, setError] = useState("");
  const classes = useStyles();

  const onChangeStartDateHandler = useCallback(
    (value: Date | null) => {
      setError("");
      setFilters({ ...filters, startDate: value });
    },
    [filters]
  );

  const onChangeEndDateHandler = useCallback(
    (value: Date | null) => {
      setError("");
      setFilters({ ...filters, endDate: value });
    },
    [filters]
  );

  const onChangeSelectHandler = useCallback(
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setError("");
      setFilters({ ...filters, [name]: event.target.value });
    },
    [filters]
  );

  const onChangeInputHandler = useCallback(
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setError("");
      setFilters({ ...filters, [name]: event.target.value });
    },
    [filters]
  );

  const gridTemplateRepeat = useMemo(() => {
    if (options && options.length > 0) {
      if (options.filter((option) => option.type === "dateRange")) {
        return options.length + 1;
      }
      return options.length;
    }
    return 1;
  }, [options]);

  const onFilterClick = () => {
    const startDate = filters.startDate;
    const endDate = filters.endDate;
    if (startDate && endDate) {
      if (new Date(startDate) <= new Date(endDate)) {
        onChange(filters);
      } else {
        setError("Start date should be earlier than end date");
      }
    } else if (!startDate && !endDate) {
      setError("");
      onChange(filters);
    } else {
      if (!startDate && endDate) {
        setError("Make sure to specify from date field");
      } else if (startDate && !endDate) {
        setError("Make sure to specify to date field");
      }
    }
  };

  const renderFiltersOptions = useMemo(() => {
    return options.map(
      ({ options, type, label, name, dateStartLabel, dateEndLabel }, index) => {
        switch (type) {
          case "select":
            return (
              <Select
                key={`${index}_${name}`}
                onNativeChange={onChangeSelectHandler(name) as any}
                variant="native"
                options={options || []}
                label={label}
                size="small"
                inputVariant="outlined"
                color={color}
                nativeValue={filters[name] || ""}
              />
            );
          case "search":
            return (
              <Input
                key={`${index}_${name}`}
                onChange={onChangeInputHandler(name) as any}
                variant="outlined"
                size="small"
                placeholder={label}
                value={filters[name]}
                color={color}
                inputStartPadding="5px"
                startAdornment={
                  <InputAdornment position="end">
                    <SearchIcon className={classes.icon} />
                  </InputAdornment>
                }
              />
            );
          case "dateRange":
            return (
              <React.Fragment key={`${index}_${name}`}>
                <DatePicker
                  label={dateStartLabel || "From"}
                  value={filters.startDate || null}
                  onChange={onChangeStartDateHandler}
                  size="small"
                  inputVariant="outlined"
                  variant="dialog"
                  color={color}
                />
                <DatePicker
                  label={dateEndLabel || "To"}
                  value={filters.endDate || null}
                  onChange={onChangeEndDateHandler}
                  size="small"
                  inputVariant="outlined"
                  variant="dialog"
                  color={color}
                />
              </React.Fragment>
            );
          default:
            return null;
        }
      }
    );
  }, [
    options,
    filters,
    onChangeStartDateHandler,
    onChangeEndDateHandler,
    onChangeSelectHandler,
    onChangeInputHandler,
    classes,
    color,
  ]);
  return (
    <>
      {error && (
        <Alert severity="error" icon={<></>} margin="0 0 10px 0">
          {error}
        </Alert>
      )}
      <Box display="flex" flexDirection={["column", "column", "row", "row"]}>
        <Box
          gridTemplateColumns={[
            "1fr",
            "1fr",
            `repeat(${gridTemplateRepeat}, 1fr)`,
            `repeat(${gridTemplateRepeat}, 1fr)`,
          ]}
          gridGap="20px"
        >
          {renderFiltersOptions}
        </Box>
        <Button
          variant="contained"
          color="secondary"
          round
          onClick={onFilterClick}
          className={classes.button}
        >
          Filter
        </Button>
      </Box>
    </>
  );
};

Filters.defaultProps = {
  color: "secondary",
};

export default Filters;
