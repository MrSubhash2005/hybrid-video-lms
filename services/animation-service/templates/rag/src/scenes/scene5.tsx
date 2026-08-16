import { makeScene2D, Rect, Txt, Line } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Caption } from '../components/Caption';
import { Badge } from '../components/Badge';
import { Database } from '../components/Database';
import { PromptBox } from '../components/PromptBox';
import { AnimatedArrow } from '../components/AnimatedArrow';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { drawIn } from '../animations/draw';
import { typeText } from '../animations/typing';

export default makeScene2D('scene5', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const userCardRef = createRef<Rect>();
  const retrieverCardRef = createRef<Rect>();
  const dbRef = createRef<Rect>();
  const promptRef = createRef<Rect>();
  const llmCardRef = createRef<Rect>();

  const arrowUserToRetrieverRef = createRef<Line>();
  const arrowRetrieverToDbRef = createRef<Line>();
  const arrowDbToPromptRef = createRef<Line>();
  const arrowPromptToLlmRef = createRef<Line>();

  const captionRef = createRef<Rect>();

  view.add(
    <Background>
      <Rect ref={cameraRef} size={['100%', '100%']} justifyContent={'center'} alignItems={'center'}>

        {/* Title */}
        <Rect ref={titleRef} y={-400} opacity={1}>
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={48}
            fontWeight={800}
            fill={THEME.colors.primary}
            text={'RAG Architecture Overview'}
          />
        </Rect>

        {/* User Card */}
        <Card
          ref={userCardRef}
          x={-680}
          y={-180}
          width={240}
          height={140}
          opacity={1}
        >
          <Badge text={'USER'} color={THEME.colors.primary} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={18} fill={THEME.colors.text} text={'Submits Query'} />
        </Card>

        {/* Retriever Card */}
        <Card
          ref={retrieverCardRef}
          x={-260}
          y={-180}
          width={240}
          height={140}
          opacity={1}
          glowColor={THEME.colors.cyan}
        >
          <Badge text={'RETRIEVER'} color={THEME.colors.cyan} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={18} fill={THEME.colors.text} text={'Fetches Context'} />
        </Card>

        {/* Database */}
        <Database
          ref={dbRef}
          x={-260}
          y={150}
          opacity={1}
        />

        {/* Prompt Box */}
        <PromptBox
          ref={promptRef}
          x={220}
          y={0}
          opacity={1}
          scale={0.9}
        />

        {/* LLM Card */}
        <Card
          ref={llmCardRef}
          x={680}
          y={0}
          width={240}
          height={160}
          opacity={1}
          glowColor={THEME.colors.purple}
        >
          <Badge text={'LLM'} color={THEME.colors.purple} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={18} fill={THEME.colors.text} text={'Generates final\ngrounded answer'} textAlign={'center'} />
        </Card>

        {/* Connecting Arrows */}
        <AnimatedArrow
          ref={arrowUserToRetrieverRef}
          points={[[-560, -180], [-380, -180]]}
          glowColor={THEME.colors.primary}
        />

        <AnimatedArrow
          ref={arrowRetrieverToDbRef}
          points={[[-260, -110], [-260, 95]]}
          glowColor={THEME.colors.cyan}
        />

        <AnimatedArrow
          ref={arrowDbToPromptRef}
          points={[[-170, 150], [50, 150], [50, 115]]}
          glowColor={THEME.colors.cyan}
        />

        <AnimatedArrow
          ref={arrowPromptToLlmRef}
          points={[[445, 0], [560, 0]]}
          glowColor={THEME.colors.purple}
        />

        {/* Subtitles / Caption */}
        <Caption
          ref={captionRef}
          text={''}
          y={350}
          opacity={1}
        />

      </Rect>
    </Background>
  );

  const captionTxt = captionRef().children()[0] as Txt;

  yield* all(
    // Slow camera drift
    cameraRef().scale(1.04, 20),
    cameraRef().position.y(-10, 20),

    // Scene animation sequence
    chain(
      typeText(captionTxt, 'RAG intercepts user queries, retrieves relevant facts from a database, and augments the prompt before generation.', 8.57)
    )
  );
});
