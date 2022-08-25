import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import Controls from "./components/Controls";
import { NUMBERS_KEY_CODES_LINKING, SCROLL_KEY_CODES } from "./utils/constants";
import { Props } from "./utils/interfaces/scroller";

const FullScreenScroller: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  controls,
  desktopBreakPoint,
  containerStyle,
  controlsStyle,
  containerClassName,
  controlsContainerClassName,
  slideNumberClassName,
  activeControlClassName,
  inactiveControlClassName,
}: Props) => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [isScrollingAllowed, setIsScrollingAllowed] = useState(true);
  const [touchStartPosition, setTouchStartPosition] = useState(0);
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= desktopBreakPoint
  );

  const totalSlidesCount = useMemo(() => children.length, [children.length]);

  const scrollToPosition = useCallback(
    (direction: "top" | "bottom", position: number) => {
      window.scrollTo({
        [direction]: position,
        behavior: "smooth",
      });
    },
    []
  );

  const afterSlideChangeAction = useCallback(() => {
    setIsScrollingAllowed(false);

    setTimeout(() => {
      setIsScrollingAllowed(true);
    }, 500);
  }, []);

  const getNextActiveSlide = useCallback(
    (direction: "top" | "bottom") => {
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
          return activeSlide;
      }
    },
    [activeSlide, totalSlidesCount]
  );

  const getNextScrollPosition = useCallback(
    (direction: "top" | "bottom") => {
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
    (index: number) => {
      const nextScrollPosition = window.innerHeight * index;

      scrollToPosition("top", nextScrollPosition);

      setActiveSlide(index + 1);
    },
    [scrollToPosition]
  );

  const handleWheel = useCallback(
    function handleWheel(e: React.WheelEvent): void {
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
      afterSlideChangeAction,
    ]
  );

  const handleNumberKeyPress = useCallback(
    (keyCode: number) => {
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
    (e: React.KeyboardEvent) => {
      const { keyCode } = e;
      const isScrollKey = [
        ...SCROLL_KEY_CODES.top,
        ...SCROLL_KEY_CODES.bottom,
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
      afterSlideChangeAction,
    ]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const { changedTouches } = e;
    const { clientY } = changedTouches[0];

    setTouchStartPosition(clientY);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
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
      afterSlideChangeAction,
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

  const subscribe = useCallback(function subscribe() {
    hideScrollbar();
  }, []);

  const unsubscribe = useCallback(function unsubscribe() {
    showScrollbar();
  }, []);

  useEffect(() => {
    if (isDesktop) {
      subscribe();
    }

    window.addEventListener("resize", handleResize);

    return unsubscribe;
  }, [isDesktop, handleResize, subscribe, unsubscribe]);

  return (
    <div
      tabIndex={-1}
      className={containerClassName}
      style={containerStyle}
      onWheel={handleWheel}
      onKeyDown={handleKeyPress}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
      {controls && (
        <Controls
          count={totalSlidesCount}
          activeSlideIndex={activeSlide}
          controlsContainerClassName={controlsContainerClassName}
          slideNumberClassName={slideNumberClassName}
          activeControlClassName={activeControlClassName}
          inactiveControlClassName={inactiveControlClassName}
          style={controlsStyle}
          onClick={handleControlClick}
        />
      )}
    </div>
  );
};

FullScreenScroller.propTypes = {
  controls: PropTypes.bool,
  desktopBreakPoint: PropTypes.number,
  containerClassName: PropTypes.string,
  controlsContainerClassName: PropTypes.string,
  slideNumberClassName: PropTypes.string,
  activeControlClassName: PropTypes.string,
  inactiveControlClassName: PropTypes.string,
  containerStyle: PropTypes.object,
  controlsStyle: PropTypes.shape({
    container: PropTypes.object,
    slideNumber: PropTypes.object,
    activeControl: PropTypes.object,
    inactiveControl: PropTypes.object,
  }),
};

FullScreenScroller.defaultProps = {
  controls: true,
  desktopBreakPoint: 1024,
  containerClassName: "",
  controlsContainerClassName: "",
  slideNumberClassName: "",
  activeControlClassName: "",
  inactiveControlClassName: "",
  containerStyle: {},
  controlsStyle: {
    container: {},
    slideNumber: {},
    activeControl: {},
    inactiveControl: {},
  },
};

export default FullScreenScroller;
