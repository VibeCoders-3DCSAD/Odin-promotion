import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const BEAT = 18;

export const useSpringEntrance = (
  delay = 0,
  config?: Record<string, number>,
) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const progress = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping: 15, mass: 1, ...config },
  });
  return progress;
};

export const entranceDir = (
  progress: number,
  dir: "up" | "down" | "left" | "right" | "scale" | "scaleUp",
): React.CSSProperties => {
  let transform = "";
  switch (dir) {
    case "up":
      transform = `translateY(${interpolate(progress, [0, 1], [60, 0])}px)`;
      break;
    case "down":
      transform = `translateY(${interpolate(progress, [0, 1], [-60, 0])}px)`;
      break;
    case "left":
      transform = `translateX(${interpolate(progress, [0, 1], [80, 0])}px)`;
      break;
    case "right":
      transform = `translateX(${interpolate(progress, [0, 1], [-80, 0])}px)`;
      break;
    case "scale":
      transform = `scale(${interpolate(progress, [0, 1], [0.85, 1])})`;
      break;
    case "scaleUp":
      transform = `scale(${interpolate(progress, [0, 1], [1.15, 1])})`;
      break;
  }
  return { opacity: progress, transform };
};

export const useCounter = (delay: number, target: number, duration = 24) => {
  const frame = useCurrentFrame();
  const p = Math.min(1, Math.max(0, (frame - delay) / duration));
  const eased = 1 - Math.pow(1 - p, 3);
  return eased * target;
};
