import { makeScene2D, Rect, Circle, Line, Txt, Node } from '@revideo/2d';
import { all, sequence, waitFor, createRef, fadeTransition } from '@revideo/core';
import { colors, fonts, fontWeights, animationDurations, pointerStyle, nodeStyle , canvas } from '../styles/theme.js';
import { cuesFromAlignment, groupCues } from '../utils/captions.js';
import alignmentData from '../assets/alignment/Scene005-alignment.json';
import { CodeBlock, createCodeBlockRefs, moveHighlight } from '../components/CodeBlock.js';

export default makeScene2D('Scene005', function* (view) {
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
  const arrow4 = createRef<Line>(); // This will originally point to null
  const nullLabel1 = createRef<Txt>(); // Old null
  
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
  const nullLabel2 = createRef<Txt>(); // New null
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
  const codeString = `void insertAtTail(Node*& head, int value) {\n    Node* newNode = new Node();\n    newNode->data = value;\n    newNode->next = nullptr;\n\n    if (head == nullptr) {\n        head = newNode;\n        return;\n    }\n\n    Node* temp = head;\n    while (temp->next != nullptr) {\n        temp = temp->next;\n    }\n    temp->next = newNode;\n}`;

  const beatCTextStr = "Notice the difference from inserting at the head. Because we have to walk through every node to find the end, this operation takes O of n time, where n is the number of nodes in the list. If we had kept a separate tail pointer, we could do this in constant time instead, but for now, we'll keep things simple and always find the tail by walking there ourselves.";

  const allCues = groupCues(cuesFromAlignment(alignmentData));

  // --- LAYOUT ---
  const leftX = -480;
  const rightX = 480;

  const nodeRadius = 50;
  const nodeSpacing = 180; // slightly tighter to fit 5 nodes eventually

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
      <Node ref={nodeContainer} x={-800} y={0} opacity={0}>
        
        {/* Existing 4-Node Chain */}
        {createNodeWithArrow(node1, arrow1, 0)}
        {createNodeWithArrow(node2, arrow2, nodeSpacing)}
        {createNodeWithArrow(node3, arrow3, nodeSpacing * 2)}
        {createNodeWithArrow(node4, arrow4, nodeSpacing * 3)}

        <Txt
          ref={nullLabel1}
          x={nodeSpacing * 4}
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
        
        {/* New Node (appears below the last node initially) */}
        <Node ref={newNodeGroup} x={nodeSpacing * 3} y={150} opacity={0}>
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
            points={[ [nodeRadius, 0], [nodeSpacing - nodeRadius - 10, 0] ]}
            stroke={colors.nodeBorder}
            lineWidth={pointerStyle.strokeWidth}
            endArrow
            arrowSize={pointerStyle.arrowheadSize}
          />
          <Txt
            ref={nullLabel2}
            x={nodeSpacing}
            y={0}
            text="null"
            fill={colors.text}
            fontFamily={fonts.code}
            fontWeight={fontWeights.headingWeight}
            fontSize={32}
          />
        </Node>

      </Node>

      {/* TEXT: BEAT C */}
      <Node y={250} x={-450} opacity={0} ref={beatCTextLine1}>
        <Txt
          y={-20}
          text="Insert at Tail: O(n)"
          fill={colors.text}
          fontFamily={fonts.body}
          fontWeight={fontWeights.bodyWeight}
          fontSize={32}
        />
        <Txt
          y={20}
          text="must traverse to find the last node"
          fill={colors.text}
          fontFamily={fonts.body}
          fontWeight={fontWeights.bodyWeight}
          fontSize={28}
        />
      </Node>

      {/* RIGHT: CODE BLOCK */}
      <Node ref={codeBlockContainer} x={520} y={-40} opacity={0}>
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
      // BEAT A: 0s - 38.5s
      const beatADuration = 29.84;
      
      yield* all(
        nodeContainer().opacity(1, animationDurations.fadeIn),
        codeBlockContainer().opacity(1, animationDurations.fadeIn)
      );

      yield* waitFor(1);
      
      // new node logic
      yield* moveHighlight(codeRefs, 1, animationDurations.highlight); // Node* newNode = new Node();
      yield* waitFor(1);
      
      yield* newNodeGroup().opacity(1, animationDurations.fadeIn); // Fade in off to the side pointing to null
      yield* waitFor(1);
      
      yield* moveHighlight(codeRefs, 3, animationDurations.highlight); // newNode->next = nullptr;
      
      const timeSpentA = animationDurations.fadeIn + 1 + animationDurations.highlight + 1 + animationDurations.fadeIn + 1 + animationDurations.highlight;
      const paddingA = beatADuration - timeSpentA;
      if (paddingA > 0) yield* waitFor(paddingA);

      // BEAT B: 31.1s - 63.9s
      const beatBDuration = 66.28 - 29.84;
      
      // Highlight "if (head == nullptr)" skip
      yield* moveHighlight(codeRefs, 5, animationDurations.highlight);
      yield* waitFor(1);
      
      yield* moveHighlight(codeRefs, 10, animationDurations.highlight); // Node* temp = head;
      
      yield* tempGroup().opacity(1, animationDurations.fadeIn);
      yield* sequence(
        0.1,
        tempGroup().y(-120, animationDurations.highlight / 2),
        tempGroup().y(-100, animationDurations.highlight / 2)
      );
      
      // Hops definition
      const doHop = function* (targetX: number) {
        yield* moveHighlight(codeRefs, 11, animationDurations.highlight); // while (temp->next != nullptr)
        yield* waitFor(0.5);
        yield* moveHighlight(codeRefs, 12, animationDurations.highlight); // temp = temp->next;
        
        yield* tempGroup().x(targetX, animationDurations.pointerMove);
        yield* sequence(
          0.1,
          tempGroup().y(-120, animationDurations.highlight / 2),
          tempGroup().y(-100, animationDurations.highlight / 2)
        );
      };

      // 3 hops to reach node 4 (which is at nodeSpacing * 3)
      // We start at x=0
      yield* doHop(nodeSpacing);
      yield* waitFor(0.5);
      yield* doHop(nodeSpacing * 2);
      yield* waitFor(0.5);
      yield* doHop(nodeSpacing * 3);
      
      yield* moveHighlight(codeRefs, 11, animationDurations.highlight); // while loop fails on node4
      yield* waitFor(0.5);
      
      // Pulse node 4 to signal "found tail"
      yield* sequence(
        0.1,
        node4().stroke(colors.tertiaryAccent, animationDurations.highlight),
        node4().lineWidth(nodeStyle.borderWidth * 2, animationDurations.highlight),
        node4().lineWidth(nodeStyle.borderWidth, animationDurations.highlight),
        node4().stroke(colors.nodeBorder, animationDurations.highlight)
      );
      
      yield* moveHighlight(codeRefs, 14, animationDurations.highlight); // temp->next = newNode;
      
      // Arrow 4 draws to the new node
      // Old nullLabel1 fades out
      yield* all(
        nullLabel1().opacity(0, animationDurations.fadeOut),
        // animate arrow4 points to point down towards newNode
        // arrow4 starts at [nodeRadius, 0]. We animate the start point to [0, nodeRadius] (bottom of Node4)
        // and the end point to [0, 150 - nodeRadius - 10] (top of newNode)
        arrow4().points([ [0, nodeRadius], [0, 150 - nodeRadius - 10] ], animationDurations.pointerMove)
      );
      
      const timeSpentB = animationDurations.highlight + 1 + animationDurations.highlight + animationDurations.fadeIn + animationDurations.highlight + 
        (animationDurations.highlight * 2 + 0.5 + animationDurations.pointerMove + animationDurations.highlight) * 3 + 1 + // 3 hops
        animationDurations.highlight + 0.5 + animationDurations.highlight * 4 + 0.1 + animationDurations.highlight + animationDurations.fadeOut;
      const paddingB = beatBDuration - timeSpentB;
      if (paddingB > 0) yield* waitFor(paddingB);

      // BEAT C: 63.9s - 87.4s
      const beatCDuration = 88.74 - 66.28;
      
      // Highlight while loop and final line in sync with O(n) explanation
      yield* moveHighlight(codeRefs, 11, animationDurations.highlight);
      yield* waitFor(1.5);
      yield* moveHighlight(codeRefs, 14, animationDurations.highlight);
      yield* waitFor(1.5);
      yield* moveHighlight(codeRefs, -1, animationDurations.highlight);
      
      yield* beatCTextLine1().opacity(1, animationDurations.fadeIn);
      
      const timeSpentC = animationDurations.highlight * 3 + 3 + animationDurations.fadeIn;
      const paddingC = beatCDuration - timeSpentC;
      if (paddingC > 0) yield* waitFor(paddingC);
    })(),
  );
});
