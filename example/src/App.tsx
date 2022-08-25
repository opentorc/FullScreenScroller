import React from "react";

import FullScreenScroller from "@torc/react-fullscreen-scroller";
import "@torc/react-fullscreen-scroller/dist/index.css";

const App = () => {
  return (
    <FullScreenScroller desktopBreakPoint={0} controls>
      <div className="screen" />
      <div className="screen" />
      <div className="screen" />
      <div className="screen" />
    </FullScreenScroller>
  );
};

export default App;
