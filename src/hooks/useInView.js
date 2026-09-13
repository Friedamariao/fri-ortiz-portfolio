import { useEffect, useRef, useState } from "react";

// Returns a ref to attach to an element and a boolean that flips to
// true the first time that element scrolls into view. Used to drive
// the constellation nodes' fade-in animation. Global reduced-motion
// handling in index.css already collapses the CSS transition to
// near-zero duration, so this hook doesn't need its own check.
function useInView(options) {
  const elementRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isInView];
}

export default useInView;