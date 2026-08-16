import { Rect, RectProps, Txt } from '@revideo/2d';
import { THEME } from '../utils/theme';

export interface DatabaseProps extends RectProps {
  label?: string;
  glow?: boolean;
}

/**
 * 3D-like stack of database disks representing a Vector DB.
 */
export function Database({
  label = 'VECTOR DATABASE',
  glow = false,
  ...props
}: DatabaseProps) {
  return (
    <Rect {...props}>
      {/* Three overlapping horizontal cylinders */}
      <Rect
        y={-30}
        width={180}
        height={45}
        radius={22.5}
        fill={THEME.colors.cardBg}
        stroke={THEME.colors.primary}
        lineWidth={3}
        shadowColor={glow ? THEME.colors.primary : 'rgba(0, 0, 0, 0.4)'}
        shadowBlur={glow ? 20 : 5}
      />
      <Rect
        y={0}
        width={180}
        height={45}
        radius={22.5}
        fill={THEME.colors.cardBg}
        stroke={THEME.colors.primary}
        lineWidth={3}
        shadowColor={glow ? THEME.colors.primary : 'rgba(0, 0, 0, 0.4)'}
        shadowBlur={glow ? 20 : 5}
      />
      <Rect
        y={30}
        width={180}
        height={45}
        radius={22.5}
        fill={THEME.colors.cardBg}
        stroke={THEME.colors.primary}
        lineWidth={3}
        shadowColor={glow ? THEME.colors.primary : 'rgba(0, 0, 0, 0.4)'}
        shadowBlur={glow ? 20 : 5}
      />
      {/* Database Title */}
      <Txt
        y={80}
        fontFamily={THEME.fonts.main}
        fontSize={20}
        fontWeight={800}
        fill={THEME.colors.cyan}
        text={label}
        letterSpacing={1}
      />
    </Rect>
  );
}
