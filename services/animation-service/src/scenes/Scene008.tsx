import { makeScene2D, Rect, Txt, Node, Layout } from '@revideo/2d';
import { all, sequence, waitFor, createRef, fadeTransition } from '@revideo/core';
import { colors, fonts, fontWeights, animationDurations, nodeStyle, canvas } from '../styles/theme.js';
import { cuesFromAlignment, groupCues } from '../utils/captions.js';
import alignmentData from '../assets/alignment/Scene008-alignment.json';

export default makeScene2D('Scene008', function* (view) {
  view.fill(colors.background);

  // --- REFS ---
  const tableContainer = createRef<Node>();
  
  const titleText = createRef<Txt>();

  // Row refs
  const rowRefs = Array.from({ length: 7 }).map(() => ({
    container: createRef<Node>(),
    bg: createRef<Rect>(),
    operation: createRef<Txt>(),
    complexity: createRef<Txt>(),
    complexityBg: createRef<Rect>(),
  }));

  // Caption refs
  const captionContainer = createRef<Rect>();
  const captionText = createRef<Txt>();
  const captionText2 = createRef<Txt>();

  // --- NARRATION ---
  const beatCTextStr = "This cheat sheet highlights the primary tradeoff of a singly linked list. They are fantastic when you frequently need to add or remove elements directly at the front, but they slow down significantly if you need to search for or modify elements near the end.";

  const allCues = groupCues(cuesFromAlignment(alignmentData));

  // --- CONTENT & DATA ---
  const rowData = [
    { op: "Access", comp: "O(n)", color: colors.tertiaryAccent },
    { op: "Search", comp: "O(n)", color: colors.tertiaryAccent },
    { op: "Insert at Head", comp: "O(1)", color: colors.primaryAccent },
    { op: "Insert at Tail", comp: "O(n)", color: colors.tertiaryAccent },
    { op: "Insert at Middle", comp: "O(n)", color: colors.tertiaryAccent },
    { op: "Delete at Head", comp: "O(1)", color: colors.primaryAccent },
    { op: "Delete at Middle/Tail", comp: "O(n)", color: colors.tertiaryAccent },
  ];

  // --- LAYOUT ---
  const tableWidth = 900;
  const rowHeight = 70;
  const rowSpacing = 16;
  const startY = -240;

  view.add(
    <Node>
      <Txt
        ref={titleText}
        y={-400}
        text="Singly Linked List: Time Complexity"
        fill={colors.text}
        fontFamily={fonts.heading}
        fontWeight={fontWeights.headingWeight}
        fontSize={48}
        opacity={0}
      />

      <Node ref={tableContainer} y={0}>
        {rowData.map((data, index) => {
          const yPos = startY + index * (rowHeight + rowSpacing);
          const refs = rowRefs[index];
          
          return (
            <Node ref={refs.container} y={yPos} x={-100} opacity={0} key={String(index)}>
              <Rect
                ref={refs.bg}
                width={tableWidth}
                height={rowHeight}
                fill={colors.codeBlockBackground}
                radius={nodeStyle.borderRadius}
                stroke={colors.nodeBorder}
                lineWidth={nodeStyle.borderWidth}
              />
              
              <Txt
                ref={refs.operation}
                x={-tableWidth / 2 + 40}
                text={data.op}
                fill={colors.text}
                fontFamily={fonts.body}
                fontWeight={fontWeights.headingWeight}
                fontSize={32}
                textAlign="left"
                offsetX={-1}
                justifyContent="center"
              />

              <Rect
                ref={refs.complexityBg}
                x={tableWidth / 2 - 100}
                width={160}
                height={50}
                fill={data.color}
                radius={nodeStyle.borderRadius}
              >
                <Txt
                  ref={refs.complexity}
                  text={data.comp}
                  fill={colors.background}
                  fontFamily={fonts.code}
                  fontWeight={fontWeights.headingWeight}
                  fontSize={32}
                />
              </Rect>
            </Node>
          );
        })}
      </Node>

      {/* CAPTIONS OVERLAY */}
      <Node y={canvas.height / 2 - 120} zIndex={100}>
        <Rect
          ref={captionContainer}
          layout
          direction="column"
          opacity={1}
          padding={[20, 40]}
          alignItems="center"
          justifyContent="center"
        >
          <Txt
            ref={captionText}
            text=""
            fill={colors.text}
            fontFamily={fonts.body}
            fontWeight={fontWeights.bodyWeight}
            fontSize={28}
            textAlign="center"
            textWrap={true}
            maxWidth={canvas.width * 0.8}
            shadowColor="rgba(0,0,0,0.8)"
            shadowBlur={10}
            shadowOffset={[0, 4]}
          />
          <Txt
            ref={captionText2}
            text=""
            fill={colors.text}
            fontFamily={fonts.body}
            fontWeight={fontWeights.bodyWeight}
            fontSize={28}
            textAlign="center"
            textWrap={true}
            maxWidth={canvas.width * 0.8}
            shadowColor="rgba(0,0,0,0.8)"
            shadowBlur={10}
            shadowOffset={[0, 4]}
            marginTop={10}
          />
        </Rect>
      </Node>
    </Node>
  );

  // Helper generator to pulse a cell
  function* pulseCell(refs: any) {
    yield* sequence(
      0.15,
      refs.complexityBg().scale(1.2, 0.15),
      refs.complexityBg().scale(1, 0.15)
    );
  }

  yield* all(
    fadeTransition(1),
    // --- CAPTIONS THREAD ---
    (function* () {
      let currentTime = 0;
      yield* captionContainer().opacity(1, 0); 
      
      for (const cue of allCues) {
        if (cue.start > currentTime) {
          yield* all(captionText().text("", 0), captionText2().text("", 0));
          yield* waitFor(cue.start - currentTime);
          currentTime = cue.start;
        }
        
        const lines = cue.text.split('\n');
        yield* all(
            captionText().text(lines[0] || "", 0),
            captionText2().text(lines[1] || "", 0)
        );
        yield* waitFor(cue.end - cue.start);
        currentTime = cue.end;
      }
      yield* all(captionText().text("", 0), captionText2().text("", 0));
      yield* captionContainer().opacity(0, 0);
    })(),

    // --- MAIN ANIMATION THREAD ---
    (function* () {
      
      // BEAT A (0 - 25.7s): Table build-in
      const beatADuration = 9.96;
      
      yield* titleText().opacity(1, animationDurations.fadeIn);
      yield* waitFor(1);

      // Animate rows sequentially
      for (let i = 0; i < rowRefs.length; i++) {
        yield* all(
          rowRefs[i].container().opacity(1, animationDurations.fadeIn),
          rowRefs[i].container().x(0, animationDurations.fadeIn)
        );
        yield* waitFor(0.5);
      }
      
      const timeSpentA = animationDurations.fadeIn + 1 + rowRefs.length * (animationDurations.fadeIn + 0.5);
      if (beatADuration - timeSpentA > 0) yield* waitFor(beatADuration - timeSpentA);

      // BEAT B (25.7 - 51.3s): Row highlight sweep
      const beatBDuration = 31.56 - 9.96;
      
      // There are 7 rows. We spread out the pulses evenly over Beat B.
      // We'll leave 2 seconds at the beginning and end.
      const timePerPulse = (beatBDuration - 4) / rowRefs.length;
      
      yield* waitFor(2);
      
      for (let i = 0; i < rowRefs.length; i++) {
        yield* pulseCell(rowRefs[i]);
        yield* waitFor(timePerPulse - 0.3); // 0.3 is roughly pulse duration
      }
      
      yield* waitFor(2);

      // BEAT C (51.3 - 77.0s): Full table hold
      const beatCDuration = 47.12 - 31.56;
      yield* waitFor(beatCDuration);
    })()
  );
});
