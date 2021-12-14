export type TGroupOption = {
  id: string;
  label: string;
  value: string;
};

export type ELayouts = "layout_1" | "layout_2" | "layout_3";

export type EAnimation = "slide" | "fade" | "grow";

export interface IAnimationProps {
  animationTimeOutFixed?: number;
  withAnimation?: boolean;
  index: number;
}
