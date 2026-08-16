import { Curve } from '@revideo/2d';

/**
 * Draws a curve or line in by animating its 'end' property from 0 to 1.
 */
export function* drawIn(curve: Curve, duration: number = 0.8) {
  curve.end(0);
  yield* curve.end(1, duration);
}

/**
 * Erases a curve or line by animating its 'end' property from 1 to 0.
 */
export function* drawOut(curve: Curve, duration: number = 0.8) {
  yield* curve.end(0, duration);
}
