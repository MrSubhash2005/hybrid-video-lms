import { makeScene2D, Rect, Txt, Line } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Database } from '../components/Database';
import { Document } from '../components/Document';
import { Vector } from '../components/Vector';
import { PromptBox } from '../components/PromptBox';
import { AnimatedArrow } from '../components/AnimatedArrow';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { drawIn } from '../animations/draw';
import { pulseScale } from '../animations/pulse';
import { typeText } from '../animations/typing';

export default makeScene2D('scene30', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  // Stage 1 — Documents
  const docContainerRef = createRef<Rect>();
  const arrow1Ref = createRef<Line>();

  // Stage 2 — Embed
  const embedCardRef = createRef<Rect>();
  const arrow2Ref = createRef<Line>();

  // Stage 3 — Vector DB
  const vectorRef = createRef<Rect>();
  const dbContainerRef = createRef<Rect>();
  const arrow3Ref = createRef<Line>();

  // Stage 4 — Query / Search
  const queryCardRef = createRef<Rect>();
  const arrow4Ref = createRef<Line>();

  // Stage 5 — Prompt
  const promptContainerRef = createRef<Rect>();
  const arrow5Ref = createRef<Line>();

  // Stage 6 — LLM
  const llmCardRef = createRef<Rect>();

  // Final answer
  const answerCardRef = createRef<Rect>();
  const captionRef = createRef<Rect>();

  view.add(
    <Background>
      <Rect ref={cameraRef} size={['100%', '100%']} justifyContent={'center'} alignItems={'center'}>

        {/* Title */}
        <Rect ref={titleRef} y={-400} opacity={1}>
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={44}
            fontWeight={800}
            fill={THEME.colors.primary}
            text={'End-to-End RAG Summary'}
          />
        </Rect>

        {/* TOP ROW: Documents → Embed → VectorDB */}

        {/* Documents */}
        <Rect ref={docContainerRef} x={-700} y={-130} opacity={1}>
          <Document linesCount={4} highlightedLine={1} highlightColor={THEME.colors.primary} />
        </Rect>

        <AnimatedArrow ref={arrow1Ref} points={[[-620, -130], [-530, -130]]} glowColor={THEME.colors.primary} />

        {/* Embed card */}
        <Card
          ref={embedCardRef}
          x={-390}
          y={-130}
          width={200}
          height={110}
          opacity={1}
          glowColor={THEME.colors.cyan}
          showGlow={true}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Badge text={'EMBED'} color={THEME.colors.cyan} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.text} text={'Encoder NN'} />
        </Card>

        <AnimatedArrow ref={arrow2Ref} points={[[-280, -130], [-190, -130]]} glowColor={THEME.colors.cyan} />

        {/* VectorDB */}
        <Rect ref={dbContainerRef} x={-80} y={-130} opacity={1} scale={0.65}>
          <Database label={'VECTOR DB'} glow={true} />
        </Rect>

        {/* BOTTOM ROW: Query → Retrieve → Prompt → LLM */}
        <AnimatedArrow ref={arrow3Ref} points={[[-80, -75], [-80, 50], [240, 50]]} glowColor={THEME.colors.cyan} />

        {/* Query card */}
        <Card
          ref={queryCardRef}
          x={-700}
          y={100}
          width={200}
          height={110}
          opacity={1}
          glowColor={THEME.colors.primary}
          showGlow={true}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Badge text={'QUERY'} color={THEME.colors.primary} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.text} text={'User Question'} textAlign={'center'} />
        </Card>

        <AnimatedArrow ref={arrow4Ref} points={[[-590, 100], [160, 100]]} glowColor={THEME.colors.primary} />

        {/* Prompt box */}
        <Rect ref={promptContainerRef} x={370} y={80} opacity={1} scale={0.6}>
          <PromptBox
            questionText={'What is RAG?'}
            contextText={'Retrieved: RAG combines retrieval with generation...'}
            glow={true}
          />
        </Rect>

        <AnimatedArrow ref={arrow5Ref} points={[[570, 80], [660, 80]]} glowColor={THEME.colors.success} />

        {/* LLM */}
        <Card
          ref={llmCardRef}
          x={780}
          y={80}
          width={180}
          height={110}
          opacity={1}
          glowColor={THEME.colors.purple}
          showGlow={true}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Badge text={'LLM'} color={THEME.colors.purple} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.text} text={'Generation'} textAlign={'center'} />
        </Card>

        {/* Final Answer card */}
        <Card
          ref={answerCardRef}
          x={0}
          y={270}
          width={700}
          height={100}
          opacity={1}
          glowColor={THEME.colors.success}
          showGlow={true}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Badge text={'ACCURATE · GROUNDED · VERIFIED ANSWER'} color={THEME.colors.success} />
        </Card>

        {/* Caption */}
        <Caption
          ref={captionRef}
          text={''}
          y={420}
          opacity={1}
        />

      </Rect>
    </Background>
  );

  const captionTxt = captionRef().children()[0] as Txt;

  yield* all(
    // Camera slowly zooms and pans across the full pipeline
    cameraRef().scale(1.05, 8),
    cameraRef().position.y(10, 8),

    chain(
      typeText(captionTxt, 'RAG: Documents → Embeddings → Vector DB → Retrieval → Augmented Prompt → Grounded LLM Answer.', 8.93)
    )
  );
});
