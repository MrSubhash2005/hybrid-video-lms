import { makeScene2D, Rect, Txt, Line, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Caption } from '../components/Caption';
import { Badge } from '../components/Badge';
import { popIn } from '../animations/pop';
import { fadeIn, fadeOut } from '../animations/fade';
import { drawIn } from '../animations/draw';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene12', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();
  const listContainerRef = createRef<Rect>();

  const adv1Ref = createRef<Rect>();
  const check1Ref = createRef<Line>();

  const adv2Ref = createRef<Rect>();
  const check2Ref = createRef<Line>();

  const adv3Ref = createRef<Rect>();
  const check3Ref = createRef<Line>();

  const adv4Ref = createRef<Rect>();
  const check4Ref = createRef<Line>();

  const thankYouRef = createRef<Rect>();
  const captionRef = createRef<Rect>();

  view.add(
    <Background>
      <Rect ref={cameraRef} size={['100%', '100%']} justifyContent={'center'} alignItems={'center'}>

        {/* Title */}


        {/* List Container */}

        {/* Advantage 1 */}


        {/* Thank You Outro Card (Initially hidden) */}
        <Card
          ref={thankYouRef}
          y={0}
          width={600}
          height={300}
          opacity={0}
          glowColor={THEME.colors.primary}
          showGlow={true}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={56}
            fontWeight={800}
            fill={THEME.colors.text}
            text={'Thank You'}
            marginBottom={10}
          />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={24}
            fill={THEME.colors.textMuted}
            text={'You are now ready to build with RAG!'}
          />
        </Card>
        <Audio
          src="/audio/female/step_23.wav"
          play
        />

        {/* Caption */}
        <Caption
          ref={captionRef}
          text={''}
          y={350}
          opacity={0}
        />

      </Rect>
    </Background>
  );

  const captionTxt = captionRef().children()[0] as Txt;
  const elapsedTime = 20.3;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[23] - elapsedTime
  );

  yield* all(
    // Slow camera drift
    cameraRef().scale(1.05, ragDurationsFemale[23]),
    cameraRef().position.y(20, ragDurationsFemale[23]),

    // Scene animation sequence
    chain(
      waitFor(0.5),



      // Animate List items in sequence


      // Fade out advantages list & title, and fade in bottom caption


      // Pop in Thank You Card
      popIn(thankYouRef(), 0.8),

      waitFor(remainingTime)
    )
  );
});
