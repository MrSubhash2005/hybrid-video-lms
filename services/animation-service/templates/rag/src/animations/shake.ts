import { Node } from '@revideo/2d';

/**
 * Shakes a node horizontally to indicate error or hallucination.
 */
export function* shakeNode(node: Node, amount: number = 15, duration: number = 0.5) {
  const originalX = node.position.x();
  const step = duration / 6;
  yield* node.position.x(originalX + amount, step);
  yield* node.position.x(originalX - amount, step);
  yield* node.position.x(originalX + amount * 0.6, step);
  yield* node.position.x(originalX - amount * 0.6, step);
  yield* node.position.x(originalX + amount * 0.3, step);
  yield* node.position.x(originalX, step);
}
