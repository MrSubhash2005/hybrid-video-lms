import { Rect, RectProps } from '@revideo/2d';
import { THEME } from '../utils/theme';

export interface DocumentProps extends RectProps {
  linesCount?: number;
  highlightedLine?: number; // 0-indexed line to highlight
  highlightColor?: string;
}

/**
 * Visual document representation with placeholder text lines and custom highlighting.
 */
export function Document({
  linesCount = 5,
  highlightedLine = -1,
  highlightColor = THEME.colors.cyan,
  ...props
}: DocumentProps) {
  const lines = Array.from({ length: linesCount });

  return (
    <Rect
      layout
      direction={'column'}
      gap={12}
      padding={24}
      width={160}
      height={220}
      radius={12}
      fill={THEME.colors.cardBg}
      stroke={THEME.colors.cardBorder}
      lineWidth={2}
      {...props}
    >
      {/* Header element of document */}
      <Rect
        width={60}
        height={10}
        radius={5}
        fill={THEME.colors.textMuted}
      />
      
      {/* Spacer */}
      <Rect height={2} />

      {/* Multi-line text visualization */}
      {lines.map((_, idx) => {
        const isHighlighted = idx === highlightedLine;
        return (
          <Rect
            width={idx % 2 === 0 ? '100%' : '80%'}
            height={8}
            radius={4}
            fill={isHighlighted ? highlightColor : THEME.colors.textDark}
          />
        );
      })}
    </Rect>
  );
}
