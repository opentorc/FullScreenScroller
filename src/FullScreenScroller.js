import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import Controls from "./components/Controls";

const SCROLL_KEY_CODES = { top: [33, 37, 38], bottom: [34, 39, 40] };
const NUMBERS_KEY_CODES_LINKING = {
  49: 1,
  97: 1,
  50: 2,
  98: 2,
  51: 3,
  99: 3,
  52: 4,
  100: 4,
  53: 5,
  101: 5,
  54: 6,
  102: 6,
  55: 7,
  103: 7,
  56: 8,
  104: 8,
  57: 9,
  105: 9
};

const FullScreenScroller = ({ children, controls, desktopBreakPoint }) => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [isScrollingAllowed, setIsScrollingAllowed] = useState(true);
  const [touchStartPosition, setTouchStartPosition] = useState(0);
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= desktopBreakPoint
  );

  const totalSlidesCount = useMemo(() => children.length, [children.length]);

  const scrollToPosition = useCallback((direction, position) => {
    window.scrollTo({
      [direction]: position,
      behavior: "smooth"
    });
  }, []);

  const afterSlideChangeAction = useCallback(() => {
    setIsScrollingAllowed(false);

    setTimeout(() => {
      setIsScrollingAllowed(true);
    }, 500);
  }, []);

  const getNextActiveSlide = useCallback(
    (direction) => {
      switch (true) {
        case direction === "bottom" && activeSlide === totalSlidesCount: {
          return totalSlidesCount;
        }

        case direction === "bottom": {
          return activeSlide + 1;
        }

        case direction === "top" && activeSlide === 1: {
          return 1;
        }

        case direction === "top": {
          return activeSlide - 1;
        }

        default:
          break;
      }
    },
    [activeSlide, totalSlidesCount]
  );

  const getNextScrollPosition = useCallback(
    (direction) => {
      const nextActiveSlide = getNextActiveSlide(direction);

      switch (direction) {
        case "bottom": {
          return window.innerHeight * activeSlide;
        }

        default: {
          return window.innerHeight * (nextActiveSlide - 1);
        }
      }
    },
    [getNextActiveSlide, activeSlide]
  );

  const handleControlClick = useCallback(
    (index) => {
      const nextScrollPosition = window.innerHeight * index;

      scrollToPosition("top", nextScrollPosition);

      setActiveSlide(index + 1);
    },
    [scrollToPosition]
  );

  const handleWheel = useCallback(
    function handleWheel(e) {
      e.preventDefault();

      if (isScrollingAllowed) {
        const direction = e.deltaY > 0 ? "bottom" : "top";
        const nextActiveSlide = getNextActiveSlide(direction);
        const nextScrollPosition = getNextScrollPosition(direction);

        scrollToPosition("top", nextScrollPosition);
        afterSlideChangeAction();

        setActiveSlide(nextActiveSlide);
      }
    },
    [
      isScrollingAllowed,
      getNextActiveSlide,
      getNextScrollPosition,
      scrollToPosition,
      afterSlideChangeAction
    ]
  );

  const handleNumberKeyPress = useCallback(
    (keyCode) => {
      const nextActiveSlide = NUMBERS_KEY_CODES_LINKING[keyCode];
      const isNextSlideDefined = nextActiveSlide <= totalSlidesCount;
      const nextScrollPosition = window.innerHeight * (nextActiveSlide - 1);

      if (!isNextSlideDefined) {
        return;
      }

      scrollToPosition("top", nextScrollPosition);
      afterSlideChangeAction();

      setActiveSlide(nextActiveSlide);
    },
    [afterSlideChangeAction, scrollToPosition, totalSlidesCount]
  );

  const handleKeyPress = useCallback(
    (e) => {
      const { keyCode } = e;
      const isScrollKey = [
        ...SCROLL_KEY_CODES.top,
        ...SCROLL_KEY_CODES.bottom
      ].includes(keyCode);

      const isNumberKey = Object.prototype.hasOwnProperty.call(
        NUMBERS_KEY_CODES_LINKING,
        keyCode
      );

      if (isNumberKey) {
        handleNumberKeyPress(keyCode);

        return;
      }

      if (isScrollKey && isScrollingAllowed) {
        e.preventDefault();

        const direction = SCROLL_KEY_CODES.bottom.includes(keyCode)
          ? "bottom"
          : "top";

        const nextActiveSlide = getNextActiveSlide(direction);
        const nextScrollPosition = getNextScrollPosition(direction);

        scrollToPosition("top", nextScrollPosition);
        afterSlideChangeAction();

        setActiveSlide(nextActiveSlide);
      }
    },
    [
      isScrollingAllowed,
      handleNumberKeyPress,
      getNextActiveSlide,
      getNextScrollPosition,
      scrollToPosition,
      afterSlideChangeAction
    ]
  );

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();

    const { changedTouches } = e;
    const { clientY } = changedTouches[0];

    setTouchStartPosition(clientY);
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      e.preventDefault();

      if (isScrollingAllowed) {
        const { changedTouches } = e;
        const { clientY } = changedTouches[0];
        const direction = touchStartPosition > clientY ? "bottom" : "top";
        const nextActiveSlide = getNextActiveSlide(direction);
        const nextScrollPosition = getNextScrollPosition(direction);

        scrollToPosition("top", nextScrollPosition);
        afterSlideChangeAction();

        setActiveSlide(nextActiveSlide);
      }
    },
    [
      isScrollingAllowed,
      touchStartPosition,
      getNextActiveSlide,
      getNextScrollPosition,
      scrollToPosition,
      afterSlideChangeAction
    ]
  );

  const handleResize = useCallback(
    () => setIsDesktop(window.innerWidth >= desktopBreakPoint),
    [desktopBreakPoint]
  );

  const hideScrollbar = () => {
    const html = document.getElementsByTagName("html")[0];

    html.style.overflowY = "hidden";
  };

  const showScrollbar = () => {
    const html = document.getElementsByTagName("html")[0];

    html.style.overflowY = "visible";
  };

  const subscribe = useCallback(
    function subscribe() {
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("keydown", handleKeyPress, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, {
        passive: false
      });
      window.addEventListener("touchend", handleTouchEnd, {
        passive: false
      });

      hideScrollbar();
    },
    [handleWheel, handleKeyPress, handleTouchStart, handleTouchEnd]
  );

  const unsubscribe = useCallback(
    function unsubscribe() {
      window.removeEventListener("wheel", handleWheel, { passive: false });
      window.removeEventListener("keydown", handleKeyPress, {
        passive: false
      });
      window.removeEventListener("touchstart", handleTouchStart, {
        passive: false
      });
      window.removeEventListener("touchend", handleTouchEnd, {
        passive: false
      });

      showScrollbar();
    },
    [handleWheel, handleKeyPress, handleTouchStart, handleTouchEnd]
  );

  useEffect(() => {
    if (isDesktop) {
      subscribe();
    }

    window.addEventListener("resize", handleResize);

    return unsubscribe;
  }, [isDesktop, handleResize, subscribe, unsubscribe]);

  return (
    <div>
      {children}
      {controls && (
        <Controls
          count={totalSlidesCount}
          activeSlideIndex={activeSlide}
          onClick={handleControlClick}
        />
      )}
    </div>
  );
};

FullScreenScroller.propTypes = {
  controls: PropTypes.bool,
  desktopBreakPoint: PropTypes.number
};

FullScreenScroller.defaultProps = {
  controls: true,
  desktopBreakPoint: 1024
};

export default FullScreenScroller;
