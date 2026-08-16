import { Line, LineProps } from '@revideo/2d';
import { THEME } from '../utils/theme';

export interface AnimatedArrowProps extends LineProps {
  glowColor?: string;
}

/**
 * Directional connector line that is animatable and styled with glow effects.
 */
export function AnimatedArrow({
  glowColor = THEME.colors.primary,
  ...props
}: AnimatedArrowProps) {
  return (
    <Line
      lineWidth={4}
      stroke={THEME.colors.primary}
      endArrow={true}
      arrowSize={12}
      shadowColor={glowColor}
      shadowBlur={5}
      end={0} // Start undrawn so scenes can animate the drawing progress
      {...props}
    />
  );
}
