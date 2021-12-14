export type TThemeModes = "dark" | "light";

export type TThemeVariants = "primary" | "secondary";
export interface IProps {
  extraTheme?: any;
  themeMode?: TThemeModes;
  themeVariant?: TThemeVariants;
}
