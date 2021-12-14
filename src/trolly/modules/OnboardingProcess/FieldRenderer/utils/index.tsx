import React from "react";
import { Efields } from "../../OnboardingProcess.interface";
import { TInputProps } from "../../OnboardingProcess.interface";

// TODO set proper interface for get props
export interface IGetProps {
  id?: string;
  error?: boolean;
  inputProps: TInputProps;
  value: any;
  type: Efields;
}
export const getProps = ({ error, inputProps, value, type, id }: IGetProps) => {
  const {
    errorMessage,
    label,
    placeholder,
    unit,
    size = "medium",
    fontSize = "15px",
    fontWeight = 500,
    spacing,
    fontColor,
    unitPisition = "end",
    withAnimation,
    animationTimeOut,
    variant,
    dateFormat,
    linkColor,
    linkAlign,
    phoneLabel,
    codeLabel,
    withCountryFlagLabel,
    withCountryFlagList,
    maxFileSize,
    maxFileSizeUnit,
    extensions,
    fileDownloadName,
    fieldGroupConditions,
    fieldGroupInputLabel,
    fieldGroupSelectLabel,
    fieldGroupInputTitle,
    fieldGroupSelectTitle,
    fieldGroupAddButtonLabel,
    fieldGroupRemoveButtonLabel,
    fieldGroupOptionKey,
    fieldGroupValueKey,
    margin,
    padding,
    alertSeverity,
    alertType,
    disabled,
    disableCode,
    disablePhone,
    alignItems,
    listItemFontSize = "16px",
    listItemFontWeight = 500,
    // TODO: html should be handled in different way to be more secured, later make it supported by all fields
    html,
    groupLayout = "layout_1",
  } = inputProps;
  const initialProps = {} as any;
  switch (type) {
    case "text":
      initialProps["error"] = error;
      initialProps["errorMessage"] = errorMessage;
      initialProps["unit"] = unit;
      initialProps["placeholder"] = placeholder;
      initialProps["label"] = label;
      initialProps["fontColor"] = fontColor;
      initialProps["fontSize"] = fontSize;
      initialProps["fontWeight"] = fontWeight;
      initialProps["unitPosition"] = unitPisition;
      initialProps["value"] = value;
      initialProps["disabled"] = disabled;
      initialProps["id"] = id;
      break;
    case "radioGroup":
      initialProps["error"] = error;
      initialProps["errorMessage"] = errorMessage;
      initialProps["radioSize"] = size;
      initialProps["fontSize"] = fontSize;
      initialProps["fontWeight"] = fontWeight;
      initialProps["spacing"] = spacing || "10px";
      initialProps["withAnimation"] = withAnimation;
      initialProps["animationTimeOut"] = animationTimeOut;
      initialProps["value"] = value || "";
      initialProps["layout"] = groupLayout;
      initialProps["disabled"] = disabled;
      break;
    case "checkboxGroup":
      initialProps["error"] = error;
      initialProps["errorMessage"] = errorMessage;
      initialProps["checkboxSize"] = size;
      initialProps["fontSize"] = fontSize;
      initialProps["fontWeight"] = fontWeight;
      initialProps["spacing"] = spacing || "10px";
      initialProps["withAnimation"] = withAnimation;
      initialProps["animationTimeOut"] = animationTimeOut;
      initialProps["values"] = value;
      initialProps["layout"] = groupLayout;
      break;
    case "checkbox":
      initialProps["label"] =
        label ||
        (html && <div dangerouslySetInnerHTML={{ __html: html }}></div>);
      initialProps["fontSize"] = fontSize;
      initialProps["fontWeight"] = fontWeight;
      initialProps["checkboxSize"] = size;
      initialProps["alignItems"] = alignItems;
      break;
    case "select":
      initialProps["error"] = error;
      initialProps["errorMessage"] = errorMessage;
      initialProps["fontSize"] = fontSize;
      initialProps["fontWeight"] = fontWeight;
      initialProps["nativeValue"] = value;
      initialProps["label"] = label;
      initialProps["diabled"] = disabled;
      initialProps["id"] = id;
      break;
    case "searchableList":
      initialProps["error"] = error;
      initialProps["errorMessage"] = errorMessage;
      initialProps["fontSize"] = fontSize;
      initialProps["fontWeight"] = fontWeight;
      initialProps["label"] = label;
      initialProps["withCountryFlagLabel"] = withCountryFlagLabel;
      initialProps["withCountryFlagList"] = withCountryFlagList;
      initialProps["diabled"] = disabled;
      initialProps["id"] = id;
      initialProps["name"] = id;
      initialProps["listItemFontSize"] = listItemFontSize;
      initialProps["listItemFontWeight"] = listItemFontWeight;
      break;
    case "title":
      initialProps["fontSize"] = fontSize;
      initialProps["fontWeight"] = fontWeight;
      initialProps["margin"] = margin;
      break;
    case "date":
      initialProps["error"] = error;
      initialProps["errorMessage"] = errorMessage;
      initialProps["fontSize"] = fontSize;
      initialProps["fontWeight"] = fontWeight;
      initialProps["variant"] = variant;
      initialProps["label"] = label;
      initialProps["format"] = dateFormat;
      initialProps["diabled"] = disabled;
      break;
    case "link":
      initialProps["label"] = label;
      initialProps["textAlign"] = linkAlign;
      if (linkColor === "danger") {
        initialProps["color"] = linkColor;
      }
      initialProps["fontSize"] = fontSize;
      initialProps["fontWeight"] = fontWeight;
      initialProps["margin"] = margin;
      break;
    case "phone":
      initialProps["error"] = error;
      initialProps["errorMessage"] = errorMessage;
      initialProps["fontSize"] = fontSize;
      initialProps["fontWeight"] = fontWeight;
      initialProps["phoneLabel"] = phoneLabel;
      initialProps["codeLabel"] = codeLabel;
      initialProps["withCountryFlagLabel"] = withCountryFlagLabel;
      initialProps["withCountryFlagList"] = withCountryFlagList;
      initialProps["disableCode"] = disableCode;
      initialProps["disablePhone"] = disablePhone;
      break;
    case "file":
      initialProps["error"] = error;
      initialProps["errorMessage"] = errorMessage;
      initialProps["fontSize"] = fontSize;
      initialProps["fontWeight"] = fontWeight;
      initialProps["maxFileSize"] = maxFileSize;
      initialProps["maxFileSizeUnit"] = maxFileSizeUnit;
      initialProps["extensions"] = extensions;
      initialProps["label"] = label;
      initialProps["fileDownloadName"] = fileDownloadName;
      initialProps["file"] = value;
      initialProps["id"] = id;
      break;
    case "camera":
      initialProps["error"] = error;
      initialProps["errorMessage"] = errorMessage;
      initialProps["label"] = label;
      initialProps["image"] = value;
      break;
    case "fieldGroup":
      initialProps["error"] = error;
      initialProps["errorMessage"] = errorMessage;
      initialProps["inputLabel"] = fieldGroupInputLabel;
      initialProps["optionsLabel"] = fieldGroupSelectLabel;
      initialProps["inputTitle"] = fieldGroupInputTitle;
      initialProps["optionsTitle"] = fieldGroupSelectTitle;
      initialProps["conditions"] = fieldGroupConditions;
      initialProps["fontSize"] = fontSize;
      initialProps["fontWeight"] = fontWeight;
      initialProps["spacing"] = spacing;
      initialProps["values"] = value;
      initialProps["addButtonLabel"] = fieldGroupAddButtonLabel;
      initialProps["removeButtonLabel"] = fieldGroupRemoveButtonLabel;
      initialProps["optionKey"] = fieldGroupOptionKey;
      initialProps["valueKey"] = fieldGroupValueKey;
      break;
    case "alert":
      initialProps["margin"] = margin;
      initialProps["padding"] = padding;
      initialProps["fontSize"] = fontSize;
      initialProps["fontWeight"] = fontWeight;
      initialProps["severity"] = alertSeverity;
      initialProps["label"] = label;
      initialProps["type"] = alertType;
      break;
    default:
      break;
  }
  return initialProps;
};
