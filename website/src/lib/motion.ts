import { animate, stagger, cubicBezier } from 'animejs';

/**
 * Motion constants extracted from original launcher app
 * (net.stratalauncher.ui.MotionConstants and CURVES.md)
 */
export const DURATIONS = {
  FAST: 220,
  NORMAL: 420,
  SLOW: 680,
} as const;

export const EASINGS = {
  standard: cubicBezier(0.25, 0.1, 0.25, 1),
  emphasis: cubicBezier(0.22, 1, 0.36, 1),
  express: cubicBezier(0.2, 0.8, 0.2, 1),
};

export function animatePageEnter(element: HTMLElement | null, reducedMotion: boolean) {
  if (!element || reducedMotion) return;
  animate(element, {
    opacity: [0, 1],
    x: [18, 0],
    duration: DURATIONS.NORMAL,
    easing: EASINGS.standard,
  });
}

export function animateSidebarItems(elements: (HTMLElement | null)[], reducedMotion: boolean) {
  const validElements = elements.filter((el): el is HTMLElement => el !== null);
  if (validElements.length === 0 || reducedMotion) return;

  animate(validElements, {
    opacity: [0, 1],
    x: [-12, 0],
    delay: stagger(32),
    duration: DURATIONS.NORMAL,
    easing: EASINGS.standard,
  });
}

export function animateButtonScale(
  element: HTMLElement | null,
  scale: number,
  reducedMotion: boolean
) {
  if (!element || reducedMotion) return;
  animate(element, {
    scale,
    duration: DURATIONS.FAST,
    easing: EASINGS.standard,
  });
}
