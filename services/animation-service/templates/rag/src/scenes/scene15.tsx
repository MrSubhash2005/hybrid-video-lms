import { makeScene2D, Rect, Txt, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Vector } from '../components/Vector';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { slideInFrom } from '../animations/slide';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene15', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const sentence1Ref = createRef<Rect>();
  const vec1Ref = createRef<Rect>();

  const sentence2Ref = createRef<Rect>();
  const vec2Ref = createRef<Rect>();

  const noteRef = createRef<Rect>();
  const captionRef = createRef<Rect>();

  view.add(
    <Background>
      <Rect ref={cameraRef} size={['100%', '100%']} justifyContent={'center'} alignItems={'center'}>

        {/* Title */}
        <Rect ref={titleRef} y={-390} opacity={0}>
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={48}
            fontWeight={800}
            fill={THEME.colors.cyan}
            text={'Embedding Example'}
          />
        </Rect>
        <Audio
          src="/audio/female/step_7.wav"
          play
        />

        {/* Sentence 1 Card */}
        <Card
          ref={sentence1Ref}
          x={-340}
          y={-110}
          width={380}
          height={120}
          opacity={0}
        >
          <Badge text={'SENTENCE A'} color={THEME.colors.primary} marginBottom={10} />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={20}
            fill={THEME.colors.text}
            text={'"The cat sat on the mat"'}
            textAlign={'center'}
          />
        </Card>

        {/* Vector 1 */}
        <Vector
          ref={vec1Ref}
          x={260}
          y={-110}
          opacity={0}
          values={[0.72, -0.31, 0.88, -0.15, 0.54, 0.09]}
          glow={true}
        />

        {/* Sentence 2 Card */}
        <Card
          ref={sentence2Ref}
          x={-340}
          y={80}
          width={380}
          height={120}
          opacity={0}
        >
          <Badge text={'SENTENCE B'} color={THEME.colors.purple} marginBottom={10} />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={20}
            fill={THEME.colors.text}
            text={'"A feline rested on the rug"'}
            textAlign={'center'}
          />
        </Card>

        {/* Vector 2 */}
        <Vector
          ref={vec2Ref}
          x={260}
          y={80}
          opacity={0}
          values={[0.71, -0.29, 0.86, -0.14, 0.52, 0.11]}
          glow={true}
          glowColor={THEME.colors.purple}
        />

        {/* Similarity note */}
        <Card
          ref={noteRef}
          y={240}
          width={700}
          height={80}
          opacity={0}
          glowColor={THEME.colors.success}
          showGlow={true}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={20}
            fontWeight={700}
            fill={THEME.colors.success}
            text={'↑ Vectors are nearly identical — sentences are semantically equivalent!'}
            textAlign={'center'}
          />
        </Card>

        {/* Caption */}
        <Caption
          ref={captionRef}
          text={''}
          y={420}
          opacity={0}
        />

      </Rect>
    </Background>
  );

  const captionTxt = captionRef().children()[0] as Txt;
  const elapsedTime = 18.3;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[7] - elapsedTime
  );
  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[7]),
    cameraRef().position.y(10, ragDurationsFemale[7]),

    chain(
      waitFor(1),

      fadeIn(titleRef(), 0.6),
      waitFor(2),

      // Slide in sentence 1 from left, pop vector 1
      all(
        slideInFrom(sentence1Ref(), -100, 0, 0.6),
        chain(waitFor(2), popIn(vec1Ref(), 0.6))
      ),
      waitFor(2),

      // Slide in sentence 2 from left, pop vector 2
      all(
        slideInFrom(sentence2Ref(), -100, 0, 0.6),
        chain(waitFor(2), popIn(vec2Ref(), 0.6))
      ),
      waitFor(2),

      // Pop in similarity note
      popIn(noteRef(), 0.7),
      waitFor(2),

      fadeIn(captionRef(), 0.5),
      typeText(
        captionTxt,
        'Two sentences with different words can produce nearly identical embeddings — because they mean the same thing.',
        2.8
      ),

      waitFor(remainingTime)
    )
  );
});
