import { makeScene2D, Rect, Circle, Line, Txt, Node, Layout } from '@revideo/2d';
import { all, sequence, waitFor, createRef, fadeTransition } from '@revideo/core';
import { colors, fonts, fontWeights, animationDurations, pointerStyle, nodeStyle, canvas, codeBlock } from '../styles/theme.js';
import { cuesFromAlignment, groupCues } from '../utils/captions.js';
import alignmentData from '../assets/alignment/Scene009-alignment.json';
import { CodeBlock, createCodeBlockRefs, moveHighlight } from '../components/CodeBlock.js';

export default makeScene2D('Scene009', function* (view) {
  view.fill(colors.background);

  // --- REFS ---
  const captionContainer = createRef<Rect>();
  const captionText = createRef<Txt>();
  const captionText2 = createRef<Txt>();

  const codeScrollNode = createRef<Node>();
  const codeRefs = createCodeBlockRefs();
  
  // Diagrams
  const diagramGroup = createRef<Node>();
  const diagConstructor = createRef<Node>();
  const diagInsertHead = createRef<Node>();
  const diagInsertTail = createRef<Node>();
  const diagInsertMiddle = createRef<Node>();
  const diagDelete = createRef<Node>();
  const diagTraverse = createRef<Node>();
  
  const traverseTemp = createRef<Node>();

  // --- NARRATION ---
  const beatCTextStr = "Finally, traversing the list. We use a temporary pointer starting at the head, moving step by step using the next pointers until we reach null, printing each value along the way. And there you have it: a complete Singly Linked List, managing its own dynamic memory, node by node.";

  const allCues = groupCues(cuesFromAlignment(alignmentData));

  // --- CONTENT & DATA ---
  const codeString = `class LinkedList {
private:
    Node* head;
public:
    LinkedList() {
        head = nullptr;
    }

    void insertAtHead(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }

    void insertAtTail(int val) {
        Node* newNode = new Node(val);
        if (head == nullptr) {
            head = newNode;
            return;
        }
        Node* temp = head;
        while (temp->next != nullptr) {
            temp = temp->next;
        }
        temp->next = newNode;
    }

    void insertAtMiddle(int val, int pos) {
        if (pos == 0) {
            insertAtHead(val);
            return;
        }
        Node* newNode = new Node(val);
        Node* temp = head;
        for (int i = 0; i < pos - 1 && temp != nullptr; i++) {
            temp = temp->next;
        }
        if (temp == nullptr) return;
        newNode->next = temp->next;
        temp->next = newNode;
    }

    void deleteNode(int pos) {
        if (head == nullptr) return;
        if (pos == 0) {
            Node* toDelete = head;
            head = head->next;
            delete toDelete;
            return;
        }
        Node* temp = head;
        for (int i = 0; i < pos - 1 && temp->next != nullptr; i++) {
            temp = temp->next;
        }
        if (temp->next == nullptr) return;
        Node* toDelete = temp->next;
        temp->next = toDelete->next;
        delete toDelete;
    }

    void traverse() {
        Node* temp = head;
        while (temp != nullptr) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "null" << endl;
    }
};`;

  // --- MATH FOR SCROLLING CODEBLOCK ---
  const lines = codeString.split('\n');
  const rawBlockHeight = lines.length * 48 + 80;
  const maxLineLength = Math.max(...lines.map(l => l.length));
  const rawBlockWidth = maxLineLength * 21.5 + 80;
  
  const effectiveMaxWidth = codeBlock.maxWidth - codeBlock.marginRight;
  const heightScale = codeBlock.maxHeight / rawBlockHeight;
  const widthScale = effectiveMaxWidth / rawBlockWidth;
  const codeBlockScale = Math.min(1, heightScale, widthScale);
  
  const targetScale = Math.min(1, widthScale);
  const scrollScale = targetScale / codeBlockScale; // Restores height shrinking

  // --- MINI DIAGRAM HELPERS ---
  const mRadius = 30;
  const mSpacing = 100;

  const MiniNode = ({x, y, fill = colors.primaryAccent}: {x: number, y: number, fill?: string}) => (
    <Circle x={x} y={y} width={mRadius*2} height={mRadius*2} fill={fill} stroke={colors.nodeBorder} lineWidth={nodeStyle.borderWidth} />
  );
  
  const MiniArrow = ({x, y, toX, toY}: {x: number, y: number, toX: number, toY: number}) => (
    <Line points={[ [x, y], [toX, toY] ]} stroke={colors.nodeBorder} lineWidth={pointerStyle.strokeWidth} endArrow arrowSize={pointerStyle.arrowheadSize} />
  );

  const MiniLabel = ({x, y, text, color = colors.text}: {x: number, y: number, text: string, color?: string}) => (
    <Txt x={x} y={y} text={text} fill={color} fontFamily={fonts.code} fontWeight={fontWeights.headingWeight} fontSize={20} />
  );

  view.add(
    <Node>
      {/* LEFT: MINI DIAGRAMS */}
      <Node ref={diagramGroup} x={-450} y={0}>
        
        {/* Constructor */}
        <Node ref={diagConstructor} opacity={0}>
          <MiniLabel x={0} y={-80} text="head" />
          <MiniArrow x={0} y={-60} toX={0} toY={0} />
          <MiniLabel x={0} y={30} text="nullptr" />
        </Node>

        {/* Insert Head */}
        <Node ref={diagInsertHead} opacity={0}>
          <MiniLabel x={0} y={-80} text="head" />
          <MiniArrow x={0} y={-60} toX={0} toY={-mRadius-10} />
          <MiniNode x={0} y={0} fill={colors.tertiaryAccent} />
          <MiniArrow x={mRadius} y={0} toX={mSpacing-mRadius-10} toY={0} />
          <MiniNode x={mSpacing} y={0} />
        </Node>

        {/* Insert Tail */}
        <Node ref={diagInsertTail} opacity={0}>
          <MiniNode x={-mSpacing} y={0} />
          <MiniArrow x={-mSpacing+mRadius} y={0} toX={-mRadius-10} toY={0} />
          <MiniNode x={0} y={0} />
          <MiniArrow x={mRadius} y={0} toX={mSpacing-mRadius-10} toY={0} />
          <MiniNode x={mSpacing} y={0} fill={colors.tertiaryAccent} />
          <MiniLabel x={mSpacing} y={-70} text="newNode" color={colors.tertiaryAccent} />
          <MiniArrow x={mSpacing} y={-50} toX={mSpacing} toY={-mRadius-10} />
        </Node>

        {/* Insert Middle */}
        <Node ref={diagInsertMiddle} opacity={0}>
          <MiniNode x={-mSpacing} y={0} />
          <MiniArrow x={-84} y={25} toX={-68} toY={50} />
          <MiniNode x={-mSpacing/2} y={80} fill={colors.tertiaryAccent} />
          <MiniArrow x={-34} y={54} toX={-18} toY={28} />
          <MiniNode x={0} y={0} />
        </Node>

        {/* Delete */}
        <Node ref={diagDelete} opacity={0}>
          <MiniNode x={-mSpacing} y={0} />
          <MiniArrow x={-mSpacing+mRadius} y={0} toX={-mRadius-10} toY={0} />
          <MiniNode x={0} y={0} fill={'#ef4444'} />
          <MiniArrow x={mRadius} y={0} toX={mSpacing-mRadius-10} toY={0} />
          <MiniNode x={mSpacing} y={0} />
          {/* Skip arrow */}
          <Line points={[ [-mSpacing+mRadius, 0], [-mSpacing/2, -60], [mSpacing/2, -60], [mSpacing-mRadius-10, -10] ]} radius={20} stroke={colors.nodeBorder} lineWidth={pointerStyle.strokeWidth} endArrow arrowSize={pointerStyle.arrowheadSize} />
        </Node>

        {/* Traverse */}
        <Node ref={diagTraverse} opacity={0}>
          <MiniNode x={-mSpacing} y={0} />
          <MiniArrow x={-mSpacing+mRadius} y={0} toX={-mRadius-10} toY={0} />
          <MiniNode x={0} y={0} />
          <MiniArrow x={mRadius} y={0} toX={mSpacing-mRadius-10} toY={0} />
          <MiniNode x={mSpacing} y={0} />
          <Node ref={traverseTemp} x={-mSpacing}>
            <MiniLabel x={0} y={-80} text="temp" color={colors.tertiaryAccent} />
            <MiniArrow x={0} y={-60} toX={0} toY={-mRadius-10} />
          </Node>
        </Node>
      </Node>

      {/* RIGHT: SCROLLING CODE BLOCK */}
      <Node x={350} y={0}>
        <Rect width={effectiveMaxWidth} height={codeBlock.maxHeight} clip={true}>
          <Node ref={codeScrollNode} scale={scrollScale}>
            <CodeBlock refs={codeRefs} code={codeString} />
          </Node>
        </Rect>
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

  function* scrollAndHighlight(lineIndex: number, duration: number) {
    // Unscaled line center: -rawBlockHeight/2 + 40 + lineIndex * 48 + 24
    let targetY = (-rawBlockHeight/2 + 40 + lineIndex * 48 + 24) * targetScale;
    
    // Clamp so we don't scroll past the bounds
    const maxY = (rawBlockHeight * targetScale - codeBlock.maxHeight) / 2;
    let clampedY = -targetY;
    if (clampedY > maxY) clampedY = maxY;
    if (clampedY < -maxY) clampedY = -maxY;

    yield* all(
      codeScrollNode().y(clampedY, duration),
      moveHighlight(codeRefs, lineIndex, duration)
    );
  }

  function* transitionDiagram(fromRef: any, toRef: any, duration: number) {
    if (fromRef) yield* fromRef().opacity(0, duration);
    if (toRef) yield* toRef().opacity(1, duration);
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
      
      // Initial state: Constructor
      yield* transitionDiagram(null, diagConstructor, 0);
      yield* scrollAndHighlight(4, 0);
      yield* waitFor(1);

      // BEAT A (0 - 39s)
      // Constructor
      yield* scrollAndHighlight(5, animationDurations.highlight);
      yield* waitFor(3);

      // Insert at Head (line 9)
      yield* transitionDiagram(diagConstructor, diagInsertHead, animationDurations.fadeIn);
      yield* scrollAndHighlight(9, animationDurations.pointerMove);
      yield* waitFor(2);
      yield* scrollAndHighlight(12, animationDurations.highlight);
      yield* waitFor(4);

      // Insert at Tail (line 15)
      yield* transitionDiagram(diagInsertHead, diagInsertTail, animationDurations.fadeIn);
      yield* scrollAndHighlight(15, animationDurations.pointerMove);
      yield* waitFor(2);
      yield* scrollAndHighlight(24, animationDurations.highlight);
      yield* waitFor(4);

      // Insert at Middle (line 28)
      yield* transitionDiagram(diagInsertTail, diagInsertMiddle, animationDurations.fadeIn);
      yield* scrollAndHighlight(28, animationDurations.pointerMove);
      yield* waitFor(2);
      yield* scrollAndHighlight(39, animationDurations.highlight);
      yield* waitFor(4);

      // Pad remainder of Beat A
      yield* waitFor(43.1 - 22.8); // approximate

      // BEAT B (43.1 - 86.2s)
      // Delete (line 43)
      yield* transitionDiagram(diagInsertMiddle, diagDelete, animationDurations.fadeIn);
      yield* scrollAndHighlight(43, animationDurations.pointerMove);
      yield* waitFor(4);

      // Delete Head branch (line 45)
      yield* scrollAndHighlight(45, animationDurations.highlight);
      yield* waitFor(4);

      // Delete Middle/Tail branch (line 51)
      yield* scrollAndHighlight(51, animationDurations.highlight);
      yield* waitFor(4);
      yield* scrollAndHighlight(57, animationDurations.highlight);
      yield* waitFor(4);

      // Pad remainder of Beat B
      yield* waitFor(86.2 - 43.1 - 16.5);

      // BEAT C (86.2 - 129.9s)
      // Traverse (line 61)
      yield* transitionDiagram(diagDelete, diagTraverse, animationDurations.fadeIn);
      yield* scrollAndHighlight(61, animationDurations.pointerMove);
      yield* waitFor(3);

      // Animate temp hopping in traverse diagram
      yield* scrollAndHighlight(64, animationDurations.highlight);
      yield* traverseTemp().x(0, animationDurations.pointerMove);
      yield* waitFor(1);
      yield* traverseTemp().x(mSpacing, animationDurations.pointerMove);
      yield* waitFor(3);

      // Full class zoom out (hide highlights)
      yield* transitionDiagram(diagTraverse, null, animationDurations.fadeOut);
      yield* all(
        moveHighlight(codeRefs, -1, animationDurations.transform),
        codeScrollNode().scale(1, animationDurations.transform), // Scales down to shrink-to-fit codeBlockScale!
        codeScrollNode().y(0, animationDurations.transform)
      );
      
      yield* waitFor(129.9 - 86.2 - 9.1);

    })()
  );
});
