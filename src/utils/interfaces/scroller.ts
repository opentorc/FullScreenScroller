import React from "react";

interface ControlsStyle {
  container?: React.CSSProperties;
  slideNumber?: React.CSSProperties;
  activeControl?: React.CSSProperties;
  inactiveControl?: React.CSSProperties;
}

interface Props {
  children?: Array<React.ReactNode>;
  controls?: boolean;
  desktopBreakPoint?: number;
  containerStyle?: React.CSSProperties;
  controlsStyle?: ControlsStyle;
  slideContainerStyle?: React.CSSProperties;
  containerClassName?: string;
  controlsContainerClassName?: string;
  slideNumberClassName?: string;
  activeControlClassName?: string;
  inactiveControlClassName?: string;
  slideContainerClassName?: string;
  hideControlsOnFirstSlide?: boolean;
}

export type { ControlsStyle, Props };
