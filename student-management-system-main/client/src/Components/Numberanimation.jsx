import React, { useState, useEffect } from 'react';

const Numberanimation = ({ number, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = number;
    const increment = 1; // Increment to reach the target number in the given duration

    const animation = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(animation);
      } else {
        setCount(start);
      }
    }, 56); // Update every second

    return () => clearInterval(animation); // Cleanup function to clear the interval
  }, [number, duration]);

  return <h1>+{count}</h1>;
};

export default Numberanimation;
