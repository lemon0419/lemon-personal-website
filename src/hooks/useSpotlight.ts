import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Spotlight mouse tracking hook
 * Tracks mouse position relative to an element for spotlight border effects
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return ref;
}

/**
 * Scroll reveal hook — uses IntersectionObserver
 * Adds 'is-visible' class when element enters viewport
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
        ...options,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

/**
 * Magnetic button hook — subtle pull toward cursor
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  strength: number = 0.3
) {
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.setProperty('--magnetic-x', `${x * strength}px`);
      el.style.setProperty('--magnetic-y', `${y * strength}px`);
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--magnetic-x', '0px');
    el.style.setProperty('--magnetic-y', '0px');
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
