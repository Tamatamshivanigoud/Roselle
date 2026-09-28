import { useEffect, useRef, useState } from 'react';

export function useInView(ref?: React.RefObject<Element>, options?: IntersectionObserverInit) {
  const internalRef = useRef<Element>(null);
  const targetRef = ref || internalRef;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return isInView;
}
