import { makeScene2D, Rect, Txt, Line } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Vector } from '../components/Vector';
import { Caption } from '../components/Caption';
import { Badge } from '../components/Badge';
import { AnimatedArrow } from '../components/AnimatedArrow';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { drawIn } from '../animations/draw';
import { typeText } from '../animations/typing';

export default makeScene2D('scene7', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const chunkCardRef = createRef<Rect>();
  const arrow1Ref = createRef<Line>();

  const modelCardRef = createRef<Rect>();
  const arrow2Ref = createRef<Line>();

  const vectorRef = createRef<Rect>();
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
            fill={THEME.colors.cyan}
            text={'Generating Embeddings'}
          />
        </Rect>

        {/* Text Chunk Card */}
        <Card
          ref={chunkCardRef}
          x={-450}
          y={0}
          width={300}
          height={180}
          opacity={1}
        >
          <Badge text={'TEXT CHUNK'} color={THEME.colors.primary} marginBottom={10} />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={18}
            fill={THEME.colors.text}
            text={'“RAG matches query concepts with documents using semantic math models.”'}
            textWrap={true}
            textAlign={'center'}
          />
        </Card>

        {/* Arrow 1 */}
        <AnimatedArrow
          ref={arrow1Ref}
          points={[[-280, 0], [-170, 0]]}
          glowColor={THEME.colors.primary}
        />

        {/* Embedding Model */}
        <Card
          ref={modelCardRef}
          x={0}
          y={0}
          width={300}
          height={180}
          opacity={1}
          glowColor={THEME.colors.primary}
        >
          <Badge text={'EMBEDDING MODEL'} color={THEME.colors.primary} marginBottom={10} />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={20}
            fontWeight={700}
            fill={THEME.colors.text}
            text={'Encoder NN\n(Converts text)'}
            textAlign={'center'}
          />
        </Card>

        {/* Arrow 2 */}
        <AnimatedArrow
          ref={arrow2Ref}
          points={[[170, 0], [250, 0]]}
          glowColor={THEME.colors.cyan}
        />

        {/* Vector Array Output */}
        <Vector
          ref={vectorRef}
          x={450}
          y={0}
          opacity={1}
          values={[0.82, -0.41, 0.09, 0.95, -0.73, 0.36]}
          glow={true}
        />

        {/* Caption */}
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
    cameraRef().scale(1.04, 10),
    cameraRef().position.y(-10, 10),

    // Scene animation sequence
    chain(
      typeText(captionTxt, 'An embedding model transforms text into high-dimensional vectors that capture semantic meaning.', 7.42)
    )
  );
});
