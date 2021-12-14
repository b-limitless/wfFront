import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import Button from "../Button";
import Box from "../Box";
import Dialog from "../Dialog";
import FormControl from "@material-ui/core/FormControl";
import HelperText from "@material-ui/core/FormHelperText";
import { ICameraProps } from "./Camera.interface";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Webcam from "react-webcam";
import { useBoxStyles } from "./Camera.style";
import CancelIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Camera: FC<ICameraProps> = (props) => {
  const {
    error,
    errorMessage,
    label,
    icon,
    cameraWidth,
    cameraHeight,
    frameWidth,
    frameHeight,
    dialogWidth,
    color,
    fullWidth,
    selectedImageHeight,
    selectedImageWidth,
    screenshotQuality,
    isLoading,
    capturedIcon,
    capturedLabel,
    image,
    onImageChange,
    withCloseIcon,
  } = props;
  const [open, setOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const isSmallMobile = useMediaQuery("(max-width:290px)");

  // box around the initial button wrapper styles
  const { box } = useBoxStyles(props);

  useEffect(() => {
    if (image && !selectedImage && !capturedImage) {
      setCapturedImage(image);
      setSelectedImage(image);
    }
  }, [image, capturedImage, selectedImage]);

  const webcamRef = React.useRef(null);

  const calculateImageSize = (base64Image: string) => {
    if (base64Image) {
      const numberOfEquals =
        base64Image.substring(base64Image.length - 2) === "==" ? 2 : 1;
      return base64Image.length * (3 / 4) - numberOfEquals;
    }
    return 0;
  };

  // responsible to open the camera dialog
  const openCameraDialog = () => {
    setOpen(true);
    if (image) {
      setCapturedImage(image);
    }
  };

  //onSelect screenshot
  const onSelect = () => {
    if (image !== capturedImage) {
      setSelectedImage(capturedImage);
      if (onImageChange) {
        onImageChange(capturedImage, calculateImageSize(capturedImage));
      }
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  // capture screenshot
  const captureOrRetake = useCallback(() => {
    if (capturedImage) {
      setCapturedImage("");
      // add parent remove handler also
    } else {
      if (webcamRef && webcamRef.current) {
        const source = webcamRef.current as any;
        const imageSrc = source.getScreenshot();
        setCapturedImage(imageSrc);
      }
    }
  }, [webcamRef, capturedImage]);

  const handleRemoveImage = () => {
    setSelectedImage("");
    setCapturedImage("");
    if (onImageChange) {
      onImageChange(null, 0);
    }
  };

  const closeCameraDialog = () => {
    if (!image) {
      setCapturedImage("");
    }
    setOpen(false);
  };

  // Button Children
  const buttonLabel = useMemo(() => {
    let updatedLabel = "";
    let updatedIcon = <CameraIcon color="inherit" />;

    if (image) {
      updatedLabel = capturedLabel || "Preview";
      updatedIcon = icon || <CameraIcon color="inherit" />;
    } else {
      updatedLabel = label || "Take a photo";
      updatedIcon = capturedIcon || <CameraIcon color="inherit" />;
    }
    return (
      <Box display="flex" alignItems="center">
        <Box marginRight="5px">{updatedIcon}</Box>
        {updatedLabel}
      </Box>
    );
  }, [label, icon, image, capturedIcon, capturedLabel]);

  const cameraComponent = useMemo(() => {
    if (capturedImage) {
      return <img src={capturedImage} alt="selfie" />;
    }
    return (
      <Box display="flex" justifyContent="center">
        <Webcam
          width={frameWidth}
          height={frameHeight}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={screenshotQuality}
          videoConstraints={{
            width: cameraWidth,
            height: cameraHeight,
            facingMode: "user",
          }}
        />
      </Box>
    );
  }, [
    capturedImage,
    cameraHeight,
    cameraWidth,
    screenshotQuality,
    frameWidth,
    frameHeight,
  ]);

  return (
    <FormControl error={error} fullWidth={fullWidth}>
      <Box
        className={box}
        display="flex"
        flexDirection={["column", "row", "row", "row"]}
      >
        <Button {...props} onClick={openCameraDialog}>
          {buttonLabel}
        </Button>
        {image && (
          <Box
            marginLeft={["0px", "15px"]}
            display="flex"
            alignItems="center"
            marginTop={["15px", "0px"]}
          >
            <img
              src={image}
              alt="selfie"
              width={selectedImageWidth}
              height={selectedImageHeight}
            />
            <IconButton
              size="medium"
              onClick={handleRemoveImage}
              disabled={isLoading}
            >
              <CancelIcon color="error" />
            </IconButton>
          </Box>
        )}
      </Box>
      {errorMessage && error && <HelperText>{errorMessage}</HelperText>}
      <Dialog
        open={open}
        onBackdropClick={closeCameraDialog}
        onClose={closeCameraDialog}
        p="30px"
        withCloseIcon={withCloseIcon}
        actions={
          <>
            <Box
              width="100%"
              display="flex"
              flexDirection={
                isSmallMobile ? "column" : ["row", "row", "row", "row"]
              }
              justifyContent="space-between"
              marginTop="25px"
            >
              <Button
                color={color}
                variant="contained"
                onClick={captureOrRetake}
                margin="10px 10px 0 0"
                round
                fullWidth={isSmallMobile}
              >
                <CameraIcon color="inherit" />
                <Box marginLeft="10px">
                  {capturedImage ? "Retake" : "Capture"}
                </Box>
              </Button>
              <Button
                disabled={!capturedImage}
                color={color}
                variant="contained"
                onClick={onSelect}
                margin="10px 0px"
                round
                isLoading={isLoading}
                fullWidth={isSmallMobile}
              >
                Select
              </Button>
            </Box>
          </>
        }
      >
        <Box width={dialogWidth}>{cameraComponent}</Box>
      </Dialog>
    </FormControl>
  );
};

Camera.defaultProps = {
  color: "primary",
  variant: "contained",
  fontSize: "16px",
  round: true,
  minWidth: "170px",
  cameraWidth: 1280,
  cameraHeight: 729,
  frameHeight: 400,
  frameWidth: "100%",
  dialogWidth: "100%",
  padding: "12px 0px",
  selectedImageHeight: "60px",
  selectedImageWidth: "60px",
  screenshotQuality: 0.8,
  capturedLabel: "Preview",
  withCloseIcon: false,
};

export default Camera;
