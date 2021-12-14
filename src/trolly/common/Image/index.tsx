import React, { ImgHTMLAttributes, useState } from "react";
import ImageIcon from "@material-ui/icons/ImageSearch";
import { makeStyles } from "@material-ui/core";
import { Box, ETheme, Skeleton } from "..";

interface IImageStyleProps {
  width?: string | number;
  height?: string | number;
  margin?: string;
  isLoading?: boolean;
  loaderVariant?: "circle" | "rect";
}
const useImageStyles = makeStyles({
  root: {
    width: ({ width = "auto" }: IImageStyleProps) => width,
    height: ({ height = "auto" }) => height,
    margin: ({ margin = "0px" }) => margin,
    display: ({ isLoading }) => (isLoading ? "none" : "block"),
  },
  nonImageLoaded: {
    width: ({ width = "auto" }: IImageStyleProps) => width,
    height: ({ height = "auto" }) => height,
    margin: ({ margin = "0px" }) => margin,
    borderRadius: "10px",
  },
  loader: {
    boxSizing: "border-box",
    margin: ({ margin = "0px" }: IImageStyleProps) => margin,
    borderRadius: "4px",
  },
});

interface IImageProps
  extends ImgHTMLAttributes<HTMLImageElement>,
    IImageStyleProps {
  color?: ETheme;
}
const Image: React.FC<IImageProps> = ({
  color,
  src,
  alt,
  isLoading,
  loaderVariant,
  ...rest
}) => {
  const [isFallImage, setIsFallImage] = useState<boolean>(false);
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const classes = useImageStyles({
    ...rest,
    isLoading: isLocalLoading || isLoading,
  });

  // on error handler
  const onErrorHandler = () => {
    setIsFallImage(true);
    setIsLocalLoading(false);
  };

  // on image download
  const handleImageLoad = () => {
    setIsLocalLoading(false);
  };

  if (isLoading) {
    return (
      <Skeleton width={rest.width || "auto"} height={rest.height || "auto"} />
    );
  } else if (!isFallImage && src) {
    return (
      <>
        {isLocalLoading && (
          <Box
            width={isLocalLoading ? "auto" : rest.width || "auto"}
            height={isLocalLoading ? "auto" : rest.height || "auto"}
          >
            <Skeleton
              variant={loaderVariant}
              className={classes.loader}
              width="100%"
              height="100%"
              {...rest}
            />
          </Box>
        )}
        <img
          {...rest}
          src={src}
          alt={alt}
          onError={onErrorHandler}
          onLoad={handleImageLoad}
          className={classes.root}
        />
      </>
    );
  }
  return <ImageIcon className={classes.nonImageLoaded} color={color} />;
};

Image.defaultProps = {
  loaderVariant: "rect",
};

export default Image;
