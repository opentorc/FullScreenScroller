import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import Controls from "./components/Controls";

const SCROLL_KEY_CODES = [33, 34, 37, 38, 39, 40];

const FullPageScroll = ({ children, controls }) => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [isScrollingAllowed, setIsScrollingAllowed] = useState(true);
  const [touchStartPosition, setTouchStartPosition] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const totalSlidesCount = useMemo(() => children.length, [children.length]);

  const scrollToPosition = useCallback((direction, position) => {
    window.scrollTo({
      [direction]: position,
      behavior: "smooth",
    });
  }, []);

  const afterSlideChangeAction = useCallback(() => {
    setIsScrollingAllowed(false);

    setTimeout(() => {
      setIsScrollingAllowed(true);
    }, 1000);
  }, []);

  const getNextActiveSlide = useCallback(
    (direction) => {
      switch (true) {
        case direction === "bottom" && activeSlide === totalSlidesCount + 1: {
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
      afterSlideChangeAction,
    ]
  );

  const handleKeyPress = useCallback(
    (e) => {
      const { keyCode } = e;
      const isScrollKey = SCROLL_KEY_CODES.includes(keyCode);

      if (isScrollKey && isScrollingAllowed) {
        e.preventDefault();

        const direction =
          keyCode === 34 || keyCode === 39 || keyCode === 40 ? "bottom" : "top";
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
      afterSlideChangeAction,
    ]
  );

  const handleResize = () => setIsDesktop(window.innerWidth >= 1024);

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
        passive: false,
      });
      window.addEventListener("touchend", handleTouchEnd, {
        passive: false,
      });

      hideScrollbar();
    },
    [handleWheel, handleKeyPress, handleTouchStart, handleTouchEnd]
  );

  const unsubscribe = useCallback(
    function unsubscribe() {
      window.removeEventListener("wheel", handleWheel, { passive: false });
      window.removeEventListener("keydown", handleKeyPress, {
        passive: false,
      });
      window.removeEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      window.removeEventListener("touchend", handleTouchEnd, {
        passive: false,
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
  }, [isDesktop, subscribe, unsubscribe]);

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

FullPageScroll.propTypes = {
  controls: PropTypes.bool,
};

FullPageScroll.defaultProps = {
  controls: true,
};

export default FullPageScroll;
