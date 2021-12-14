import React, { FC, useEffect, useMemo, useState } from "react";
import Button from "../Button";
import AttachFile from "@material-ui/icons/AttachFile";
import CancelIcon from "@material-ui/icons/Delete";
import Box from "../Box";
import Text from "../Text";
import Link from "../Link";
import { IFileUploadProps } from "./FileUpload.interface";
import IconButton from "@material-ui/core/IconButton";
import { useStyles } from "./FileUpload.style";
import HelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { getExtensionFromBase64, toBase64 } from "./FileUpload.utils";

const FileUpload: FC<IFileUploadProps> = (props) => {
  const {
    label,
    icon,
    color,
    fontSize,
    fontWeight,
    multiple,
    extensions,
    errorMessage,
    error,
    maxFileSize,
    maxFileSizeUnit,
    fileDownloadName,
    file,
    disabled,
    id,
    onFileChange,
  } = props;

  const [internalError, setInternalError] = useState("");
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<
    string | ArrayBuffer | null
  >();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedFile && file) {
      setSelectedFile(selectedFile);
      setName(`${fileDownloadName}`);
    }
  }, [selectedFile, file, fileDownloadName]);
  const isError = useMemo(() => {
    if (error && errorMessage) {
      return error;
    } else if (internalError) {
      return true;
    }
  }, [error, internalError, errorMessage]);
  const message = useMemo(() => {
    if (error && errorMessage) {
      return errorMessage;
    } else if (internalError) {
      return internalError;
    }
  }, [errorMessage, internalError, error]);

  const classes = useStyles({ ...props, error: isError });

  const fileRef = React.useRef(null);

  /**
   * Prepare the button label and icon
   */
  const buttonLabel = useMemo(() => {
    let updatedLabel = "Attach";
    let updatedIcon = <AttachFile color="inherit" />;
    if (label) {
      updatedLabel = label;
    }
    if (icon) {
      updatedIcon = icon;
    }
    return (
      <Box alignItems="center" display="flex">
        <Box marginRight="5px">{updatedIcon}</Box>
        {updatedLabel}
      </Box>
    );
  }, [label, icon]);

  // the box props to be passed to all box wrappers
  const boxProps = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  };

  const handleRemove = () => {
    setInternalError("");
    setSelectedFile(null);
    setName("");
    const currentValue = fileRef.current as any;
    if (currentValue) {
      currentValue.value = "";
    }
    if (onFileChange) {
      onFileChange(null);
    }
  };

  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = (e.target.files || [])[0];
    if (file) {
      const actualSize = file.size;
      const unitDivision =
        maxFileSizeUnit === "kb"
          ? 1024
          : maxFileSizeUnit === "mb"
          ? 1024 * 1024
          : 1;
      const sizeByUnit = actualSize / unitDivision;
      if (!maxFileSize || sizeByUnit <= maxFileSize) {
        setInternalError("");
        setName(file.name);
        const base64File = await toBase64(file);
        setSelectedFile(base64File as string);
        if (onFileChange) {
          onFileChange(base64File);
        }
      } else {
        setInternalError(
          `Your file exceeded the maximum size allowed ${maxFileSize} ${maxFileSizeUnit}`
        );
      }
    }
    setLoading(false);
  };

  const linkComponent = useMemo(() => {
    if (file && typeof file === "string") {
      const extension = getExtensionFromBase64(file);
      return (
        <Link
          maxWidth={["230px", "400px"]}
          noWrap={false}
          overflow="hidden"
          textOverflow="ellipsis"
          textAlign="left"
          margin={["0px", "0 12px"]}
          fontSize={fontSize}
          fontWeight={fontWeight}
          color={color}
          anchorProps={{
            download: `${fileDownloadName}${extension}`,
          }}
          href={file}
        >
          {name}
        </Link>
      );
    }
    return (
      <Text
        noWrap={false}
        maxWidth={["230px", "400px"]}
        margin="0px 12px"
        fontSize={fontSize}
        fontWeight={fontWeight}
        color="text.primary"
      >
        {name}
      </Text>
    );
  }, [file, fileDownloadName, fontSize, fontWeight, color, name]);

  return (
    <FormControl error={isError} fullWidth={true}>
      <Box {...boxProps} className={classes.box}>
        <input
          onChange={onChangeHandler}
          className={classes.input}
          ref={fileRef}
          id={id}
          multiple={multiple}
          type="file"
          accept={extensions ? extensions.join(",") : ""}
        />
        <label htmlFor={id}>
          <Button
            component="span"
            fontSize={fontSize}
            fontWeight={fontWeight}
            aria-label="upload picture"
            disabled={loading || disabled}
            {...props}
          >
            {buttonLabel}
          </Button>
        </label>
        <Box {...boxProps} flexWrap="noWrap">
          {name && (
            <>
              {linkComponent}
              <IconButton size="medium" onClick={handleRemove}>
                <CancelIcon color="error" />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
      {message && <HelperText>{message}</HelperText>}
    </FormControl>
  );
};

FileUpload.defaultProps = {
  variant: "outlined",
  fontSize: "16px",
  fontWeight: 500,
  fileNameColor: "text.primary",
  minWidth: "170px",
  extensions: [".jpg", ".gif", ".png", ".pdf", ".jpeg"],
  multiple: false,
  maxFileSizeUnit: "mb",
  maxFileSize: 1000,
  fileDownloadName: "Wealthface",
};

export default FileUpload;
