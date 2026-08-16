import { Rect, RectProps, Txt } from '@revideo/2d';
import { THEME } from '../utils/theme';

export interface CaptionProps extends RectProps {
  text: string;
  textColor?: string;
  fontSize?: number;
}

/**
 * Educational subtitles/captions box for the bottom of scenes.
 */
export function Caption({
  text,
  textColor = THEME.colors.text,
  fontSize = 24,
  ...props
}: CaptionProps) {
  return (
    <Rect
      layout
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={[16, 32]}
      radius={THEME.radius.sm}
      fill={'rgba(3, 7, 18, 0.85)'}
      stroke={'rgba(255, 255, 255, 0.06)'}
      lineWidth={1}
      width={1200}
      height={100}
      {...props}
    >
      <Txt
        fontFamily={THEME.fonts.main}
        fontSize={fontSize}
        fontWeight={500}
        fill={textColor}
        text={text}
        textAlign={'center'}
        textWrap={true}
        width={'100%'}
      />
    </Rect>
  );
}
