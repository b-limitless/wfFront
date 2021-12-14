import { appUtils } from "trolly/utils";

export const transferImageUrlToHTTPS = (
  image: string,
  shouldConvert?: boolean
) => {
  if (
    (appUtils.isProd || appUtils.isUAT) &&
    image &&
    typeof image === "string" &&
    image.indexOf("http:") > -1 &&
    shouldConvert
  ) {
    return image.replace("http:", "https:");
  }
  return image;
};
