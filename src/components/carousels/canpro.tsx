// @ts-nocheck

import { useState, useEffect, useRef } from "react";

const delay = 3000;

export function CanproCarousel(props) {
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
          prevIndex === 3 - 1 ? 0 : prevIndex + 1
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
            <div display="inline-block" width="100%" height="400px" position="relative" left="50px">
                <img src="/projects/desktop.png" alt="desktop" layout="fill"/>
                <div width="530px" position="absolute" left="85px" top="20px" justifyContent="center">
                    <img src="/projects/canpro/canpro-desktop.png" alt="canpro-desktop" layout="fill"/>
                </div>
            </div>
            <div display="inline-block" width="100%" height="400px" position="relative" left="114px">
                <img src="/projects/tablet.png" alt="desktop" layout="fill"/>
                <div width="475px" position="absolute" left="35px" top="35px" justifyContent="center">
                    <img src="/projects/canpro/canpro-tablet.png" alt="canpro-tablet" layout="fill"/>
                </div>
            </div>
            <div display="inline-block" width="100%" height="400px" position="relative" left="295px">
                <img src="/projects/mobile.png" alt="mobile" layout="fill"/>
                <div width="172.5px" position="absolute" left="20px" top="20px" justifyContent="center">
                    <img src="/projects/canpro/canpro-mobile.png" alt="canpro-mobile" layout="fill"/>
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
            <div
                display="inline-block"
                width="20px"
                height="20px"
                borderRadius="50%"
                margin="0 5px"
                backgroundColor={2 === index ? "#000" : "#c4c4c4"}
                cursor="pointer"
                onClick={() => {
                setIndex(2);
                }}
            />
        </div>
    </div>
  );
}