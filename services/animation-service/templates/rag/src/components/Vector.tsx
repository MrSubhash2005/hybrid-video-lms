import { Rect, RectProps, Txt } from '@revideo/2d';
import { THEME } from '../utils/theme';

export interface VectorProps extends RectProps {
  values?: number[];
  glowColor?: string;
  glow?: boolean;
}

/**
 * Mathematical vector visualization displaying an array of floats.
 */
export function Vector({
  values = [0.12, -0.85, 0.44, 0.91, -0.03, 0.56],
  glowColor = THEME.colors.cyan,
  glow = false,
  ...props
}: VectorProps) {
  const textVal = `[ ${values.map(v => v.toFixed(2)).join(', ')} ]`;

  return (
    <Rect
      layout
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={[12, 20]}
      radius={THEME.radius.sm}
      fill={THEME.colors.cardBg}
      stroke={glow ? glowColor : THEME.colors.cardBorder}
      lineWidth={1.5}
      shadowColor={glow ? glowColor : 'rgba(0,0,0,0)'}
      shadowBlur={glow ? 20 : 0}
      {...props}
    >
      <Txt
        fontFamily={THEME.fonts.mono}
        fontSize={18}
        fontWeight={600}
        fill={glow ? THEME.colors.cyan : THEME.colors.textMuted}
        text={textVal}
      />
    </Rect>
  );
}
