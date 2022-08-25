import PropTypes from "prop-types";
import React, { useCallback, useMemo } from "react";

import { ControlsProps } from "../../utils/interfaces/controls";
import styles from "./Controls.module.css";

const Controls: React.FC<ControlsProps> = ({
  count,
  activeSlideIndex,
  style,
  controlsContainerClassName,
  slideNumberClassName,
  activeControlClassName,
  inactiveControlClassName,
  onClick,
}: ControlsProps) => {
  const arrayForRender = useMemo(() => new Array(count).fill(true), [count]);
  const containerClassName = useMemo(() => {
    const className =
      activeSlideIndex <= 1 ? styles.containerHidden : styles.container;

    return className;
  }, [activeSlideIndex]);

  const handleClick = useCallback(
    (index: number) => () => onClick(index),
    [onClick]
  );

  const renderControls = useCallback(() => {
    return arrayForRender.map((_, index) => {
      const isLastSlide =
        index === arrayForRender.length - 1 &&
        activeSlideIndex >= arrayForRender.length;
      const isActiveSlide = isLastSlide || index === activeSlideIndex - 1;

      if (isActiveSlide) {
        return (
          <div
            key={Math.random() / Math.random() + index}
            className={`${styles.activeSlideWrapper} ${activeControlClassName}`}
            style={style.activeControl}
          >
            <div className={styles.activeSlide} />
          </div>
        );
      }

      return (
        <div
          key={Math.random() / Math.random() + index}
          className={`${styles.slide} ${inactiveControlClassName}`}
          style={style.inactiveControl}
          onClick={handleClick(index)}
        />
      );
    });
  }, [
    arrayForRender,
    activeSlideIndex,
    style,
    activeControlClassName,
    inactiveControlClassName,
    handleClick,
  ]);

  return (
    <div
      className={`${containerClassName} ${controlsContainerClassName}`}
      style={style.container}
    >
      <span
        className={`${styles.slideNumber} ${slideNumberClassName}`}
        style={style.slideNumber}
      >{`${activeSlideIndex < 10 ? "0" : ""}${activeSlideIndex}`}</span>
      {renderControls()}
    </div>
  );
};

Controls.propTypes = {
  count: PropTypes.number.isRequired,
  activeSlideIndex: PropTypes.number.isRequired,
  controlsContainerClassName: PropTypes.string,
  slideNumberClassName: PropTypes.string,
  activeControlClassName: PropTypes.string,
  inactiveControlClassName: PropTypes.string,
  style: PropTypes.shape({
    container: PropTypes.object,
    slideNumber: PropTypes.object,
    activeControl: PropTypes.object,
    inactiveControl: PropTypes.object,
  }),
  onClick: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  controlsContainerClassName: "",
  slideNumberClassName: "",
  activeControlClassName: "",
  inactiveControlClassName: "",
  style: {
    container: {},
    slideNumber: {},
    activeControl: {},
    inactiveControl: {},
  },
};

export default Controls;
