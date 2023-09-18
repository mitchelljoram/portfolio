// @ts-nocheck

import { useState, useEffect, useRef } from "react";

const delay = 10000;

export function WorkoutCarousel(props) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === 2 - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div my="0" mx="auto" overflow="hidden" width="800px" {...props}>
        <div
            whiteSpace="nowrap"
            transition="ease-out 1000ms"
            mb="5"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
            <div display="inline-block" width="100%" height="400px" position="relative" left="295px">
                <img src="/projects/mobile.png" alt="mobile" layout="fill"/>
                <div width="170px" position="absolute" left="21px" top="20px" justifyContent="center">
                    <img src="/projects/workout/workout.png" alt="workout-screen" layout="fill"/>
                </div>
            </div>
            <div display="inline-block" width="100%" height="400px" position="relative" left="295px">
                <img src="/projects/mobile.png" alt="mobile" layout="fill"/>
                <div width="170px" position="absolute" left="21px" top="20px" justifyContent="center">
                    <img src="/projects/workout/addExercise.png" alt="addExercise-screen" layout="fill"/>
                </div>
            </div>
        </div>

        <div
            textAlign="center"
        >
            <div
                display="inline-block"
                width="20px"
                height="20px"
                borderRadius="50%"
                margin="0 5px"
                backgroundColor={0 === index ? "#000" : "#c4c4c4"}
                cursor="pointer"
                onClick={() => {
                setIndex(0);
                }}
            />
            <div
                display="inline-block"
                width="20px"
                height="20px"
                borderRadius="50%"
                margin="0 5px"
                backgroundColor={1 === index ? "#000" : "#c4c4c4"}
                cursor="pointer"
                onClick={() => {
                setIndex(1);
                }}
            />
        </div>
    </div>
  );
}