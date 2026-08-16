import { Rect, RectProps, Txt } from '@revideo/2d';
import { THEME } from '../utils/theme';

export interface PromptBoxProps extends RectProps {
  questionText?: string;
  contextText?: string;
  glow?: boolean;
}

/**
 * Visual prompt assembler displaying user query merged with retrieved context.
 */
export function PromptBox({
  questionText = 'What is RAG?',
  contextText = 'Retrieval-Augmented Generation is...',
  glow = false,
  ...props
}: PromptBoxProps) {
  return (
    <Rect
      layout
      direction={'column'}
      gap={16}
      padding={24}
      width={500}
      radius={THEME.radius.md}
      fill={THEME.colors.cardBg}
      stroke={glow ? THEME.colors.primary : THEME.colors.cardBorder}
      lineWidth={1.5}
      shadowColor={glow ? THEME.colors.primary : 'rgba(0,0,0,0)'}
      shadowBlur={glow ? 25 : 0}
      {...props}
    >
      <Txt
        fontFamily={THEME.fonts.main}
        fontSize={16}
        fontWeight={800}
        fill={THEME.colors.primary}
        text={'AUGMENTED PROMPT TEMPLATE'}
        letterSpacing={1}
      />

      {/* Context Block (Cyan themed) */}
      <Rect
        layout
        direction={'column'}
        padding={14}
        radius={THEME.radius.sm}
        fill={'rgba(6, 182, 212, 0.08)'}
        stroke={'rgba(6, 182, 212, 0.25)'}
        lineWidth={1}
      >
        <Txt
          fontFamily={THEME.fonts.main}
          fontSize={12}
          fontWeight={800}
          fill={THEME.colors.cyan}
          text={'[RETRIEVED CONTEXT]'}
          marginBottom={6}
          letterSpacing={0.5}
        />
        <Txt
          fontFamily={THEME.fonts.main}
          fontSize={14}
          fill={THEME.colors.textMuted}
          text={contextText}
          textWrap={true}
        />
      </Rect>

      {/* Question Block (Blue themed) */}
      <Rect
        layout
        direction={'column'}
        padding={14}
        radius={THEME.radius.sm}
        fill={'rgba(59, 130, 246, 0.08)'}
        stroke={'rgba(59, 130, 246, 0.25)'}
        lineWidth={1}
      >
        <Txt
          fontFamily={THEME.fonts.main}
          fontSize={12}
          fontWeight={800}
          fill={THEME.colors.primary}
          text={'[USER QUESTION]'}
          marginBottom={6}
          letterSpacing={0.5}
        />
        <Txt
          fontFamily={THEME.fonts.main}
          fontSize={14}
          fill={THEME.colors.text}
          text={questionText}
        />
      </Rect>
    </Rect>
  );
}
