import React, { useMemo } from "react";
import { Box, Button, Dialog, Text } from "trolly/common";

interface IDeleteDialog {
  open: boolean;
  title?: any;
  onCancel: () => void;
  onDelete: () => void;
  isLoading?: boolean;
}
const DeleteDialog: React.FC<IDeleteDialog> = ({
  open,
  title,
  onCancel,
  onDelete,
  isLoading,
}) => {
  const titleComponent = useMemo(
    () => (
      <Text
        color="common.white"
        fontSize="16px"
        fontWeight={600}
        marginRight="30px"
      >
        {title || "Are you sure you want to delete?"}
      </Text>
    ),
    [title]
  );
  return (
    <Dialog
      open={open}
      dialogTitle={titleComponent}
      withColoredHeader
      withCloseIcon={true}
      color="danger"
      borderRadius="8px"
      onClose={onCancel}
      titlePadding="10px 15px"
    >
      <Box
        padding="20px"
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gridGap="15px"
      >
        <Button
          variant="outlined"
          customVariant="danger"
          round
          onClick={onCancel}
          fullWidth
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          customVariant="danger"
          round
          onClick={onDelete}
          isLoading={isLoading}
          fullWidth
        >
          Delete
        </Button>
      </Box>
    </Dialog>
  );
};

export default DeleteDialog;
