import React, { useMemo } from "react";
import {
  useStyledDefaultTab,
  useStyledDefaultTabs,
  useStyledFilledTab,
  useStyledOutlinedTab,
  useStyledOutlinedTabs,
  useStyledFilledTabs,
} from "./Tabs.style";
import { ITabsProps } from "./Tabs.interface";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const CustomizedTabs: React.FC<ITabsProps> = (props) => {
  const {
    theme,
    options,
    handleTabClick,
    value,
    minWidth,
    centered,
    tabsVariant,
    tabProps,
    tabWidth,
    repeat,
    ...rest
  } = props;

  const handleChange = (event: any, newValue: string) => {
    if (handleTabClick) {
      handleTabClick(newValue);
    }
  };

  // styles of variants
  const filledTabsClasses = useStyledFilledTabs({
    ...props,
    repeat: repeat || options.length,
    tabWidth,
  });
  const filledTabClasses = useStyledFilledTab(props);
  const outlinedTabsClasses = useStyledOutlinedTabs({
    ...props,
    repeat: repeat || options.length,
    tabWidth,
  });
  const outlinedTabClasses = useStyledOutlinedTab(props);
  const defaultTabsClasses = useStyledDefaultTabs({
    ...props,
    repeat: repeat || options.length,
    tabWidth,
  });
  const defaultTabClasses = useStyledDefaultTab({
    ...props,
    numOfTabs: repeat || options.length,
  });

  const tabsClasses = useMemo(() => {
    switch (tabsVariant) {
      case "filled":
        return filledTabsClasses;
      case "outlined":
        return outlinedTabsClasses;
      case "plain":
        return {};
      default:
        return defaultTabsClasses;
    }
  }, [tabsVariant, filledTabsClasses, outlinedTabsClasses, defaultTabsClasses]);

  const tabClasses = useMemo((): any => {
    switch (tabsVariant) {
      case "filled":
        return filledTabClasses;
      case "outlined":
        return outlinedTabClasses;
      case "plain":
        return {};
      default:
        return defaultTabClasses;
    }
  }, [tabsVariant, filledTabClasses, outlinedTabClasses, defaultTabClasses]);

  return (
    <Tabs
      value={value}
      indicatorColor={theme}
      textColor={theme}
      onChange={handleChange}
      {...rest}
      classes={rest.classes ? { ...tabsClasses, ...rest.classes } : tabsClasses}
    >
      {options &&
        options.length > 0 &&
        options.map((option) => (
          <Tab
            key={option.label}
            label={option.label}
            value={option.value}
            {...tabProps}
            classes={
              tabProps && tabProps.classes
                ? { ...tabClasses, ...tabProps.classes }
                : tabClasses
            }
          />
        ))}
    </Tabs>
  );
};

export default CustomizedTabs;