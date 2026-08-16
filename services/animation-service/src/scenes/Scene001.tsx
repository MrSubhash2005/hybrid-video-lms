import { makeScene2D, Rect, Circle, Line, Txt, Node } from '@revideo/2d';
import { all, sequence, waitFor, createRef } from '@revideo/core';
import { colors, fonts, fontWeights, animationDurations, easing, nodeStyle, pointerStyle, canvas } from '../styles/theme.js';
import { cuesFromAlignment, groupCues } from '../utils/captions.js';
import alignmentData from '../assets/alignment/Scene001-alignment.json';

export default makeScene2D('Scene001', function* (view) {
  view.fill(colors.background);

  // --- REFS ---
  // Left: Array
  const arrayContainer = createRef<Node>();
  const newArrayBox = createRef<Rect>();
  const arrayBox1 = createRef<Rect>();
  const arrayBox2 = createRef<Rect>();
  const arrayBox3 = createRef<Rect>();
  const arrayBox4 = createRef<Rect>();
  const arrayBox5 = createRef<Rect>();

  // Right: Linked List
  const llContainer = createRef<Node>();
  const headLabel = createRef<Txt>();
  const headArrow = createRef<Line>();
  
  const newLLNode = createRef<Circle>();
  const newLLArrow = createRef<Line>();
  
  const llNode1 = createRef<Circle>();
  const llArrow1 = createRef<Line>();
  const llNode2 = createRef<Circle>();
  const llArrow2 = createRef<Line>();
  const llNode3 = createRef<Circle>();
  const llArrow3 = createRef<Line>();
  const llNode4 = createRef<Circle>();

  // Text
  const textContainer = createRef<Node>();
  const textLine1 = createRef<Txt>();
  const textLine2 = createRef<Txt>();

  // Caption refs
  const captionContainer = createRef<Rect>();
  const captionText = createRef<Txt>();
  const captionText2 = createRef<Txt>();

  const allCues = groupCues(cuesFromAlignment(alignmentData));

  // --- INITIAL SETUP ---
  
  const boxSize = 80;
  const boxSpacing = 100;
  const arrayStartX = -480 - (boxSpacing * 2); // Center around -480

  const nodeRadius = 40;
  const nodeSpacing = 120;
  const llStartX = 480 - (nodeSpacing * 1.5);

  view.add(
    <Node>
      {/* LEFT: ARRAY */}
      <Node ref={arrayContainer} x={0} y={0}>
        <Rect
          ref={newArrayBox}
          x={arrayStartX}
          y={0}
          width={boxSize}
          height={boxSize}
          radius={nodeStyle.borderRadius}
          fill={colors.codeBlockBackground}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
          opacity={0}
        />
        <Rect
          ref={arrayBox1}
          x={arrayStartX}
          y={0}
          width={boxSize}
          height={boxSize}
          radius={nodeStyle.borderRadius}
          fill={colors.codeBlockBackground}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
        />
        <Rect
          ref={arrayBox2}
          x={arrayStartX + boxSpacing}
          y={0}
          width={boxSize}
          height={boxSize}
          radius={nodeStyle.borderRadius}
          fill={colors.codeBlockBackground}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
        />
        <Rect
          ref={arrayBox3}
          x={arrayStartX + boxSpacing * 2}
          y={0}
          width={boxSize}
          height={boxSize}
          radius={nodeStyle.borderRadius}
          fill={colors.codeBlockBackground}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
        />
        <Rect
          ref={arrayBox4}
          x={arrayStartX + boxSpacing * 3}
          y={0}
          width={boxSize}
          height={boxSize}
          radius={nodeStyle.borderRadius}
          fill={colors.codeBlockBackground}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
        />
        <Rect
          ref={arrayBox5}
          x={arrayStartX + boxSpacing * 4}
          y={0}
          width={boxSize}
          height={boxSize}
          radius={nodeStyle.borderRadius}
          fill={colors.codeBlockBackground}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
        />
      </Node>

      {/* RIGHT: LINKED LIST */}
      <Node ref={llContainer} x={0} y={0}>
        <Txt
          ref={headLabel}
          x={llStartX}
          y={-100}
          text="head"
          fill={colors.text}
          fontFamily={fonts.body}
          fontWeight={fontWeights.bodyWeight}
          fontSize={24}
        />
        <Line
          ref={headArrow}
          points={[
            [llStartX, -80],
            [llStartX, -50]
          ]}
          stroke={colors.nodeBorder}
          lineWidth={pointerStyle.strokeWidth}
          endArrow
          arrowSize={pointerStyle.arrowheadSize}
        />

        <Circle
          ref={newLLNode}
          x={llStartX}
          y={-120}
          width={nodeRadius * 2}
          height={nodeRadius * 2}
          fill={colors.primaryAccent}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
          opacity={0}
        />
        <Line
          ref={newLLArrow}
          points={[
            [llStartX, -80],
            [llStartX, -50]
          ]}
          stroke={colors.nodeBorder}
          lineWidth={pointerStyle.strokeWidth}
          endArrow
          arrowSize={pointerStyle.arrowheadSize}
          opacity={0}
        />

        <Circle
          ref={llNode1}
          x={llStartX}
          y={0}
          width={nodeRadius * 2}
          height={nodeRadius * 2}
          fill={colors.primaryAccent}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
        />
        <Line
          ref={llArrow1}
          points={[
            [llStartX + nodeRadius, 0],
            [llStartX + nodeSpacing - nodeRadius, 0]
          ]}
          stroke={colors.nodeBorder}
          lineWidth={pointerStyle.strokeWidth}
          endArrow
          arrowSize={pointerStyle.arrowheadSize}
        />
        
        <Circle
          ref={llNode2}
          x={llStartX + nodeSpacing}
          y={0}
          width={nodeRadius * 2}
          height={nodeRadius * 2}
          fill={colors.primaryAccent}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
        />
        <Line
          ref={llArrow2}
          points={[
            [llStartX + nodeSpacing + nodeRadius, 0],
            [llStartX + nodeSpacing * 2 - nodeRadius, 0]
          ]}
          stroke={colors.nodeBorder}
          lineWidth={pointerStyle.strokeWidth}
          endArrow
          arrowSize={pointerStyle.arrowheadSize}
        />

        <Circle
          ref={llNode3}
          x={llStartX + nodeSpacing * 2}
          y={0}
          width={nodeRadius * 2}
          height={nodeRadius * 2}
          fill={colors.primaryAccent}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
        />
        <Line
          ref={llArrow3}
          points={[
            [llStartX + nodeSpacing * 2 + nodeRadius, 0],
            [llStartX + nodeSpacing * 3 - nodeRadius, 0]
          ]}
          stroke={colors.nodeBorder}
          lineWidth={pointerStyle.strokeWidth}
          endArrow
          arrowSize={pointerStyle.arrowheadSize}
        />

        <Circle
          ref={llNode4}
          x={llStartX + nodeSpacing * 3}
          y={0}
          width={nodeRadius * 2}
          height={nodeRadius * 2}
          fill={colors.primaryAccent}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
        />
      </Node>

      {/* TEXT: BEAT C */}
      <Node ref={textContainer} y={300}>
        <Txt
          ref={textLine1}
          y={-25}
          text="Arrays: Insertion at front = O(n) shifts"
          fill={colors.text}
          fontFamily={fonts.body}
          fontWeight={fontWeights.bodyWeight}
          fontSize={32}
          opacity={0}
        />
        <Txt
          ref={textLine2}
          y={25}
          text="Linked Lists: Insertion = just relink pointers"
          fill={colors.text}
          fontFamily={fonts.body}
          fontWeight={fontWeights.bodyWeight}
          fontSize={32}
          opacity={0}
        />
      </Node>

      {/* CAPTIONS OVERLAY */}
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

  // --- ANIMATION SEQUENCE ---
  // Captions and scene animations run together via all()


  yield* all(
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
      // BEAT A: 0s - 35.0s (Array shifting)
      const beatADuration = 39.8;
      const delayBetweenShifts = 0.5;
      const totalShiftsTime = delayBetweenShifts * 5 + animationDurations.moveTo;

      yield* sequence(
        delayBetweenShifts,
        arrayBox5().x(arrayBox5().x() + boxSpacing, animationDurations.moveTo),
        arrayBox4().x(arrayBox4().x() + boxSpacing, animationDurations.moveTo),
        arrayBox3().x(arrayBox3().x() + boxSpacing, animationDurations.moveTo),
        arrayBox2().x(arrayBox2().x() + boxSpacing, animationDurations.moveTo),
        arrayBox1().x(arrayBox1().x() + boxSpacing, animationDurations.moveTo),
      );

      yield* newArrayBox().opacity(1, animationDurations.fadeIn);

      const paddingA = beatADuration - totalShiftsTime - animationDurations.fadeIn;
      if (paddingA > 0) {
        yield* waitFor(paddingA);
      }

      // BEAT B: 35.0s - 73.5s (Linked List insertion)
      const beatBDuration = 74.4 - 39.8;

      yield* newLLNode().opacity(1, animationDurations.fadeIn);

      yield* all(
        newLLArrow().opacity(1, animationDurations.fadeIn),
        headLabel().y(-220, animationDurations.pointerMove),
        headArrow().points([
          [llStartX, -200],
          [llStartX, -170]
        ], animationDurations.pointerMove),
      );

      const paddingB = beatBDuration - (animationDurations.fadeIn * 2) - animationDurations.pointerMove;
      if (paddingB > 0) {
        yield* waitFor(paddingB);
      }

      // BEAT C: 73.5s - 112.4s (Text fade in)
      const beatCDuration = 105.82 - 74.4;

      yield* all(
        textLine1().opacity(1, animationDurations.fadeIn),
        textLine2().opacity(1, animationDurations.fadeIn),
      );

      const paddingC = beatCDuration - animationDurations.fadeIn;
      if (paddingC > 0) {
        yield* waitFor(paddingC);
      }
    })(),
  );
});
