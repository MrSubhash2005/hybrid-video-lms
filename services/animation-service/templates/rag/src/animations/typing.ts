import { Txt } from '@revideo/2d';
import { linear } from '@revideo/core';

/**
 * Types out a string of text character by character on a Txt node.
 */
export function* typeText(txtNode: Txt, targetText: string, duration: number = 1.0) {
  txtNode.text('');
  yield* txtNode.text(targetText, duration, linear);
}
