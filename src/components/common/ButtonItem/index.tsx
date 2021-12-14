import React, { useMemo } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "./ButtonItem.style";
import EditIcon from "@material-ui/icons/Edit";
import ButtonItemBase from "./ButtonItemBase";
import { Box, ETheme, Text } from "trolly/common";
import { Icon } from "trolly/icons";
import { format, isDate } from "date-fns";

interface IProps {
  icon: "basket" | "watchlist";
  title: string;
  subTitle?: string;
  type?: "user" | "wealthface";
  width?: number;
  height?: number;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  tooltipDescription?: string;
  toolTipIcon?: React.ReactElement;
  iconColor?: ETheme | string;
  padding?: string | number;
  createdAt?: string;
}

const ButtonItem: React.FC<IProps> = ({
  icon,
  onClick,
  onEdit,
  onDelete,
  title,
  subTitle,
  iconColor,
  toolTipIcon,
  tooltipDescription,
  type,
  createdAt,
  ...rest
}) => {
  const { deleteButton, editButton, subTitleClass, titleClass, wrapText } =
    useStyles(rest);

  const handleDelete = (e: any) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  const handleEdit = (e: any) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  const createdDate = useMemo(() => {
    if (createdAt && isDate(new Date(createdAt))) {
      return format(new Date(createdAt), "dd'-'MMM'-'yyy");
    }
  }, [createdAt]);

  const titleComponent = useMemo(() => {
    if (title) {
      return (
        <>
          {createdDate && (
            <Text
              fontSize="13px"
              fontWeight={600}
              color={type === "user" ? "secondary.main" : "primary.main"}
              mt="15px"
            >
              Created at: {createdDate}
            </Text>
          )}
          {title && (
            <Text
              mt={!createdDate ? "25px" : "0px"}
              lineHeight="31px"
              className={`${wrapText} ${titleClass}`}
            >
              {title}
            </Text>
          )}
          {subTitle && <Text className={subTitleClass}>{subTitle}</Text>}
        </>
      );
    }
  }, [title, type, wrapText, createdDate, titleClass, subTitle, subTitleClass]);

  return (
    <ButtonItemBase padding="5px 16px" onClick={onClick} {...rest}>
      <Box display="flex" flexDirection="column" mt="10px">
        {icon === "watchlist" ? (
          <Icon
            iconName="Watchlist"
            iconSize="L"
            color={type === "wealthface" ? "primary" : "secondary"}
          />
        ) : (
          <Icon
            iconName="Basket"
            iconSize="L"
            color={type === "wealthface" ? "primary" : "secondary"}
          />
        )}
        {titleComponent}
      </Box>

      {onEdit && (
        <IconButton className={editButton} type="button" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      )}
      {onDelete && (
        <IconButton
          className={deleteButton}
          type="button"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </ButtonItemBase>
  );
};

export default ButtonItem;
