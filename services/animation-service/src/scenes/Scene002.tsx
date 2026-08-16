import { makeScene2D, Rect, Circle, Line, Txt, Node } from '@revideo/2d';
import { all, sequence, waitFor, createRef, fadeTransition } from '@revideo/core';
import { colors, fonts, fontWeights, animationDurations, pointerStyle, nodeStyle, canvas } from '../styles/theme.js';
import { cuesFromAlignment, groupCues } from '../utils/captions.js';
import alignmentData from '../assets/alignment/Scene002-alignment.json';
import { CodeBlock, createCodeBlockRefs, moveHighlight, setBlockHighlight } from '../components/CodeBlock.js';

export default makeScene2D('Scene002', function* (view) {
  view.fill(colors.background);

  // --- REFS ---
  // Left Side: Node Diagram
  const nodeContainer = createRef<Node>();
  
  // Compartment 1: Data
  const dataBox = createRef<Rect>();
  const dataLabel = createRef<Txt>();
  const dataValue = createRef<Txt>();
  
  // Compartment 2: Next
  const nextBox = createRef<Rect>();
  const nextLabel = createRef<Txt>();
  const nextArrow = createRef<Line>();
  
  // Beat C expansions
  const headLabel = createRef<Txt>();
  const headArrow = createRef<Line>();
  
  const node2 = createRef<Rect>();
  
  const node3 = createRef<Rect>();
  const arrow2to3 = createRef<Line>();
  

  // Right Side: CodeBlock
  const codeBlockContainer = createRef<Node>();
  const codeRefs = createCodeBlockRefs();

  // Caption refs
  const captionContainer = createRef<Rect>();
  const captionText = createRef<Txt>();
  const captionText2 = createRef<Txt>();
  const beatCText = createRef<Txt>();

  // --- CONTENT & DATA ---
  const codeString = `struct Node {\n    int data;\n    Node* next;\n};`;

  const beatCTextStr = "Once we have a starting node, we can follow the next pointers, one after another, to reach every other node in the list. This simple structure, a value plus a pointer, is really all we need to build something powerful.";

  const allCues = groupCues(cuesFromAlignment(alignmentData));

  // --- LAYOUT ---
  const leftX = -480;
  const rightX = 480;

  const boxWidth = 140;
  const boxHeight = 120;
  const nodeSpacing = 220;

  view.add(
    <Node>
      {/* LEFT: NODE DIAGRAM */}
      <Node ref={nodeContainer} x={leftX} y={0}>
        
        {/* Head label (hidden initially) */}
        <Txt
          ref={headLabel}
          x={-boxWidth/2}
          y={-120}
          text="head"
          fill={colors.text}
          fontFamily={fonts.body}
          fontWeight={fontWeights.bodyWeight}
          fontSize={24}
          opacity={0}
        />
        <Line
          ref={headArrow}
          points={[ [-boxWidth/2, -90], [-boxWidth/2, -70] ]}
          stroke={colors.nodeBorder}
          lineWidth={pointerStyle.strokeWidth}
          endArrow
          arrowSize={pointerStyle.arrowheadSize}
          opacity={0}
        />

        {/* Node 1: Data Compartment */}
        <Rect
          ref={dataBox}
          x={-boxWidth/2}
          y={0}
          width={boxWidth}
          height={boxHeight}
          fill={colors.primaryAccent}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
          radius={[nodeStyle.borderRadius, 0, 0, nodeStyle.borderRadius]}
          opacity={0}
        >
          <Txt
            ref={dataLabel}
            y={-30}
            text="data"
            fill={colors.text}
            fontFamily={fonts.body}
            fontWeight={fontWeights.bodyWeight}
            fontSize={24}
          />
          <Txt
            ref={dataValue}
            y={20}
            text="42"
            fill={colors.background} // using background for contrast on primaryAccent
            fontFamily={fonts.code}
            fontWeight={fontWeights.headingWeight}
            fontSize={32}
          />
        </Rect>

        {/* Node 1: Next Compartment */}
        <Rect
          ref={nextBox}
          x={boxWidth/2}
          y={0}
          width={boxWidth}
          height={boxHeight}
          fill={colors.secondaryAccent}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
          radius={[0, nodeStyle.borderRadius, nodeStyle.borderRadius, 0]}
          opacity={0}
        >
          <Txt
            ref={nextLabel}
            y={-30}
            text="next"
            fill={colors.text}
            fontFamily={fonts.body}
            fontWeight={fontWeights.bodyWeight}
            fontSize={24}
          />
        </Rect>

        {/* Arrow pointing out (sibling to prevent clipping) */}
        <Line
          ref={nextArrow}
          points={[ [boxWidth/2, 20], [boxWidth/2 + 80, 20] ]}
          stroke={colors.nodeBorder}
          lineWidth={pointerStyle.strokeWidth}
          endArrow
          arrowSize={pointerStyle.arrowheadSize}
          end={0} // for drawing animation
        />

        {/* Beat C: Expanded nodes (simplified as just standard rect boxes) */}
        <Rect
          ref={node2}
          x={nodeSpacing}
          y={0}
          width={100}
          height={80}
          fill={colors.primaryAccent}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
          radius={nodeStyle.borderRadius}
          opacity={0}
        />
        
        <Line
          ref={arrow2to3}
          points={[ [nodeSpacing + 50, 0], [nodeSpacing * 2 - 50, 0] ]}
          stroke={colors.nodeBorder}
          lineWidth={pointerStyle.strokeWidth}
          endArrow
          arrowSize={pointerStyle.arrowheadSize}
          opacity={0}
        />
        <Rect
          ref={node3}
          x={nodeSpacing * 2}
          y={0}
          width={100}
          height={80}
          fill={colors.primaryAccent}
          stroke={colors.nodeBorder}
          lineWidth={nodeStyle.borderWidth}
          radius={nodeStyle.borderRadius}
          opacity={0}
        />
      </Node>

      {/* TEXT: BEAT C */}
      <Txt
        ref={beatCText}
        x={leftX + boxWidth/2}
        y={150}
        text="Node = data + next pointer"
        fill={colors.text}
        fontFamily={fonts.body}
        fontWeight={fontWeights.bodyWeight}
        fontSize={32}
        opacity={0}
      />

      {/* RIGHT: CODE BLOCK */}
      <Node ref={codeBlockContainer} x={rightX} y={0} opacity={0}>
        <CodeBlock refs={codeRefs} code={codeString} />
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
      // BEAT A: 0s - 41.3s
      const beatADuration = 36.44;
      
      // Fade in data compartment, then next, then code block
      yield* dataBox().opacity(1, animationDurations.fadeIn);
      yield* waitFor(0.5);
      
      yield* nextBox().opacity(1, animationDurations.fadeIn);
      yield* nextArrow().end(1, animationDurations.pointerMove);
      
      yield* waitFor(1);
      
      yield* codeBlockContainer().opacity(1, animationDurations.fadeIn);
      yield* moveHighlight(codeRefs, 1, animationDurations.highlight); // Highlight "int data;"
      
      yield* waitFor(2);
      yield* moveHighlight(codeRefs, 2, animationDurations.highlight); // Highlight "Node* next;"
      
      // Wait for remainder of Beat A
      const timeSpentA = animationDurations.fadeIn * 2 + animationDurations.pointerMove + animationDurations.highlight * 2 + 3.5;
      const paddingA = beatADuration - timeSpentA;
      if (paddingA > 0) yield* waitFor(paddingA);

      // BEAT B: 41.3s - 76.4s
      const beatBDuration = 72.68 - 36.44;
      
      // Clear highlight line and set block highlight
      yield* all(
        moveHighlight(codeRefs, -1, animationDurations.highlight),
        setBlockHighlight(codeRefs, true, animationDurations.highlight)
      );
      
      const paddingB = beatBDuration - animationDurations.highlight;
      if (paddingB > 0) yield* waitFor(paddingB);

      // BEAT C: 76.4s - 92.1s
      const beatCDuration = 83.28 - 72.68;
      
      // Clear block highlight
      yield* setBlockHighlight(codeRefs, false, animationDurations.highlight);
      
      // Shift original node diagram slightly left to make room
      yield* nodeContainer().x(leftX - 100, animationDurations.transform);
      
      // Expand into 3-node chain
      // nextArrow currently points to [80, 20]. node2 is at 220, so left edge is 170.
      // nextBox is at 70, so we point to [100, 20] to reach 170.
      yield* sequence(
        0.3,
        nextArrow().points([ [0, 20], [100, 20] ], animationDurations.pointerMove),
        node2().opacity(1, animationDurations.fadeIn),
        arrow2to3().opacity(1, animationDurations.fadeIn),
        node3().opacity(1, animationDurations.fadeIn)
      );
      
      // Show head label and on-screen text
      yield* all(
        headLabel().opacity(1, animationDurations.fadeIn),
        headArrow().opacity(1, animationDurations.fadeIn),
        beatCText().opacity(1, animationDurations.fadeIn)
      );
      
      const timeSpentC = animationDurations.highlight + animationDurations.transform + 1.2 + animationDurations.fadeIn;
      const paddingC = beatCDuration - timeSpentC;
      if (paddingC > 0) yield* waitFor(paddingC);
    })(),
  );
});
