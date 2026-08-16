import { Rect, RectProps } from '@revideo/2d';
import { THEME } from '../utils/theme';

export interface CardProps extends RectProps {
  glowColor?: string;
  showGlow?: boolean;
}

/**
 * Glassmorphic Card container with optional glow states.
 */
export function Card({
  glowColor = THEME.colors.primary,
  showGlow = false,
  children,
  ...props
}: CardProps) {
  return (
    <Rect
      layout
      direction={'column'}
      padding={30}
      radius={THEME.radius.md}
      fill={THEME.colors.cardBg}
      stroke={THEME.colors.cardBorder}
      lineWidth={1.5}
      shadowColor={showGlow ? glowColor : 'rgba(0, 0, 0, 0.5)'}
      shadowBlur={showGlow ? 30 : 15}
      shadowOffset={[0, 4]}
      {...props}
    >
      {children}
    </Rect>
  );
}
