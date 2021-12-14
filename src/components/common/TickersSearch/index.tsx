import { AutocompleteRenderOptionState } from "@material-ui/lab/Autocomplete";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { Box, Image, ISelectProps, Select, TSelectOption } from "trolly/common";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { TRADE_GET_INSTRUMENTS_LIST_AF } from "store/store.types";

const useStyles = makeStyles((theme: Theme) => ({
  name: {
    fontSize: "13px",
    fontWeight: 500,
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  nameContainer: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    color: `${theme.palette.text.secondary} !important`,
  },
  symbol: {
    fontSize: "13px",
    fontWeight: 600,
  },
}));
const TickersSearch: React.FC<
  Omit<ISelectProps, "options" | "loading" | "customRenderOption">
> = (props) => {
  // styling elements
  const { palette } = useTheme();
  const { theme } = useAppInfo();
  const classes = useStyles();

  //loading state
  const { isLoading } = useApiInfo(TRADE_GET_INSTRUMENTS_LIST_AF);
  //

  const { instrumentsListAf = [] } = useSelector(
    (state: IAppState) => state.trade
  );
  const searchOptions = useMemo(() => {
    if (instrumentsListAf && instrumentsListAf.length > 0) {
      return instrumentsListAf.map(({ id_: id, name, symbol, image }) => ({
        value: id,
        label: `${symbol} | ${name}`,
        image,
      }));
    }
    return [];
  }, [instrumentsListAf]);

  const renderOption = useCallback(
    (option: TSelectOption, { inputValue }: AutocompleteRenderOptionState) => {
      const { label, image } = option as any;
      const [symbol, name] = label.split("|");
      const symbolMatches = match(symbol, inputValue);
      const symbolParts = parse(symbol, symbolMatches);
      const nameMatched = match(name, inputValue);
      const nameParts = parse(name, nameMatched);

      const symbolText = (
        <Box display="block" width={100} marginLeft="8px">
          {symbolParts.map((part, index) => (
            <span
              key={`${index}_${part.text}`}
              style={{
                color: part.highlight
                  ? palette[theme].main
                  : palette.text.primary,
              }}
              className={classes.symbol}
            >
              {part.text}
            </span>
          ))}
        </Box>
      );

      const nameText = (
        <Box display="block" className={classes.nameContainer}>
          {nameParts.map((part, index) => (
            <span
              key={`${index}_${part.text}`}
              style={{
                color: part.highlight
                  ? palette[theme].main
                  : palette.text.secondary,
              }}
              className={classes.name}
            >
              {part.text}
            </span>
          ))}
        </Box>
      );

      return (
        <Box
          display="flex"
          flexDirection="row"
          width="100%"
          flexWrap="nowrap"
          alignContent="center"
          alignItems="center"
        >
          <Image
            src={image}
            alt={`${symbolText}_icon`}
            width={35}
            height={35}
            color="secondary"
          />
          {symbolText} {nameText}
        </Box>
      );
    },
    [classes, palette, theme]
  );
  return (
    <Select
      {...props}
      options={searchOptions}
      customRenderOption={renderOption}
      loading={isLoading}
      virtualizedListItemStyles={{ borderBottom: "1px solid #DCDCDC" }}
    />
  );
};

export default TickersSearch;
