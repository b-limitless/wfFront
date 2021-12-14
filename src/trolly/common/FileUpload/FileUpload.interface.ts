import React, { ReactElement } from "react";
import { ETheme, IButtonProps } from "..";

export type EMaxFileSizeUnit = "b" | "kb" | "mb";
export interface IFileUploadProps extends IButtonProps {
  label?: string;
  icon?: ReactElement;
  color?: ETheme;
  fileNameColor?: string;
  extensions?: string[];
  multiple?: boolean;
  isBase64?: boolean;
  file?: string | ArrayBuffer | null;
  maxFileSize?: number; // in KB
  maxFileSizeUnit?: EMaxFileSizeUnit;
  error?: boolean;
  errorMessage?: string;
  margin?: string;
  padding?: string;
  fileDownloadName?: string;
  id: string;
  onFileChange?: (file: string | ArrayBuffer | null) => void;
}
