import { Node } from '@revideo/2d';

/**
 * Smoothly fades in a node from 0 to 1 opacity.
 */
export function* fadeIn(node: Node, duration: number = 0.5) {
  node.opacity(0);
  yield* node.opacity(1, duration);
}

/**
 * Smoothly fades out a node to 0 opacity.
 */
export function* fadeOut(node: Node, duration: number = 0.5) {
  yield* node.opacity(0, duration);
}
