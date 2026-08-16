import { Rect, RectProps, Txt } from '@revideo/2d';
import { THEME } from '../utils/theme';

export interface TitleProps extends RectProps {
  titleText: string;
  subtitleText?: string;
  titleColor?: string;
  subtitleColor?: string;
}

/**
 * Standardized title and subtitle component using flexbox layout.
 */
export function Title({
  titleText,
  subtitleText,
  titleColor = THEME.colors.text,
  subtitleColor = THEME.colors.textMuted,
  ...props
}: TitleProps) {
  return (
    <Rect
      layout
      direction={'column'}
      alignItems={'center'}
      gap={16}
      {...props}
    >
      <Txt
        fontFamily={THEME.fonts.main}
        fontSize={72}
        fontWeight={800}
        fill={titleColor}
        text={titleText}
        letterSpacing={1}
      />
      {subtitleText && (
        <Txt
          fontFamily={THEME.fonts.main}
          fontSize={32}
          fontWeight={400}
          fill={subtitleColor}
          text={subtitleText}
        />
      )}
    </Rect>
  );
}
