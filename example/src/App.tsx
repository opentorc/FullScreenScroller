import React from "react";

import FullScreenScroller from "@torc/react-fullscreen-scroller";
import "@torc/react-fullscreen-scroller/dist/index.css";

const App = () => {
  return (
    <FullScreenScroller
      hideControlsOnFirstSlide={false}
      desktopBreakPoint={0}
      controls
    >
      <div className="screen screen-1" />
      <div className="screen screen-2" />
      <div className="screen screen-3" />
      <div className="screen screen-4" />
    </FullScreenScroller>
  );
};

export default App;
