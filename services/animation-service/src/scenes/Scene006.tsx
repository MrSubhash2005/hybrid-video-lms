import { makeScene2D, Rect, Circle, Line, Txt, Node } from '@revideo/2d';
import { all, sequence, waitFor, createRef, fadeTransition } from '@revideo/core';
import { colors, fonts, fontWeights, animationDurations, pointerStyle, nodeStyle , canvas } from '../styles/theme.js';
import { cuesFromAlignment, groupCues } from '../utils/captions.js';
import alignmentData from '../assets/alignment/Scene006-alignment.json';
import { CodeBlock, createCodeBlockRefs, moveHighlight } from '../components/CodeBlock.js';

export default makeScene2D('Scene006', function* (view) {
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
  const node4 = createRef<Circle>();
  const arrow4 = createRef<Line>();
  const node5 = createRef<Circle>();
  const arrow5 = createRef<Line>();
  const nullLabel = createRef<Txt>();
  
  // Head pointer
  const headLabel = createRef<Txt>();
  const headArrow = createRef<Line>();
  const headGroup = createRef<Node>();
  
  // Temp pointer
  const tempPointer = createRef<Txt>();
  const tempArrow = createRef<Line>();
  const tempGroup = createRef<Node>();
  
  // New Node
  const newNode = createRef<Circle>();
  const newArrow = createRef<Line>();
  const newNodeGroup = createRef<Node>();
  
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
  const codeString = `void insertAtPosition(Node*& head, int value, int position) {\n    if (position == 0) {\n        insertAtHead(head, value);\n        return;\n    }\n\n    Node* newNode = new Node();\n    newNode->data = value;\n\n    Node* temp = head;\n    for (int i = 0; i < position - 1 && temp != nullptr; i++) {\n        temp = temp->next;\n    }\n\n    if (temp == nullptr) return;\n\n    newNode->next = temp->next;\n    temp->next = newNode;\n}`;

  const beatCTextStr = "As a special case, if we're inserting at position zero, that's really just inserting at the head, which we already know how to do. Otherwise, we count our way to the correct position, and perform this two-step relinking. Since we might have to walk partway or even all the way through the list to find the right spot, this operation also takes O of n time in the worst case.";

  const allCues = groupCues(cuesFromAlignment(alignmentData));

  // --- LAYOUT ---
  const leftX = -480;
  const rightX = 480;

  const nodeRadius = 50;
  const nodeSpacing = 160;

  const createNodeWithArrow = (
    nodeRef: any,
    arrowRef: any,
    xPos: number,
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
        radius={20}
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
      <Node ref={nodeContainer} x={-900} y={0} opacity={0}>
        
        {/* Existing 5-Node Chain */}
        {createNodeWithArrow(node1, arrow1, 0)}
        {createNodeWithArrow(node2, arrow2, nodeSpacing)}
        {createNodeWithArrow(node3, arrow3, nodeSpacing * 2)}
        {createNodeWithArrow(node4, arrow4, nodeSpacing * 3)}
        {createNodeWithArrow(node5, arrow5, nodeSpacing * 4)}

        <Txt
          ref={nullLabel}
          x={nodeSpacing * 5}
          y={0}
          text="null"
          fill={colors.text}
          fontFamily={fonts.code}
          fontWeight={fontWeights.headingWeight}
          fontSize={32}
        />

        {/* Head Pointer */}
        <Node ref={headGroup} x={0} y={-120}>
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
            points={[ [0, -20], [0, 50] ]}
            stroke={colors.nodeBorder}
            lineWidth={pointerStyle.strokeWidth}
            endArrow
            arrowSize={pointerStyle.arrowheadSize}
          />
        </Node>
        
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
        
        {/* New Node (appears below the gap between node 2 and node 3) */}
        <Node ref={newNodeGroup} x={nodeSpacing * 1.5} y={150} opacity={0}>
          <Circle
            ref={newNode}
            width={nodeRadius * 2}
            height={nodeRadius * 2}
            fill={colors.primaryAccent}
            stroke={colors.nodeBorder}
            lineWidth={nodeStyle.borderWidth}
          />
          <Line
            ref={newArrow}
            // Route from right of new node, curve up, to bottom of node 3
            points={[ 
              [nodeRadius, 0], 
              [nodeSpacing/2, 0],
              [nodeSpacing/2, -150 + nodeRadius + 10] 
            ]}
            radius={20}
            stroke={colors.nodeBorder}
            lineWidth={pointerStyle.strokeWidth}
            endArrow
            arrowSize={pointerStyle.arrowheadSize}
            end={0}
          />
        </Node>

      </Node>

      {/* TEXT: BEAT C */}
      <Node y={250} x={-450} opacity={0} ref={beatCTextLine1}>
        <Txt
          y={-20}
          text="Insert at Middle:"
          fill={colors.text}
          fontFamily={fonts.body}
          fontWeight={fontWeights.bodyWeight}
          fontSize={32}
        />
        <Txt
          y={20}
          text="connect forward first, then relink backward"
          fill={colors.text}
          fontFamily={fonts.body}
          fontWeight={fontWeights.bodyWeight}
          fontSize={28}
        />
      </Node>

      {/* RIGHT: CODE BLOCK */}
      <Node ref={codeBlockContainer} x={520} y={-80} opacity={0}>
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
      // BEAT A: 0s - 32.6s
      const beatADuration = 36.08;
      
      yield* all(
        nodeContainer().opacity(1, animationDurations.fadeIn),
        codeBlockContainer().opacity(1, animationDurations.fadeIn)
      );

      yield* waitFor(1);
      
      yield* moveHighlight(codeRefs, 9, animationDurations.highlight); // Node* temp = head;
      
      // Temp appears at node 1
      yield* tempGroup().opacity(1, animationDurations.fadeIn);
      yield* sequence(
        0.1,
        tempGroup().y(-120, animationDurations.highlight / 2),
        tempGroup().y(-100, animationDurations.highlight / 2)
      );
      
      yield* waitFor(1);
      
      yield* moveHighlight(codeRefs, 10, animationDurations.highlight); // for loop
      yield* waitFor(1);
      
      // Hop to node 2
      yield* moveHighlight(codeRefs, 11, animationDurations.highlight); // temp = temp->next;
      yield* tempGroup().x(nodeSpacing, animationDurations.pointerMove);
      yield* sequence(
        0.1,
        tempGroup().y(-120, animationDurations.highlight / 2),
        tempGroup().y(-100, animationDurations.highlight / 2)
      );
      
      // Temp lands and stays on node 2 as beat A ends
      const timeSpentA = animationDurations.fadeIn + 1 + animationDurations.highlight + animationDurations.fadeIn + animationDurations.highlight + 1 + animationDurations.highlight + 1 + animationDurations.highlight + animationDurations.pointerMove + animationDurations.highlight;
      const paddingA = beatADuration - timeSpentA;
      if (paddingA > 0) yield* waitFor(paddingA);

      // BEAT B: 32.6s - 63.9s
      const beatBDuration = 64.84 - 36.08;
      
      yield* moveHighlight(codeRefs, 6, animationDurations.highlight); // Node* newNode = new Node();
      yield* waitFor(0.5);
      
      // New node fades in below the chain
      yield* newNodeGroup().opacity(1, animationDurations.fadeIn);
      yield* waitFor(1);
      
      yield* moveHighlight(codeRefs, 16, animationDurations.highlight); // newNode->next = temp->next;
      yield* waitFor(0.5);
      
      // Draw dashed arrow to node 3
      newArrow().lineDash([10, 10]);
      yield* newArrow().end(1, animationDurations.pointerMove);
      yield* waitFor(1);
      
      // Convert dashed to solid
      yield* newArrow().lineDash([], animationDurations.highlight);
      yield* waitFor(1);
      
      yield* moveHighlight(codeRefs, 17, animationDurations.highlight); // temp->next = newNode;
      yield* waitFor(0.5);
      
      // Re-route arrow 2 to point to newNode
      // We want it to end at the top of newNode.
      // Relative to Node 2 (x=160), newNode is at x=80, y=150
      yield* arrow2().points([ 
        [nodeRadius, 0], 
        [nodeSpacing * 0.5, 0],
        [nodeSpacing * 0.5, 150 - nodeRadius - 10] 
      ], animationDurations.pointerMove);
      
      const timeSpentB = animationDurations.highlight + 0.5 + animationDurations.fadeIn + 1 + animationDurations.highlight + 0.5 + animationDurations.pointerMove + 1 + animationDurations.highlight + 1 + animationDurations.highlight + 0.5 + animationDurations.pointerMove;
      const paddingB = beatBDuration - timeSpentB;
      if (paddingB > 0) yield* waitFor(paddingB);

      // BEAT C: 63.9s - 88.1s
      const beatCDuration = 89.08 - 64.84;
      
      // Highlight position == 0 block
      yield* moveHighlight(codeRefs, 1, animationDurations.highlight);
      yield* waitFor(0.5);
      yield* moveHighlight(codeRefs, 2, animationDurations.highlight);
      yield* waitFor(0.5);
      yield* moveHighlight(codeRefs, 3, animationDurations.highlight);
      yield* waitFor(0.5);
      
      // Highlight forward then backward
      yield* moveHighlight(codeRefs, 16, animationDurations.highlight); // forward
      yield* waitFor(1.5);
      yield* moveHighlight(codeRefs, 17, animationDurations.highlight); // backward
      yield* waitFor(1.5);
      
      yield* moveHighlight(codeRefs, -1, animationDurations.highlight); // clear
      
      // On-screen text
      yield* beatCTextLine1().opacity(1, animationDurations.fadeIn);
      
      const timeSpentC = animationDurations.highlight * 3 + 1.5 + animationDurations.highlight + 1.5 + animationDurations.highlight + 1.5 + animationDurations.highlight + animationDurations.fadeIn;
      const paddingC = beatCDuration - timeSpentC;
      if (paddingC > 0) yield* waitFor(paddingC);
    })(),
  );
});
