import { makeScene2D, Rect, Circle, Line, Txt, Node } from '@revideo/2d';
import { all, sequence, waitFor, createRef, fadeTransition } from '@revideo/core';
import { colors, fonts, fontWeights, animationDurations, pointerStyle, nodeStyle , canvas } from '../styles/theme.js';
import { cuesFromAlignment, groupCues } from '../utils/captions.js';
import alignmentData from '../assets/alignment/Scene004-alignment.json';
import { CodeBlock, createCodeBlockRefs, moveHighlight } from '../components/CodeBlock.js';

export default makeScene2D('Scene004', function* (view) {
  view.fill(colors.background);

  // --- REFS ---
  const nodeContainer = createRef<Node>();
  
  // Existing Nodes and arrows
  const node1 = createRef<Circle>();
  const arrow1 = createRef<Line>();
  const node2 = createRef<Circle>();
  const arrow2 = createRef<Line>();
  const node3 = createRef<Circle>();
  const arrow3 = createRef<Line>();
  const nullLabel = createRef<Txt>();
  
  // Head pointer
  const headLabel = createRef<Txt>();
  const headArrow = createRef<Line>();
  const headGroup = createRef<Node>();
  
  // New Node
  const newNode = createRef<Circle>();
  const newArrow = createRef<Line>();
  
  // On-screen text
  const beatCTextLine1 = createRef<Txt>();
  const beatCTextLine2 = createRef<Txt>();

  // Right Side: CodeBlock
  const codeBlockContainer = createRef<Node>();
  const codeRefs = createCodeBlockRefs();

  // Caption refs
  const captionContainer = createRef<Rect>();
  const captionText = createRef<Txt>();
  const captionText2 = createRef<Txt>();

  // --- CONTENT & DATA ---
  const codeString = `void insertAtHead(Node*& head, int value) {\n    Node* newNode = new Node();\n    newNode->data = value;\n    newNode->next = head;\n    head = newNode;\n}`;

  const beatCTextStr = "In big O notation, we call this O of 1. Compare that to an array, where inserting at the front means shifting every single element over. This is one of the biggest advantages linked lists have over arrays.";

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
        points={[ [nodeRadius, 0], [nodeSpacing - nodeRadius - 10, 0] ]}
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
      <Node ref={nodeContainer} x={leftX - nodeSpacing * 1.0} y={0} opacity={0}>
        
        {/* Existing Chain */}
        {createNodeWithArrow(node1, arrow1, 0)}
        {createNodeWithArrow(node2, arrow2, nodeSpacing)}
        {createNodeWithArrow(node3, arrow3, nodeSpacing * 2)}

        <Txt
          ref={nullLabel}
          x={nodeSpacing * 3}
          y={0}
          text="null"
          fill={colors.text}
          fontFamily={fonts.code}
          fontWeight={fontWeights.headingWeight}
          fontSize={32}
        />

        {/* Head Pointer */}
        <Node ref={headGroup} x={0} y={-100}>
          <Txt
            ref={headLabel}
            y={-40}
            text="head"
            fill={colors.text}
            fontFamily={fonts.code}
            fontWeight={fontWeights.headingWeight}
            fontSize={28}
          />
          <Line
            ref={headArrow}
            points={[ [0, -20], [0, 30] ]}
            stroke={colors.nodeBorder}
            lineWidth={pointerStyle.strokeWidth}
            endArrow
            arrowSize={pointerStyle.arrowheadSize}
          />
        </Node>
        
        {/* New Node (appears above and to the left) */}
        <Node x={-nodeSpacing} y={0}>
          <Circle
            ref={newNode}
            y={-120}
            width={nodeRadius * 2}
            height={nodeRadius * 2}
            fill={colors.primaryAccent}
            stroke={colors.nodeBorder}
            lineWidth={nodeStyle.borderWidth}
            opacity={0}
          />
          <Line
            ref={newArrow}
            points={[ [0, -120 + nodeRadius], [nodeSpacing - 15, -15] ]} // points from new node down to node 1
            stroke={colors.nodeBorder}
            lineWidth={pointerStyle.strokeWidth}
            endArrow
            arrowSize={pointerStyle.arrowheadSize}
            end={0}
          />
        </Node>

      </Node>

      {/* TEXT: BEAT C */}
      <Node y={220} x={leftX} opacity={0} ref={beatCTextLine1}>
        <Txt
          y={-20}
          text="Insert at Head: O(1)"
          fill={colors.text}
          fontFamily={fonts.body}
          fontWeight={fontWeights.bodyWeight}
          fontSize={32}
        />
        <Txt
          ref={beatCTextLine2}
          y={20}
          text="newNode->next = head; head = newNode;"
          fill={colors.text}
          fontFamily={fonts.code}
          fontWeight={fontWeights.bodyWeight}
          fontSize={28}
        />
      </Node>

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
      // BEAT A: 0s - 32.1s
      const beatADuration = 36.9;
      
      yield* all(
        nodeContainer().opacity(1, animationDurations.fadeIn),
        codeBlockContainer().opacity(1, animationDurations.fadeIn)
      );

      yield* waitFor(1);
      
      yield* moveHighlight(codeRefs, 1, animationDurations.highlight); // "Node* newNode = new Node();"
      yield* waitFor(1);
      
      yield* newNode().opacity(1, animationDurations.fadeIn);
      yield* waitFor(1);
      
      yield* moveHighlight(codeRefs, 2, animationDurations.highlight); // "newNode->data = value;"
      
      const timeSpentA = animationDurations.fadeIn + 1 + animationDurations.highlight + 1 + animationDurations.fadeIn + 1 + animationDurations.highlight;
      const paddingA = beatADuration - timeSpentA;
      if (paddingA > 0) yield* waitFor(paddingA);

      // BEAT B: 32.1s - 65.8s
      const beatBDuration = 56.84 - 36.9;
      
      yield* moveHighlight(codeRefs, 3, animationDurations.highlight); // "newNode->next = head;"
      yield* waitFor(0.5);
      
      // Draw arrow from new node to old head
      yield* newArrow().end(1, animationDurations.pointerMove);
      yield* waitFor(1);
      
      yield* moveHighlight(codeRefs, 4, animationDurations.highlight); // "head = newNode;"
      yield* waitFor(0.5);
      
      // Slide head label over to point at new node
      // Wait, headGroup is at x=0. new node is at x=-nodeSpacing.
      // We also move new node down to y=0, and adjust its arrow to be horizontal.
      yield* all(
        headGroup().x(-nodeSpacing, animationDurations.moveTo),
        newNode().y(0, animationDurations.moveTo),
        newArrow().points([ [nodeRadius, 0], [nodeSpacing - nodeRadius - 10, 0] ], animationDurations.moveTo)
      );
      
      // Highlight flash on headGroup to confirm update
      yield* sequence(
        0.1,
        headGroup().y(-120, animationDurations.highlight / 2),
        headGroup().y(-100, animationDurations.highlight / 2)
      );
      
      const timeSpentB = animationDurations.highlight + 0.5 + animationDurations.pointerMove + 1 + animationDurations.highlight + 0.5 + animationDurations.moveTo + 0.1 + animationDurations.highlight;
      const paddingB = beatBDuration - timeSpentB;
      if (paddingB > 0) yield* waitFor(paddingB);

      // BEAT C: 65.8s - 78.5s
      const beatCDuration = 83.0 - 56.84;
      
      yield* moveHighlight(codeRefs, -1, animationDurations.highlight);
      
      yield* beatCTextLine1().opacity(1, animationDurations.fadeIn);
      
      const timeSpentC = animationDurations.highlight + animationDurations.fadeIn;
      const paddingC = beatCDuration - timeSpentC;
      if (paddingC > 0) yield* waitFor(paddingC);
    })(),
  );
});
