/* eslint-disable no-use-before-define */
// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
import React, { useCallback, useMemo } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  AutocompleteRenderGroupParams,
} from "@material-ui/lab/Autocomplete";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import Text from "../Text";
import { useListStyles, useVirtualizedStyles } from "./Select.style";
import {
  useStyleFilledInput,
  useStyleOutlinedInput,
  useStyleLabelInput,
} from "../common.style";
import { ISelectProps, TSelectOption } from "./Select.interface";
import Loader from "./Loader";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import NativeSelect from "./NativeSelect";
import InputAdornment from "@material-ui/core/InputAdornment";

const LISTBOX_PADDING = 8; // px

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { children, styles, ...other } = props as any;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 48 : 60;

  const getChildSize = (child: React.ReactNode) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };
  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    return React.cloneElement(data[index], {
      style: {
        ...style,
        ...styles,
        top: (style.top as number) + LISTBOX_PADDING,
      },
    });
  }

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
          useIsScrolling
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const renderGroup = (params: AutocompleteRenderGroupParams) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

const VirtualizeSelect: React.FC<ISelectProps> = (props) => {
  const {
    disableUnderline,
    fontSize,
    fontWeight,
    fontColor,
    color,
    error,
    errorMessage,
    label,
    variant,
    withCountryFlagLabel,
    withCountryFlagList,
    noCloseIcon,
    name,
    listItemFontSize,
    listItemFontWeight,
    inputVariant,
    customRenderOption,
    listWidth,
    searchIconPosition,
    placeholder,
    searchIconSpacing,
    width,
    height,
    disabled,
    virtualizedListItemStyles,
    ...rest
  } = props;
  // Classes applied to autocomplete component
  const { searchIcon, inputAdornment, ...restVirtualizedClasses } =
    useVirtualizedStyles({
      width,
      height,
      searchIconSpacing,
      variant,
      color,
      withCountryFlagList,
      inputStartPadding: rest.inputStartPadding,
      searchIconPosition,
    });

  const { popper } = useListStyles({ listWidth });

  // classes applied to the filled input
  const filledInputClasses = useStyleFilledInput({
    ...props,
    isSelect: true,
    isLabeled: props.label ? true : false,
  });

  // classes applied to the outlined input
  const outlinedInputClasses = useStyleOutlinedInput({
    ...props,
    isSelect: true,
    isLabeled: props.label ? true : false,
  });

  // classes applied to the outlined input
  // const outlinedInputClasses = useStyleOutlinedInput();

  const labelFilledClasses = useStyleLabelInput({
    ...props,
    inputVariant: "filled",
  });

  const labelOutlinedClasses = useStyleLabelInput({
    ...props,
    inputVariant: "outlined",
  });

  const theme = useTheme();

  //convert iso3 to flag to be used in phone
  const countryToFlag = (iso2?: string) => {
    let value;
    if (iso2) {
      value =
        typeof String.fromCodePoint !== "undefined"
          ? iso2
              .toUpperCase()
              .replace(/./g, (char) =>
                String.fromCodePoint(char.charCodeAt(0) + 127397)
              )
          : null;
      return value;
    }
    return value;
  };

  // function to get label based on props
  const getOptionLabel = ({ label = "", iso2 }: TSelectOption) => {
    if (!withCountryFlagLabel && label) {
      return label;
    } else if (iso2 && label) {
      return `${countryToFlag(iso2)}${" "}${label}`;
    }
    return label;
  };

  const getOptionSelected = (option: TSelectOption, value: TSelectOption) =>
    option && option.value === value.value;

  //render option in the list if with country flag or not
  const renderOption = ({ label, iso2 }: TSelectOption) => {
    let updatedLabel = label;
    if (withCountryFlagList) {
      updatedLabel = iso2 ? `${countryToFlag(iso2)}${" "}${label}` : label;
    }
    return (
      <Text
        noWrap
        fontSize={listItemFontSize}
        fontWeight={listItemFontWeight}
        color={fontColor}
        variant="body2"
      >
        {updatedLabel}
      </Text>
    );
  };

  // styles applied to chips if multiple is true
  const chipProps = useMemo(() => {
    if (color === "primary") {
      return {
        style: {
          backgroundColor: theme.palette.primary.light,
          marginTop: "10px",
        },
      };
    }
    return {
      style: {
        backgroundColor: theme.palette.secondary.light,
        marginTop: "10px",
      },
    };
  }, [color, theme]);

  // render Text fieeld based on input variant , TextField cannot accept re-rendering based on inputVariant
  // need to be stored in a memo
  const renderInputComponent = useCallback(
    (params) => {
      if (inputVariant === "filled") {
        return (
          <TextField
            {...params}
            helperText={error ? errorMessage : ""}
            error={error}
            InputLabelProps={{
              classes: labelFilledClasses,
            }}
            inputProps={{
              ...params.inputProps,
              // to stop the browser auto fill - TODO: think for other solution
              name,
              autoComplete: "off",
            }}
            InputProps={{
              disableUnderline: error ? false : disableUnderline,
              disabled,
              error: error,
              classes: filledInputClasses,
              placeholder: placeholder,
              ...params.InputProps,
              startAdornment: variant === "search" &&
                searchIconPosition === "start" && (
                  <InputAdornment position="start" className={inputAdornment}>
                    <SearchIcon className={searchIcon} />
                  </InputAdornment>
                ),
            }}
            variant="filled"
            label={label}
            color={error ? "primary" : color}
          />
        );
      }
      return (
        <TextField
          {...params}
          helperText={error ? errorMessage : ""}
          error={error}
          InputLabelProps={{
            classes: labelOutlinedClasses,
          }}
          inputProps={{
            ...params.inputProps,
            // to stop the browser auto fill - TODO: think for other solution
            name,
            autoComplete: "off",
          }}
          InputProps={{
            disableUnderline: error ? false : disableUnderline,
            error: error,
            disabled,
            classes: outlinedInputClasses,
            placeholder: placeholder,
            ...params.InputProps,
            startAdornment: variant === "search" &&
              searchIconPosition === "start" && (
                <InputAdornment position="start">
                  <SearchIcon className={searchIcon} />
                </InputAdornment>
              ),
          }}
          variant="outlined"
          label={label}
          color={color}
        />
      );
    },
    [
      inputVariant,
      color,
      error,
      disableUnderline,
      errorMessage,
      label,
      filledInputClasses,
      outlinedInputClasses,
      name,
      labelFilledClasses,
      labelOutlinedClasses,
      searchIconPosition,
      variant,
      inputAdornment,
      searchIcon,
      placeholder,
      disabled,
    ]
  );

  const autoCompleteClasses = useMemo(() => {
    if (listWidth) {
      return {
        ...restVirtualizedClasses,
        popper,
      };
    }
    return restVirtualizedClasses;
  }, [restVirtualizedClasses, popper, listWidth]);

  const popupIcon = useMemo(() => {
    if (variant === "search" && searchIconPosition === "end") {
      return <SearchIcon />;
    } else if (variant === "default") {
      return <ArrowDropDownIcon />;
    }
    return null;
  }, [variant, searchIconPosition]);
  if (variant !== "native") {
    return (
      <Autocomplete
        disableListWrap
        classes={autoCompleteClasses}
        ListboxComponent={
          ListboxComponent as React.ComponentType<
            React.HTMLAttributes<HTMLElement>
          >
        }
        ListboxProps={{
          styles: virtualizedListItemStyles || {},
        }}
        loadingText={<Loader />}
        getOptionLabel={getOptionLabel}
        getOptionSelected={getOptionSelected}
        renderGroup={renderGroup}
        ChipProps={chipProps}
        popupIcon={popupIcon}
        closeIcon={noCloseIcon && ""}
        autoComplete={true}
        renderInput={renderInputComponent}
        renderOption={customRenderOption || renderOption}
        disabled={disabled}
        {...rest}
      />
    );
  }
  return <NativeSelect {...props} />;
};

VirtualizeSelect.defaultProps = {
  variant: "default",
  disableUnderline: true,
  inputVariant: "filled",
  searchIconPosition: "end",
  searchIconSpacing: "0px",
};

export default VirtualizeSelect;