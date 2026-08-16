import { Node } from '@revideo/2d';
import { all, easeOutQuad, easeInQuad } from '@revideo/core';

/**
 * Zooms a node in from a startScale (default 0.8) and fades it in.
 */
export function* zoomIn(node: Node, startScale: number = 0.8, duration: number = 0.5) {
  const targetScale = node.scale() || 1;
  node.scale(startScale);
  node.opacity(0);
  yield* all(
    node.scale(targetScale, duration, easeOutQuad),
    node.opacity(1, duration)
  );
}

/**
 * Zooms a node out to an endScale (default 0.8) and fades it out.
 */
export function* zoomOut(node: Node, endScale: number = 0.8, duration: number = 0.5) {
  yield* all(
    node.scale(endScale, duration, easeInQuad),
    node.opacity(0, duration)
  );
}
