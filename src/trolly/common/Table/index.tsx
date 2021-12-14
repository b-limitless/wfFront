import React, { useEffect, useMemo } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead, { TableHeadProps } from "@material-ui/core/TableHead";
import TableRow, { TableRowProps } from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { useStyles, useHeadStyles } from "./Table.style";
import { ITableProps } from "..";
import { TData } from "./Table.interface";
import Pagination from "./Pagination/Pagination";

function descendingComparator(a: TData[], b: TData[], orderBy: string) {
  const aObj = (a.filter((x) => x.id === orderBy)[0] || {}) as TData;
  const bObj = (b.filter((x) => x.id === orderBy)[0] || {}) as TData;
  if (aObj.value && bObj.value) {
    if (bObj.value < aObj.value) {
      return -1;
    }
    if (bObj.value > aObj.value) {
      return 1;
    }
    return 0;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator(
  order: Order,
  orderBy: string
): (a: TData[], b: TData[]) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(
  rows: TData[][],
  comparator: (a: TData[], b: TData[]) => number
) {
  const stabilizedThis = rows.map(
    (row: TData[], index: number) => [row, index] as [TData[], number]
  );
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
  headProps?: TableHeadProps;
  rowProps?: TableRowProps;
  columns?: TData[];
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  withSorting?: boolean;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
    headProps = {},
    rowProps = {},
    columns = [],
    withSorting,
  } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const sortLabelClasses = useHeadStyles();

  return (
    <TableHead className={classes.header} {...headProps}>
      <TableRow {...rowProps}>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.padding}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.headerCell}
            style={{ ...(headCell.styles || {}) }}
          >
            {withSorting ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                classes={sortLabelClasses}
              >
                {headCell.node}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.node
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTable: React.FC<ITableProps> = (props) => {
  const {
    maxHeight,
    margin,
    maxWidth,
    borderRadius,
    containerHeight,
    containerWidth,
    dense,
    rowHeadProps,
    rowsBodyProps,
    headerColor,
    headerBgColor,
    rows,
    columns,
    bodyProps,
    headProps,
    withBorder,
    borderColor,
    paginationSize,
    rowsPerPage: rowsPerPageProp = 5,
    withPagination,
    paginationSpacing,
    paginationAlignment,
    color,
    paginationPlacement,
    withSorting,
    freezeHeight,
    withResetPagination,
    boxShadow,
    borderLayout,
    hoverColor,
    // we should use colors with no opacity to
    // prevent any colors interception
    stickyFirstColumn,
    ...rest
  } = props;
  const classes = useStyles({
    maxHeight,
    margin,
    borderRadius,
    maxWidth,
    containerHeight,
    containerWidth,
    headerColor,
    withBorder,
    borderColor,
    headerBgColor,
    boxShadow,
    borderLayout,
    hoverColor,
    stickyFirstColumn,
    stickyHeader: rest.stickyHeader,
  });
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("");
  const [page, setPage] = React.useState(0);

  // decide if the table has pagination , if not render all rows
  const rowsPerPage = useMemo(() => {
    if (withPagination) {
      return rowsPerPageProp;
    }
    return rows.length;
  }, [rowsPerPageProp, rows, withPagination]);

  const totalPages = useMemo(() => {
    if (rows && rows.length && rowsPerPage) {
      return Math.ceil(rows.length / rowsPerPage);
    }
    return 0;
  }, [rows, rowsPerPage]);

  useEffect(() => {
    if (withResetPagination) {
      setPage(0);
    }
  }, [withResetPagination, totalPages]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const onNextClick = () => {
    if (page + 1 < totalPages) {
      setPage((old) => old + 1);
    }
  };

  const onBackClick = () => {
    if (page - 1 >= 0) {
      setPage((old) => old - 1);
    }
  };

  const onPageNumberClick = (pageNumber: number) => {
    setPage(pageNumber - 1);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <>
      <TableContainer className={classes.container}>
        <Table
          {...rest}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            classes={classes}
            columns={columns}
            withSorting={withSorting}
          />
          <TableBody className={classes.body} {...bodyProps}>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={`${index}`}>
                  {row.map(({ id, align, node, padding, styles = {} }) => (
                    <TableCell
                      padding={padding}
                      key={id}
                      align={align}
                      style={{ ...styles }}
                      className={classes.tableCell}
                    >
                      {node}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {emptyRows > 0 && totalPages > 1 && freezeHeight && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={6} className={classes.tableCell} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        {withPagination &&
          paginationPlacement === "inside" &&
          totalPages > 1 && (
            <Pagination
              fontSize={paginationSize}
              onNextClick={onNextClick}
              onBackClick={onBackClick}
              totalPages={totalPages}
              currentPage={page + 1}
              onPageNumberClick={onPageNumberClick}
              color={color}
              spacing={paginationSpacing}
              align={paginationAlignment}
            />
          )}
      </TableContainer>
      {withPagination &&
        paginationPlacement === "outside" &&
        totalPages > 1 && (
          <Pagination
            fontSize={paginationSize}
            onNextClick={onNextClick}
            onBackClick={onBackClick}
            totalPages={totalPages}
            currentPage={page + 1}
            onPageNumberClick={onPageNumberClick}
            color={color}
            spacing={paginationSpacing}
            align={paginationAlignment}
          />
        )}
    </>
  );
};

EnhancedTable.defaultProps = {
  paginationSize: "14px",
  withPagination: true,
  paginationPlacement: "outside",
  freezeHeight: false,
};

export default EnhancedTable;
