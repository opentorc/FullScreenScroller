import React from "react";

interface ControlsStyle {
  container?: Object;
  slideNumber?: Object;
  activeControl?: Object;
  inactiveControl?: Object;
}

interface Props {
  children?: Array<React.ReactNode>;
  controls?: boolean;
  desktopBreakPoint?: number;
  containerStyle?: Object;
  controlsStyle?: ControlsStyle;
  containerClassName?: string;
  controlsContainerClassName?: string;
  slideNumberClassName?: string;
  activeControlClassName?: string;
  inactiveControlClassName?: string;
}

export type { ControlsStyle, Props };
