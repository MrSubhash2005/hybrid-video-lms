import { Node, Rect, Txt, NodeProps } from '@revideo/2d';
import { createRef, all } from '@revideo/core';
import { colors, fonts, nodeStyle, codeBlock } from '../styles/theme.js';

export interface CodeBlockRefs {
  container: ReturnType<typeof createRef<Rect>>;
  highlightBox: ReturnType<typeof createRef<Rect>>;
}

export function createCodeBlockRefs(): CodeBlockRefs {
  return {
    container: createRef<Rect>(),
    highlightBox: createRef<Rect>(),
  };
}

export interface CodeBlockProps extends NodeProps {
  refs: CodeBlockRefs;
  code: string;
}

export const CodeBlock = (props: CodeBlockProps) => {
  const { refs, code, ...nodeProps } = props;
  
  const lineHeight = 48; // fixed line height for calculation
  const padding = 40;
  const lines = code.split('\n');
  const charWidth = 21.5; // rough estimate for 36px monospace JetBrains Mono
  const maxLineLength = Math.max(...lines.map(l => l.length));
  
  // Calculate raw dimensions
  const rawTextWidth = maxLineLength * charWidth;
  const rawBlockWidth = rawTextWidth + padding * 2;
  const rawTextHeight = lines.length * lineHeight;
  const rawBlockHeight = rawTextHeight + padding * 2;
  
  // Apply constraints via scaling
  const effectiveMaxWidth = codeBlock.maxWidth - codeBlock.marginRight;
  let blockScale = 1;
  if (rawBlockHeight > codeBlock.maxHeight) {
    blockScale = Math.min(blockScale, codeBlock.maxHeight / rawBlockHeight);
  }
  if (rawBlockWidth > effectiveMaxWidth) {
    blockScale = Math.min(blockScale, effectiveMaxWidth / rawBlockWidth);
  }

  return (
    <Node {...nodeProps} scale={blockScale}>
      <Rect
        ref={refs.container}
        fill={colors.codeBlockBackground}
        radius={nodeStyle.borderRadius}
        stroke={colors.nodeBorder}
        lineWidth={nodeStyle.borderWidth}
        width={rawBlockWidth}
        height={rawBlockHeight}
      >
        <Rect
          ref={refs.highlightBox}
          opacity={0}
          fill={`${colors.primaryAccent}44`}
          width={rawBlockWidth}
          height={lineHeight}
          offsetX={-1}
          offsetY={-1}
          x={-rawBlockWidth/2}
          y={-rawBlockHeight/2 + padding}
        />
        <Txt
          text={code}
          fontFamily={fonts.code}
          fill={colors.text}
          fontSize={36}
          lineHeight={lineHeight}
          offsetX={-1}
          offsetY={-1}
          x={-rawBlockWidth/2 + padding}
          y={-rawBlockHeight/2 + padding}
          textAlign="left"
        />
      </Rect>
    </Node>
  );
};

// Helper generator to animate the highlighted line
export function* moveHighlight(refs: CodeBlockRefs, lineIndex: number, duration: number) {
  if (lineIndex < 0) {
    yield* refs.highlightBox().opacity(0, duration);
  } else {
    const containerHeight = refs.container().height();
    const padding = 40;
    const lineHeight = 48;
    
    // targetY is top edge of the line
    const targetY = -containerHeight/2 + padding + (lineIndex * lineHeight);
    
    // If currently hidden, move instantly then fade in
    if (refs.highlightBox().opacity() === 0) {
      refs.highlightBox().y(targetY);
      yield* refs.highlightBox().opacity(1, duration);
    } else {
      yield* refs.highlightBox().y(targetY, duration);
    }
  }
}

// Helper generator to set highlighted block state
export function* setBlockHighlight(refs: CodeBlockRefs, highlighted: boolean, duration: number) {
  const targetColor = highlighted ? colors.primaryAccent : colors.nodeBorder;
  yield* refs.container().stroke(targetColor, duration);
}
