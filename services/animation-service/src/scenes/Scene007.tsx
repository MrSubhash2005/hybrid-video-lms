import { makeScene2D, Rect, Circle, Line, Txt, Node, colorSignal } from '@revideo/2d';
import { all, sequence, waitFor, createRef, createSignal, fadeTransition } from '@revideo/core';
import { colors, fonts, fontWeights, animationDurations, pointerStyle, nodeStyle, canvas, codeBlock } from '../styles/theme.js';
import { cuesFromAlignment, groupCues } from '../utils/captions.js';
import alignmentData from '../assets/alignment/Scene007-alignment.json';
import { CodeBlock, createCodeBlockRefs, moveHighlight } from '../components/CodeBlock.js';

export default makeScene2D('Scene007', function* (view) {
  view.fill(colors.background);

  // --- REFS ---
  // Chain A (Beat A)
  const chainAContainer = createRef<Node>();
  const node1A = createRef<Circle>();
  const arrow1A = createRef<Line>();
  const node2A = createRef<Circle>();
  const arrow2A = createRef<Line>();
  const node3A = createRef<Circle>();
  const arrow3A = createRef<Line>();
  const node4A = createRef<Circle>();
  const arrow4A = createRef<Line>();
  const node5A = createRef<Circle>();
  const arrow5A = createRef<Line>();
  const nullLabelA = createRef<Txt>();
  
  const headGroupA = createRef<Node>();
  const headArrowA = createRef<Line>();
  const tempGroupA = createRef<Node>();

  // Chain B (Beat B, C1, C2)
  const chainBContainer = createRef<Node>();
  const node1B = createRef<Circle>();
  const arrow1B = createRef<Line>();
  const node2B = createRef<Circle>();
  const arrow2B = createRef<Line>();
  const node3B = createRef<Circle>();
  const arrow3B = createRef<Line>();
  const node4B = createRef<Circle>();
  const arrow4B = createRef<Line>();
  const node5B = createRef<Circle>();
  const arrow5B = createRef<Line>();
  const nullLabelB = createRef<Txt>();
  
  const headGroupB = createRef<Node>();
  const tempGroupB = createRef<Node>();
  const newNullLabelB = createRef<Txt>(); // For C2 tail delete

  // Shared Texts
  const textHead = createRef<Node>();
  const textMiddleTail = createRef<Node>();

  // CodeBlock
  const codeBlockContainer = createRef<Node>();
  const codeRefs = createCodeBlockRefs();

  // Caption refs
  const captionContainer = createRef<Rect>();
  const captionText = createRef<Txt>();
  const captionText2 = createRef<Txt>();

  // --- NARRATION ---
  const beatCTextStr = "Then we update temp's next to skip over it, pointing instead to the node after the one being deleted. Finally, we delete that saved node to free its memory. If the node we're deleting happens to be the very last node, this same logic still works perfectly. Temp's next simply becomes nullptr after the update, correctly marking the new end of the list. That's the beauty of this approach, deleting from the middle and deleting the tail are actually the same operation.";

  const allCues = groupCues(cuesFromAlignment(alignmentData));

  // --- CONTENT & DATA ---
  const codeString = `void deleteNode(Node*& head, int position) {
    if (head == nullptr) return;

    if (position == 0) {
        Node* toDelete = head;
        head = head->next;
        delete toDelete;
        return;
    }

    Node* temp = head;
    for (int i = 0; i < position - 1 && temp->next != nullptr; i++) {
        temp = temp->next;
    }

    if (temp->next == nullptr) return;

    Node* toDelete = temp->next;
    temp->next = toDelete->next;
    delete toDelete;
}`;

  // --- LAYOUT ---
  const nodeRadius = 50;
  const nodeSpacing = 160;

  // We want to safely avoid clipping on left.
  // Chain length = 5 nodes * 160 = 800px. Center of chain is around 320.
  // CodeBlock is at x=520 (right side). 
  // Place chain at x = -800 to ensure full clearance.
  const chainX = -800;

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
        radius={20} // useful for rerouting
      />
    </Node>
  );

  const createPointer = (groupRef: any, labelText: string, color: string, startY: number, arrowY: number, labelY: number, opacity: number = 0) => (
    <Node ref={groupRef} x={0} y={startY} opacity={opacity}>
      <Txt
        y={labelY}
        text={labelText}
        fill={color}
        fontFamily={fonts.code}
        fontWeight={fontWeights.headingWeight}
        fontSize={28}
      />
      <Line
        points={[ [0, -20], [0, arrowY] ]}
        stroke={color}
        lineWidth={pointerStyle.strokeWidth}
        endArrow
        arrowSize={pointerStyle.arrowheadSize}
      />
    </Node>
  );

  view.add(
    <Node>
      {/* CHAIN A (Beat A) */}
      <Node ref={chainAContainer} x={chainX} y={0} opacity={0}>
        {createNodeWithArrow(node1A, arrow1A, 0)}
        {createNodeWithArrow(node2A, arrow2A, nodeSpacing)}
        {createNodeWithArrow(node3A, arrow3A, nodeSpacing * 2)}
        {createNodeWithArrow(node4A, arrow4A, nodeSpacing * 3)}
        {createNodeWithArrow(node5A, arrow5A, nodeSpacing * 4)}
        <Txt
          ref={nullLabelA}
          x={nodeSpacing * 5}
          y={0}
          text="null"
          fill={colors.text}
          fontFamily={fonts.code}
          fontWeight={fontWeights.headingWeight}
          fontSize={32}
        />
        {/* Head points to Node 1 */}
        <Node ref={headGroupA} x={0} y={-120}>
          <Txt y={-40} text="head" fill={colors.text} fontFamily={fonts.code} fontWeight={fontWeights.headingWeight} fontSize={28} />
          <Line ref={headArrowA} points={[ [0, -20], [0, 50] ]} stroke={colors.nodeBorder} lineWidth={pointerStyle.strokeWidth} endArrow arrowSize={pointerStyle.arrowheadSize} />
        </Node>
        {/* Temp points to Node 1 (appears later) */}
        {createPointer(tempGroupA, "temp", colors.tertiaryAccent, 120, -50, 40)}
      </Node>

      {/* CHAIN B (Beat B, C1, C2) */}
      <Node ref={chainBContainer} x={chainX} y={0} opacity={0}>
        {createNodeWithArrow(node1B, arrow1B, 0)}
        {createNodeWithArrow(node2B, arrow2B, nodeSpacing)}
        {createNodeWithArrow(node3B, arrow3B, nodeSpacing * 2)}
        {createNodeWithArrow(node4B, arrow4B, nodeSpacing * 3)}
        {createNodeWithArrow(node5B, arrow5B, nodeSpacing * 4)}
        <Txt
          ref={nullLabelB}
          x={nodeSpacing * 5}
          y={0}
          text="null"
          fill={colors.text}
          fontFamily={fonts.code}
          fontWeight={fontWeights.headingWeight}
          fontSize={32}
        />
        {/* Head points to Node 1 */}
        {createPointer(headGroupB, "head", colors.text, -120, 50, -40, 1)}
        {/* Temp points to Node 1 initially */}
        {createPointer(tempGroupB, "temp", colors.tertiaryAccent, -120, 50, -40, 0)}
        
        {/* New Null Label for C2 */}
        <Txt
          ref={newNullLabelB}
          x={nodeSpacing * 3}
          y={100}
          text="null"
          fill={colors.text}
          fontFamily={fonts.code}
          fontWeight={fontWeights.headingWeight}
          fontSize={32}
          opacity={0}
        />
      </Node>

      {/* TEXT: Delete Head */}
      <Node y={250} x={-450} opacity={0} ref={textHead}>
        <Txt text="Delete Head: O(1)" fill={colors.text} fontFamily={fonts.body} fontWeight={fontWeights.bodyWeight} fontSize={32} />
      </Node>
      
      {/* TEXT: Delete Middle / Tail */}
      <Node y={320} x={-450} opacity={0} ref={textMiddleTail}>
        <Txt text="Delete Middle / Tail: O(n) — find the node before it" fill={colors.text} fontFamily={fonts.body} fontWeight={fontWeights.bodyWeight} fontSize={32} />
      </Node>

      {/* RIGHT: CODE BLOCK */}
      <Node ref={codeBlockContainer} x={520} y={0} opacity={0}>
        <CodeBlock refs={codeRefs} code={codeString} />
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

  // Helper generator to pulse red for deletion target
  function* pulseRed(node: any) {
    yield* sequence(
      0.2,
      node().fill('#ef4444', 0.2), // Red
      node().fill(colors.primaryAccent, 0.2),
      node().fill('#ef4444', 0.2),
      node().fill(colors.primaryAccent, 0.2),
      node().fill('#ef4444', 0.2)
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
      
      // Initial fade in for Beat A
      yield* all(
        chainAContainer().opacity(1, animationDurations.fadeIn),
        codeBlockContainer().opacity(1, animationDurations.fadeIn)
      );
      yield* waitFor(1);

      // Beat A (0 - 22.8s)
      const beatADuration = 30.6;
      
      // Node 1 flashes red
      yield* pulseRed(node1A);
      yield* waitFor(1);
      
      // Temp pointer appears at node 1
      yield* tempGroupA().opacity(1, animationDurations.fadeIn);
      yield* waitFor(1);
      
      // Head moves forward to node 2
      yield* headGroupA().x(nodeSpacing, animationDurations.pointerMove);
      // Wait for head Arrow to adjust? No, group moved, so it points to Node 2 now.
      yield* waitFor(1);
      
      // Old head node shrinks and fades out
      yield* all(
        node1A().scale(0, animationDurations.transform),
        node1A().opacity(0, animationDurations.transform),
        tempGroupA().opacity(0, animationDurations.transform)
      );
      // Arrow1A fades out too
      yield* arrow1A().opacity(0, animationDurations.fadeOut);
      
      yield* waitFor(1);
      yield* textHead().opacity(1, animationDurations.fadeIn);
      
      // Buffer to end of Beat A
      const timeSpentA = animationDurations.fadeIn + 1 + 1.2 + 1 + animationDurations.fadeIn + 1 + animationDurations.pointerMove + 1 + animationDurations.transform + animationDurations.fadeOut + 1 + animationDurations.fadeIn;
      if (beatADuration - timeSpentA > 0) yield* waitFor(beatADuration - timeSpentA);

      // BEAT B (22.8 - 44.7s)
      const beatBDuration = 59.96 - 30.6;
      
      // Transition: fade out Chain A, fade in Chain B
      yield* all(
        chainAContainer().opacity(0, animationDurations.fadeOut),
        chainBContainer().opacity(1, animationDurations.fadeIn)
      );
      yield* waitFor(1);
      
      // Temp appears at node 1, hops to node 2
      yield* tempGroupB().opacity(1, animationDurations.fadeIn);
      yield* waitFor(0.5);
      
      // Hop to node 2
      yield* all(
        tempGroupB().x(nodeSpacing, animationDurations.pointerMove),
        tempGroupB().y(-140, animationDurations.pointerMove / 2).to(-120, animationDurations.pointerMove / 2)
      );
      
      // Pulse temp pointer
      yield* sequence(
        0.1,
        tempGroupB().scale(1.2, 0.1),
        tempGroupB().scale(1, 0.1)
      );
      yield* waitFor(1);
      
      // Node 3 (temp->next) flashes red
      yield* pulseRed(node3B);
      
      const timeSpentB = animationDurations.fadeOut + 1 + animationDurations.fadeIn + 0.5 + animationDurations.pointerMove + 0.2 + 1 + 1.2;
      if (beatBDuration - timeSpentB > 0) yield* waitFor(beatBDuration - timeSpentB);

      // BEAT C1 (44.7 - 55.5s)
      const beatC1Duration = 55.5 - 44.7;
      
      // Re-route arrow 2 to node 4, skipping node 3
      // We'll curve it downward to avoid crossing node 3 visually
      // Node 2 is at 1*nodeSpacing. Node 4 is at 3*nodeSpacing.
      // Arrow starts at [nodeRadius, 0] relative to Node 2.
      // Let's route it down, then right, then up.
      // [nodeRadius, 0] -> [nodeRadius, 80] -> [nodeSpacing*2 - nodeRadius, 80] -> [nodeSpacing*2 - nodeRadius, 0]
      yield* arrow2B().points([ 
        [nodeRadius, 0], 
        [nodeSpacing, 80],
        [nodeSpacing*2 - nodeRadius - 10, 80],
        [nodeSpacing*2 - nodeRadius - 10, 20] // Bottom of Node 4
      ], animationDurations.pointerMove);
      yield* waitFor(1);
      
      // Node 3 shrinks and fades out
      yield* all(
        node3B().scale(0, animationDurations.transform),
        node3B().opacity(0, animationDurations.transform)
      );
      yield* arrow3B().opacity(0, animationDurations.fadeOut);
      
      const timeSpentC1 = animationDurations.pointerMove + 1 + animationDurations.transform;
      if (beatC1Duration - timeSpentC1 > 0) yield* waitFor(beatC1Duration - timeSpentC1);

      // BEAT C2 (55.5 - 65.1s)
      const beatC2Duration = 65.1 - 55.5;
      
      // Temp moves to node 4 (which is at nodeSpacing*3)
      yield* all(
        tempGroupB().x(nodeSpacing * 3, animationDurations.pointerMove),
        tempGroupB().y(-140, animationDurations.pointerMove / 2).to(-120, animationDurations.pointerMove / 2)
      );
      yield* waitFor(0.5);
      
      // Node 5 flashes red
      yield* pulseRed(node5B);
      yield* waitFor(0.5);
      
      // Arrow 4 updates to point directly to null
      // We route it downward to the newNullLabelB to simulate "deleting the tail"
      newNullLabelB().position([nodeSpacing * 4, 80]);
      yield* newNullLabelB().opacity(1, animationDurations.fadeIn);
      
      yield* arrow4B().points([ 
        [nodeRadius, 0], 
        [nodeSpacing * 0.5, 0],
        [nodeSpacing * 0.5, 80],
        [nodeSpacing - 50, 80] // Left of null text
      ], animationDurations.pointerMove);
      yield* waitFor(0.5);
      
      // Node 5 shrinks and fades
      yield* all(
        node5B().scale(0, animationDurations.transform),
        node5B().opacity(0, animationDurations.transform),
        arrow5B().opacity(0, animationDurations.fadeOut),
        nullLabelB().opacity(0, animationDurations.fadeOut)
      );
      
      const timeSpentC2 = animationDurations.pointerMove + 0.5 + 1.2 + 0.5 + animationDurations.fadeIn + animationDurations.pointerMove + 0.5 + animationDurations.transform;
      if (beatC2Duration - timeSpentC2 > 0) yield* waitFor(beatC2Duration - timeSpentC2);

      // BEAT D (65.1 - 76.3s)
      
      // Text appears
      yield* textMiddleTail().opacity(1, animationDurations.fadeIn);
      yield* waitFor(1);
      
      // Highlight code: position == 0 block
      // In deleteNode:
      // 1: void deleteNode(Node*& head, int position) {
      // 2:     if (head == nullptr) return;
      // 3: 
      // 4:     if (position == 0) {
      // 5:         Node* toDelete = head;
      // 6:         head = head->next;
      // 7:         delete toDelete;
      // 8:         return;
      // 9:     }
      // 10:
      // 11:    Node* temp = head;
      // 12:    for (int i = 0; i < position - 1 && temp->next != nullptr; i++) {
      // 13:        temp = temp->next;
      // 14:    }
      // 15:
      // 16:    if (temp->next == nullptr) return;
      // 17:
      // 18:    Node* toDelete = temp->next;
      // 19:    temp->next = toDelete->next;
      // 20:    delete toDelete;
      // 21: }
      
      // Logical lines are 0-indexed.
      // position == 0 is line 4. Block is lines 4-8. Let's just highlight line 4 to represent the block.
      yield* moveHighlight(codeRefs, 4, animationDurations.highlight);
      yield* waitFor(2);
      
      // Highlight traversal loop (lines 11-13)
      // I'll just highlight line 12 (the for loop condition)
      yield* moveHighlight(codeRefs, 12, animationDurations.highlight);
      yield* waitFor(2);
      
      // Highlight actual deletion logic (lines 18-20)
      yield* moveHighlight(codeRefs, 19, animationDurations.highlight);
      
      yield* waitFor(3);
    })()
  );
});
