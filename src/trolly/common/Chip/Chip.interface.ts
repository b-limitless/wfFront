import { ChipProps } from "@material-ui/core/Chip";

export interface IChipProps extends ChipProps {
  round?: boolean;
  padding?: string;
  margin?: string;
  fontSize?: any;
  fontWeight?: number;
  customColor?: string;
  borderRadius?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  backgroundColor?: string;
}
