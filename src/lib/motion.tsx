"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type Easing = number[] | string;

type Transition = {
  duration?: number;
  delay?: number;
  ease?: Easing;
  repeat?: number;
};

type MotionTarget = {
  opacity?: number;
  x?: number | string;
  y?: number | string;
  scale?: number;
  scaleX?: number;
  pathLength?: number;
  width?: number | string;
  height?: number | string;
};

type MotionProps = HTMLAttributes<HTMLElement> & {
  initial?: MotionTarget | false;
  animate?: MotionTarget;
  whileInView?: MotionTarget;
  exit?: MotionTarget;
  viewport?: { once?: boolean; margin?: string };
  transition?: Transition;
  variants?: {
    hidden?: MotionTarget;
    visible?: MotionTarget & { transition?: Transition };
  };
  style?: CSSProperties;
  children?: ReactNode;
};

function toTransform(target?: MotionTarget): string {
  if (!target) return "";
  const parts: string[] = [];
  if (target.x !== undefined) {
    parts.push(`translateX(${typeof target.x === "number" ? `${target.x}px` : target.x})`);
  }
  if (target.y !== undefined) {
    parts.push(`translateY(${typeof target.y === "number" ? `${target.y}px` : target.y})`);
  }
  if (target.scale !== undefined) {
    parts.push(`scale(${target.scale})`);
  }
  if (target.scaleX !== undefined) {
    parts.push(`scaleX(${target.scaleX})`);
  }
  return parts.join(" ");
}

function buildStyle(
  target: MotionTarget | undefined,
  transition?: Transition,
): CSSProperties {
  const style: CSSProperties = {
    transition: transition
      ? `all ${transition.duration ?? 0.6}s ${Array.isArray(transition.ease) ? "cubic-bezier(" + transition.ease.join(",") + ")" : transition.ease ?? "ease"} ${transition.delay ?? 0}s`
      : undefined,
  };

  if (target?.opacity !== undefined) style.opacity = target.opacity;
  if (target?.width !== undefined) style.width = target.width;
  if (target?.height !== undefined) style.height = target.height;

  if (target?.scaleX !== undefined) style.transformOrigin = "left center";

  const transform = toTransform(target);
  if (transform) style.transform = transform;

  if (target?.pathLength !== undefined) {
    style.strokeDasharray = "1";
    style.strokeDashoffset = String(1 - target.pathLength);
  }

  return style;
}

function useMotionState(
  initial: MotionTarget | false | undefined,
  animate: MotionTarget | undefined,
  whileInView: MotionTarget | undefined,
  viewport: MotionProps["viewport"],
  transition: Transition | undefined,
  variants: MotionProps["variants"],
) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!whileInView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (viewport?.once) observer.disconnect();
        } else if (!viewport?.once) {
          setInView(false);
        }
      },
      { rootMargin: viewport?.margin ?? "0px", threshold: 0.1 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [whileInView, viewport?.once, viewport?.margin]);

  const hiddenState = variants?.hidden ?? (initial === false ? undefined : initial);
  const visibleState =
    variants?.visible ?? whileInView ?? animate ?? hiddenState;

  const activeTransition = variants?.visible?.transition ?? transition;

  let currentStyle: CSSProperties;
  if (!mounted) {
    currentStyle = buildStyle(hiddenState, { ...activeTransition, duration: 0 });
  } else if (whileInView) {
    currentStyle = buildStyle(inView ? visibleState : hiddenState, activeTransition);
  } else if (animate) {
    currentStyle = buildStyle(animate, activeTransition);
  } else if (variants) {
    currentStyle = buildStyle(inView ? visibleState : hiddenState, activeTransition);
  } else {
    currentStyle = buildStyle(hiddenState, activeTransition);
  }

  return { ref, style: currentStyle };
}

function createMotionComponent(tag: keyof HTMLElementTagNameMap) {
  return function MotionComponent({
    initial,
    animate,
    whileInView,
    exit,
    viewport,
    transition,
    variants,
    style,
    children,
    className,
    ...rest
  }: MotionProps) {
    const { ref, style: motionStyle } = useMotionState(
      initial,
      animate,
      whileInView,
      viewport,
      transition,
      variants,
    );

    return createElement(
      tag,
      {
        ref,
        className,
        style: { ...motionStyle, ...style },
        ...rest,
      },
      children,
    );
  };
}

export const motion = {
  div: createMotionComponent("div"),
  h1: createMotionComponent("h1"),
  p: createMotionComponent("p"),
  li: createMotionComponent("li"),
};

export type Variants = {
  hidden?: MotionTarget;
  visible?: MotionTarget & { transition?: Transition };
};

export function AnimatePresence({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {},
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
