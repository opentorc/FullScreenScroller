import { ControlsStyle } from "./scroller";

interface Props {
  count: number;
  activeSlideIndex: number;
  style: ControlsStyle;
  controlsContainerClassName: string;
  slideNumberClassName: string;
  activeControlClassName: string;
  inactiveControlClassName: string;
  onClick(index: number): any;
}

export type { Props };
