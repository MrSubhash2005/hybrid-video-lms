import { Node } from '@revideo/2d';
import { easeOutBack, easeInBack } from '@revideo/core';

/**
 * Pops in a node by scaling it from 0 to targetScale using easeOutBack.
 * Automatically ensures the node's opacity is set to 1.
 */
export function* popIn(node: Node, duration: number = 0.5, targetScale: number = 1) {
  node.scale(0);
  node.opacity(1); // Ensure node is visible as it scales up
  yield* node.scale(targetScale, duration, easeOutBack);
}

/**
 * Pops out a node by scaling it to 0 using easeInBack.
 */
export function* popOut(node: Node, duration: number = 0.5) {
  yield* node.scale(0, duration, easeInBack);
}
