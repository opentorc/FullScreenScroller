A simple fullscreen scroller component built with React. Made by Opentorc

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

<ul>
  <li>Press arrow right / arrow down / page down / wheel down to scroll to next screen</li>
  <li>Press arrow left / arrow top / page up / wheel up to scroll to previos screen</li>
  <li>Press 1, 2...9 to jump to a specific screen</li>
</ul>

## Props

<ul>
  <li>controls - boolean value. Whether slide navigation will be shown. True by default</li>

  <li>desktopBreakPoint - number value. The width of the screen on which the module will work. By default 1024px</li>
</ul>
