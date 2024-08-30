import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Camera, Color, Point, Side, XYWH } from '@/types/canvas';

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
};

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
};

export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function resizeBounds(
  bounds: XYWH,
  corner: Side,
  point: Point
): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  // Left side resizing
  if ((corner & Side.Left) === Side.Left) {
    const newX = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
    result.x = newX;
  }

  // Right side resizing
  if ((corner & Side.Right) === Side.Right) {
    result.width = Math.abs(point.x - bounds.x);
  }

  // Top side resizing
  if ((corner & Side.Top) === Side.Top) {
    const newY = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
    result.y = newY;
  }

  // Bottom side resizing
  if ((corner & Side.Bottom) === Side.Bottom) {
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}
