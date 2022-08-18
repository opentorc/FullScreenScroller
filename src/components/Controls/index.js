import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import styles from "./Controls.module.css";

const Controls = ({ count, activeSlideIndex, onClick }) => {
  const arrayForRender = useMemo(() => new Array(count).fill(true), [count]);
  const containerClassName = useMemo(() => {
    const className =
      activeSlideIndex <= 1 ? styles.containerHidden : styles.container;

    return className;
  }, [activeSlideIndex]);

  const handleClick = useCallback((index) => () => onClick(index), [onClick]);

  const renderControls = useCallback(() => {
    return arrayForRender.map((el, index) => {
      const isLastSlide =
        index === arrayForRender.length - 1 &&
        activeSlideIndex >= arrayForRender.length;
      const isActiveSlide = isLastSlide || index === activeSlideIndex - 1;

      if (isActiveSlide) {
        return (
          <div
            key={Math.random() / Math.random() + index}
            className={styles.activeSlideWrapper}
          >
            <div className={styles.activeSlide} />
          </div>
        );
      }

      return (
        <div
          key={Math.random() / Math.random() + index}
          className={styles.slide}
          onClick={handleClick(index)}
        />
      );
    });
  }, [arrayForRender, activeSlideIndex, handleClick]);

  return (
    <div className={containerClassName}>
      <span className={styles.slideNumber}>{`${
        activeSlideIndex < 10 ? "0" : ""
      }${activeSlideIndex}`}</span>
      {renderControls()}
    </div>
  );
};

Controls.propTypes = {
  count: PropTypes.number,
  activeSlideIndex: PropTypes.number,
  onClick: PropTypes.func
};

Controls.defaultProps = {
  count: 1,
  activeSlideIndex: 0,
  onClick: () => {}
};

export default Controls;
