import { EAnchors, ETheme } from "../common.interface";

export interface IProps {
  theme?: ETheme;
  anchor?: EAnchors;
  open: boolean;
  toggleDrawer: (
    status: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}
