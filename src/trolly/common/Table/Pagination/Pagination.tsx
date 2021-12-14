import React, {
  FunctionComponent,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from "react";
import Direction from "./Direction";
import Button from "./Button";
import { getPagesNumbers, shouldShowCollapse } from "./Pagination.utils";
import Box from "../../Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Text from "../../Text";
import { ETheme } from "../..";

export interface IPaginationControlElenent {
  totalPages: number;
  currentPage: number;
  onNextClick: () => void;
  onBackClick: () => void;
  onPageNumberClick: (pageNumber: number) => void;
  fontSize?: string;
  color?: ETheme;
  spacing?: string;
  align?: "left" | "center" | "right";
}

const PaginationControl: FunctionComponent<IPaginationControlElenent> = ({
  totalPages,
  currentPage,
  onNextClick,
  onBackClick,
  onPageNumberClick,
  fontSize,
  color,
  spacing,
  align,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [pagesButtons, setPagesButtons] = useState<any[]>();

  const pagesNumbers = useMemo(
    () => getPagesNumbers(currentPage, totalPages, isMobile),
    [currentPage, totalPages, isMobile]
  );

  const onBtnClick = useCallback(
    (btnNumber: number): any => {
      if (currentPage !== btnNumber) {
        onPageNumberClick(btnNumber);
      } else {
        return;
      }
    },
    [currentPage, onPageNumberClick]
  );

  const renderButtons = useCallback(() => {
    if (pagesNumbers) {
      setPagesButtons(
        pagesNumbers.map((pageNumber) => {
          return (
            <Button
              key={`${pageNumber}`}
              active={pageNumber === currentPage}
              onClick={onBtnClick}
              pageNumber={pageNumber}
              fontSize={fontSize}
              color={color}
            />
          );
        })
      );
    }
  }, [pagesNumbers, currentPage, onBtnClick, fontSize, color]);

  useEffect(() => {
    renderButtons();
  }, [renderButtons]);

  return (
    <>
      {totalPages > 1 && (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          margin={spacing}
          justifyContent={
            align === "right"
              ? "flex-end"
              : align === "left"
              ? "flex-start"
              : align
          }
        >
          <Direction
            onClick={onBackClick}
            disabled={currentPage === 1}
            direction="left"
            fontSize={fontSize}
            color={color}
          />
          <Button
            active={currentPage === 1}
            onClick={onBtnClick}
            pageNumber={1}
            fontSize={fontSize}
            color={color}
          />
          {shouldShowCollapse("left", totalPages, currentPage, isMobile) && (
            <Text fontSize={fontSize}>...</Text>
          )}
          {pagesButtons}
          {shouldShowCollapse("right", totalPages, currentPage, isMobile) && (
            <Text fontSize={fontSize}>...</Text>
          )}
          <Button
            active={currentPage === totalPages}
            onClick={onBtnClick}
            pageNumber={totalPages}
            fontSize={fontSize}
            color={color}
          />
          <Direction
            onClick={onNextClick}
            disabled={currentPage === totalPages}
            direction="right"
            fontSize={fontSize}
            color={color}
          />
        </Box>
      )}
    </>
  );
};

PaginationControl.defaultProps = {
  currentPage: 1,
  spacing: "0px",
};

export default PaginationControl;
