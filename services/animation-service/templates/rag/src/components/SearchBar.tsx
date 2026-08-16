import { Rect, RectProps, Txt, Circle, Line } from '@revideo/2d';
import { THEME } from '../utils/theme';

export interface SearchBarProps extends RectProps {
  searchText?: string;
  placeholder?: string;
}

/**
 * Visual search input element with magnifying glass icon.
 */
export function SearchBar({
  searchText = '',
  placeholder = 'Search databases...',
  ...props
}: SearchBarProps) {
  return (
    <Rect
      layout
      direction={'row'}
      alignItems={'center'}
      gap={16}
      padding={[14, 24]}
      width={500}
      radius={THEME.radius.round}
      fill={THEME.colors.cardBg}
      stroke={THEME.colors.cardBorder}
      lineWidth={1.5}
      {...props}
    >
      {/* Mathematically drawn search icon */}
      <Rect width={24} height={24} position={[0, 0]}>
        <Circle
          size={12}
          stroke={THEME.colors.textMuted}
          lineWidth={2.5}
          x={-2}
          y={-2}
        />
        <Line
          points={[[2, 2], [7, 7]]}
          stroke={THEME.colors.textMuted}
          lineWidth={2.5}
        />
      </Rect>

      {/* Input placeholder / typed query */}
      <Txt
        fontFamily={THEME.fonts.main}
        fontSize={20}
        fontWeight={500}
        fill={searchText ? THEME.colors.text : THEME.colors.textDark}
        text={searchText || placeholder}
      />
    </Rect>
  );
}
