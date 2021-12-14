import { ReactElement } from "react";
import { IButtonProps } from "..";

export interface ICameraProps extends Partial<IButtonProps> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  icon?: ReactElement;
  capturedLabel?: string;
  capturedIcon?: ReactElement;
  cameraWidth?: number;
  cameraHeight?: number;
  frameWidth?: number | string;
  frameHeight?: number | string;
  dialogWidth?: string;
  margin?: string;
  selectedImageWidth?: string;
  selectedImageHeight?: string;
  onImageChange?: (file: string | null, fileSize: number) => void;
  image?: string | null;
  screenshotQuality?: number; // 0 1o 1
  isLoading?: boolean;
  withCloseIcon?: boolean;
}
