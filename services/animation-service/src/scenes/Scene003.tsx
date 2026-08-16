import { makeScene2D, Rect, Circle, Line, Txt, Node } from '@revideo/2d';
import { all, sequence, waitFor, createRef, fadeTransition } from '@revideo/core';
import { colors, fonts, fontWeights, animationDurations, pointerStyle, nodeStyle , canvas } from '../styles/theme.js';
import { cuesFromAlignment, groupCues } from '../utils/captions.js';
import alignmentData from '../assets/alignment/Scene003-alignment.json';
import { CodeBlock, createCodeBlockRefs, moveHighlight } from '../components/CodeBlock.js';

export default makeScene2D('Scene003', function* (view) {
  view.fill(colors.background);

  // --- REFS ---
  const nodeContainer = createRef<Node>();
  
  // Nodes and arrows
  const node1 = createRef<Circle>();
  const arrow1 = createRef<Line>();
  const node2 = createRef<Circle>();
  const arrow2 = createRef<Line>();
  const node3 = createRef<Circle>();
  const arrow3 = createRef<Line>();
  const node4 = createRef<Circle>();
  const arrow4 = createRef<Line>();
  const nullLabel = createRef<Txt>();
  
  // Temp pointer
  const tempPointer = createRef<Txt>();
  const tempArrow = createRef<Line>();
  const tempGroup = createRef<Node>();
  

  // Right Side: CodeBlock
  const codeBlockContainer = createRef<Node>();
  const codeRefs = createCodeBlockRefs();

  // Caption refs
  const captionContainer = createRef<Rect>();
  const captionText = createRef<Txt>();
  const captionText2 = createRef<Txt>();
  const beatCText = createRef<Txt>();

  // --- CONTENT & DATA ---
  const codeString = `Node* temp = head;\nwhile (temp != nullptr) {\n    cout << temp->data << " ";\n    temp = temp->next;\n}`;

  const beatCTextStr = "Whether we're searching for a value, counting the nodes, or finding the last node so we can insert something new, we'll always come back to this same pattern of walking forward one step at a time. Unlike an array, where you can jump straight to any index, a linked list only lets you move forward, one link at a time, starting from the head.";

  const allCues = groupCues(cuesFromAlignment(alignmentData));

  // --- LAYOUT ---
  const leftX = -480;
  const rightX = 480;

  const nodeRadius = 50;
  const nodeSpacing = 200; // Distance between node centers

  const createNodeWithArrow = (
    nodeRef: any,
    arrowRef: any,
    xPos: number,
    isLast: boolean = false
  ) => (
    <Node x={xPos} y={0}>
      <Circle
        ref={nodeRef}
        width={nodeRadius * 2}
        height={nodeRadius * 2}
        fill={colors.primaryAccent}
        stroke={colors.nodeBorder}
        lineWidth={nodeStyle.borderWidth}
      />
      <Line
        ref={arrowRef}
        points={[ [nodeRadius, 0], [nodeSpacing - nodeRadius - 10, 0] ]} // leave a little gap for the arrowhead
        stroke={colors.nodeBorder}
        lineWidth={pointerStyle.strokeWidth}
        endArrow
        arrowSize={pointerStyle.arrowheadSize}
      />
    </Node>
  );

  view.add(
    <Node>
      {/* LEFT: NODE DIAGRAM */}
      <Node ref={nodeContainer} x={leftX - nodeSpacing * 1.5} y={0} opacity={0}>
        
        {createNodeWithArrow(node1, arrow1, 0)}
        {createNodeWithArrow(node2, arrow2, nodeSpacing)}
        {createNodeWithArrow(node3, arrow3, nodeSpacing * 2)}
        {createNodeWithArrow(node4, arrow4, nodeSpacing * 3, true)}

        <Txt
          ref={nullLabel}
          x={nodeSpacing * 4}
          y={0}
          text="null"
          fill={colors.text}
          fontFamily={fonts.code}
          fontWeight={fontWeights.headingWeight}
          fontSize={32}
        />

        {/* Temp Pointer */}
        <Node ref={tempGroup} x={0} y={-100} opacity={0}>
          <Txt
            ref={tempPointer}
            y={-40}
            text="temp"
            fill={colors.tertiaryAccent}
            fontFamily={fonts.code}
            fontWeight={fontWeights.headingWeight}
            fontSize={28}
          />
          <Line
            ref={tempArrow}
            points={[ [0, -20], [0, 30] ]}
            stroke={colors.tertiaryAccent}
            lineWidth={pointerStyle.strokeWidth}
            endArrow
            arrowSize={pointerStyle.arrowheadSize}
          />
        </Node>

      </Node>

      {/* TEXT: BEAT C */}
      <Txt
        ref={beatCText}
        x={leftX}
        y={200}
        text="Traversal: temp = head, move until temp == nullptr"
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
      // BEAT A: 0s - 28.4s
      const beatADuration = 18.72;
      
      yield* all(
        nodeContainer().opacity(1, animationDurations.fadeIn),
        codeBlockContainer().opacity(1, animationDurations.fadeIn)
      );

      yield* waitFor(1);
      
      // Temp marker fades in and pulses
      yield* tempGroup().opacity(1, animationDurations.fadeIn);
      yield* sequence(
        0.1,
        tempGroup().y(-120, animationDurations.highlight / 2),
        tempGroup().y(-100, animationDurations.highlight / 2)
      );
      
      yield* moveHighlight(codeRefs, 0, animationDurations.highlight); // "Node* temp = head;"
      
      const timeSpentA = animationDurations.fadeIn + 1 + animationDurations.fadeIn + animationDurations.highlight + animationDurations.highlight;
      const paddingA = beatADuration - timeSpentA;
      if (paddingA > 0) yield* waitFor(paddingA);

      // BEAT B: 28.4s - 60.9s
      const beatBDuration = 52.8 - 18.72;
      
      // Hops definition
      const doHop = function* (targetX: number) {
        // highlight while condition
        yield* moveHighlight(codeRefs, 1, animationDurations.highlight);
        yield* waitFor(0.5);
        
        // highlight temp = temp->next
        yield* moveHighlight(codeRefs, 3, animationDurations.highlight);
        
        // Move pointer and pulse
        yield* tempGroup().x(targetX, animationDurations.pointerMove);
        yield* sequence(
          0.1,
          tempGroup().y(-120, animationDurations.highlight / 2),
          tempGroup().y(-100, animationDurations.highlight / 2)
        );
      };

      // We have 3 hops (to node 2, 3, 4)
      const hopDelay = (beatBDuration - (3 * (animationDurations.highlight * 2 + 0.5 + animationDurations.pointerMove + animationDurations.highlight))) / 4;
      
      yield* waitFor(hopDelay);
      yield* doHop(nodeSpacing); // To node 2
      
      yield* waitFor(hopDelay);
      yield* doHop(nodeSpacing * 2); // To node 3
      
      yield* waitFor(hopDelay);
      yield* doHop(nodeSpacing * 3); // To node 4
      
      yield* waitFor(hopDelay);

      // BEAT C: 60.9s - 84.5s
      const beatCDuration = 78.56 - 52.8;
      
      // Final hop to null
      yield* moveHighlight(codeRefs, 1, animationDurations.highlight);
      yield* waitFor(0.5);
      
      yield* moveHighlight(codeRefs, 3, animationDurations.highlight);
      
      yield* tempGroup().x(nodeSpacing * 4, animationDurations.pointerMove);
      yield* sequence(
        0.1,
        tempGroup().y(-120, animationDurations.highlight / 2),
        tempGroup().y(-100, animationDurations.highlight / 2)
      );
      
      // Highlight arrow to null
      yield* arrow4().stroke(colors.tertiaryAccent, animationDurations.highlight);
      
      yield* waitFor(0.5);
      
      // While condition false, loop ends
      yield* moveHighlight(codeRefs, 1, animationDurations.highlight);
      yield* waitFor(1);
      yield* moveHighlight(codeRefs, -1, animationDurations.highlight);
      
      yield* beatCText().opacity(1, animationDurations.fadeIn);
      
      const timeSpentC = animationDurations.highlight * 4 + 0.5 + animationDurations.pointerMove + 0.5 + 1 + animationDurations.fadeIn;
      const paddingC = beatCDuration - timeSpentC;
      if (paddingC > 0) yield* waitFor(paddingC);
    })(),
  );
});
