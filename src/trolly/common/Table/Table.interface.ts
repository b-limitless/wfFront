import { Padding, TableProps } from "@material-ui/core/Table";
import { TableRowProps } from "@material-ui/core/TableRow";
import { TableHeadProps } from "@material-ui/core/TableHead";
import { TableBodyProps } from "@material-ui/core/TableBody";
import { ReactNode } from "react";
import { ETextAlign, ETheme } from "..";

export interface IStyleProps {
  maxWidth?: string;
  maxHeight?: string;
  containerWidth?: string;
  containerHeight?: string;
  margin?: string;
  headerColor?: string;
  headerBgColor?: string;
  borderRadius?: string;
  bgColor?: string;
  withBorder?: boolean;
  borderColor?: string;
  boxShadow?: any;
  borderLayout?: "vertical" | "horizontal";
  hoverColor?: ETheme;
  stickyFirstColumn?: boolean;
  stickyHeader?: boolean;
}

export type TData = {
  id: string;
  align?: ETextAlign;
  padding?: Padding;
  styles?: any;
  node?: ReactNode;
  value?: string | number | null;
};
export interface ITableProps extends TableProps, IStyleProps {
  columns: TData[];
  rows: TData[][];
  rowHeadProps?: TableRowProps;
  rowsBodyProps?: TableRowProps;
  headProps?: TableHeadProps;
  bodyProps?: TableBodyProps;
  dense?: boolean;
  paginationSize?: string;
  rowsPerPage?: number;
  withPagination?: boolean;
  color?: ETheme;
  paginationSpacing?: string;
  paginationAlignment?: "right" | "center" | "left";
  paginationPlacement?: "inside" | "outside";
  withSorting?: boolean;
  freezeHeight?: boolean;
  withResetPagination?: boolean;
  hoverColor?: ETheme;
  stickyFirstColumn?: boolean;
}
