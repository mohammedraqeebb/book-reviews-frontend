import React, { useState, useRef, useEffect } from 'react';

const useHorizontalMouseScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [lastX, setLastX] = useState(0);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      event.stopPropagation();
      setClicked(true);
      setLastX(event.clientX);
    };

    const handleMouseUp = (event: MouseEvent) => {
      event.stopPropagation();
      setClicked(false);
    };

    const handleMouseMove = (event: MouseEvent) => {
      event.preventDefault();

      if (!clicked) return;

      const diff = lastX - event.clientX;
      containerRef.current!.scrollLeft += diff;
      setLastX(event.clientX);
    };

    const handleMouseLeave = (event: MouseEvent) => {
      // event.preventDefault();
      // event.stopPropagation();

      setClicked(false);
    };

    const current = containerRef.current;
    if (!current || !current) {
      return;
    }

    current.addEventListener('mousedown', handleMouseDown);
    current.addEventListener('mouseup', handleMouseUp);
    current.addEventListener('mousemove', handleMouseMove);
    current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      current.removeEventListener('mousedown', handleMouseDown);
      current.removeEventListener('mouseup', handleMouseUp);
      current.removeEventListener('mousemove', handleMouseMove);
      current.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [clicked, lastX]);

  return containerRef;
};

export default useHorizontalMouseScroll;
