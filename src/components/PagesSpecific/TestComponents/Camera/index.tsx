import React, { useState } from "react";
import { Box, Camera } from "trolly/common";

const CameraComp: React.FC<{ color: any }> = ({ color }) => {
  const [image, setImage] = useState<string | null>(null);

  const onImageChange = (image: string | null, imageSize: number) => {
    setImage(image);
    console.log(imageSize, "image size");
  };
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Camera
        color={color}
        image={image}
        onImageChange={onImageChange}
        selectedImageHeight="50px"
        selectedImageWidth="50px"
        withCloseIcon
      />
    </Box>
  );
};

export default CameraComp;
