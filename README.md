A simple fullscreen scroller component built with React. Made by [Opentorc](https://home.opentorc.com/)

## Installation

**npm:**

```sh
npm install @torc/react-fullscreen-scroller
```

**yarn:**

```sh
yarn add @torc/react-fullscreen-scroller
```

## Getting started with React FullScreen Scroller

Here is an example of a basic using `FullScreenScroller` component:

```jsx
import React from "react";
import FullScreenScroller from "@torc/react-fullscreen-scroller";
import "@torc/react-fullscreen-scroller/dist/index.css";

function App() {
  <FullScreenScroller desktopBreakPoint={768} controls>
    <div>
      <p>First screen</p>
    </div>

    <div>
      <p>Second screen</p>
    </div>
  </FullScreenScroller>;
}
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/9fun92?resolutionWidth=1024&resolutionHeight=675)

## Basic features

| Action                                                  |                   Description |
| :------------------------------------------------------ | ----------------------------: |
| Press arrow right / arrow down / page down / wheel down |     Scroll to the next screen |
| Press arrow left / arrow top / page up / wheel up       | Scroll to the previous screen |
| Press 1, 2...9                                          |     Jump to a specific screen |

## Props

| Name                          | Type    | Description                                                  | Default value |
| :---------------------------- | :------ | :----------------------------------------------------------- | ------------: |
| controls                      | boolean | Whether slide navigation will be shown                       |          true |
| desktopBreakPoint             | number  | The width of the device screen on which the module will work |          1024 |
| containerStyle                | object  | The styles object for the parent container of the scroller   |            {} |
| controlsStyle.container       | object  | The styles object for the parent container of the controls   |            {} |
| controlsStyle.slideNumber     | object  | The styles object for the current slide number               |            {} |
| controlsStyle.activeControl   | object  | The styles object for the active control circle              |            {} |
| controlsStyle.inactiveControl | object  | The styles object for the inactive control circle            |            {} |
| containerClassName            | string  | className for the parent container of the scroller           |            "" |
| controlsContainerClassName    | string  | className for the parent container of the controls           |            "" |
| slideNumberClassName          | string  | className for the current slide number                       |            "" |
| activeControlClassName        | string  | className for the active control circle                      |            "" |
| inactiveControlClassName      | string  | className for the inactive control circle                    |            "" |
