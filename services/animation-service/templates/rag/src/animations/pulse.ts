import { Node } from "@revideo/2d";
import { easeInOutSine } from "@revideo/core";

export function* pulseScale(
  node: Node,
  scaleFactor = 1.1,
  duration = 0.6,
) {
  const original = node.scale();
  
  let target: any;
  if (typeof original === 'number') {
    target = original * scaleFactor;
  } else if (original && typeof original === 'object' && 'x' in original && 'y' in original) {
    target = { x: (original.x as number) * scaleFactor, y: (original.y as number) * scaleFactor };
  } else {
    target = scaleFactor;
  }

  yield* node.scale(
    target,
    duration / 2,
    easeInOutSine,
  );

  yield* node.scale(
    original,
    duration / 2,
    easeInOutSine,
  );
}

export function* pulseOpacity(
  node: Node,
  minOpacity = 0.4,
  duration = 1,
) {

  const original = Number(node.opacity());

  yield* node.opacity(
    minOpacity,
    duration / 2,
    easeInOutSine,
  );

  yield* node.opacity(
    original,
    duration / 2,
    easeInOutSine,
  );
}