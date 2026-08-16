import { Node } from '@revideo/2d';
import { all, easeOutCubic, easeInCubic } from '@revideo/core';

/**
 * Slides a node in from a relative offset and fades it in.
 */
export function* slideInFrom(node: Node, offsetX: number, offsetY: number, duration: number = 0.6) {
  const targetX = node.position.x();
  const targetY = node.position.y();
  node.position.x(targetX + offsetX);
  node.position.y(targetY + offsetY);
  node.opacity(0);
  yield* all(
    node.position.x(targetX, duration, easeOutCubic),
    node.position.y(targetY, duration, easeOutCubic),
    node.opacity(1, duration)
  );
}

/**
 * Slides a node out to a relative offset and fades it out.
 */
export function* slideOutTo(node: Node, offsetX: number, offsetY: number, duration: number = 0.6) {
  const startX = node.position.x();
  const startY = node.position.y();
  yield* all(
    node.position.x(startX + offsetX, duration, easeInCubic),
    node.position.y(startY + offsetY, duration, easeInCubic),
    node.opacity(0, duration)
  );
}
