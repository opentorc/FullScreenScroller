A simple fullscreen scroller component built with React. Made by Opentorc

Please check the [demo](https://9fun92.csb.app/).

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

function App() {
  <FullScreenScroller>
    <div>
      <p>First screen</p>
    </div>

    <div>
      <p>Second screen</p>
    </div>
  </FullScreenScroller>;
}
```

## Basic features

<ul>
  <li>Press arrow right / arrow down / page down / wheel down to scroll to next screen</li>
  <li>Press arrow left / arrow top / page up / wheel up to scroll to previos screen</li>
</ul>

## Props

<ul>
  <li>controls - boolean value. Whether slide navigation will be shown. True by default</li>
</ul>
