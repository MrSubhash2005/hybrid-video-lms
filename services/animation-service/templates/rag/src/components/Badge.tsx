import { Rect, RectProps, Txt } from '@revideo/2d';
import { THEME } from '../utils/theme';

export interface BadgeProps extends RectProps {
  text: string;
  color?: string;
  textColor?: string;
}

/**
 * Small pill badge component for labeling workflow blocks.
 */
export function Badge({
  text,
  color = THEME.colors.primary,
  textColor = THEME.colors.text,
  ...props
}: BadgeProps) {
  return (
    <Rect
      padding={[6, 16]}
      radius={THEME.radius.round}
      fill={color}
      alignItems={'center'}
      justifyContent={'center'}
      {...props}
    >
      <Txt
        fontFamily={THEME.fonts.main}
        fontSize={18}
        fontWeight={700}
        fill={textColor}
        text={text}
        letterSpacing={1}
      />
    </Rect>
  );
}
