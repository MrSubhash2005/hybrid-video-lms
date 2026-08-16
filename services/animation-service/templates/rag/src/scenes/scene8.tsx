import { makeScene2D, Rect, Txt, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Database } from '../components/Database';
import { Vector } from '../components/Vector';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { pulseScale } from '../animations/pulse';
import { slideOutTo } from '../animations/slide';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene8', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const dbContainerRef = createRef<Rect>();
  const dbRef = createRef<Rect>();

  const vec1Ref = createRef<Rect>();
  const vec2Ref = createRef<Rect>();
  const vec3Ref = createRef<Rect>();

  const captionRef = createRef<Rect>();

  view.add(
    <Background>
      <Rect ref={cameraRef} size={['100%', '100%']} justifyContent={'center'} alignItems={'center'}>

        {/* Title */}
        <Rect ref={titleRef} y={-400} opacity={0}>
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={48}
            fontWeight={800}
            fill={THEME.colors.primary}
            text={'Vector Databases'}
          />
        </Rect>

        {/* DB Cylinder stack on the right */}
        <Rect ref={dbContainerRef} x={300} y={0} opacity={0}>
          <Database ref={dbRef} glow={false} />
        </Rect>

        {/* Vectors on the left, to be inserted */}
        <Vector
          ref={vec1Ref}
          x={-400}
          y={-120}
          opacity={0}
          values={[0.15, -0.92, 0.44]}
          glow={true}
        />
        <Audio
          src="/audio/female/step_8.wav"
          play
        />

        <Vector
          ref={vec2Ref}
          x={-400}
          y={0}
          opacity={0}
          values={[0.88, 0.03, -0.56]}
          glow={true}
        />

        <Vector
          ref={vec3Ref}
          x={-400}
          y={120}
          opacity={0}
          values={[-0.31, 0.65, 0.12]}
          glow={true}
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

  const elapsedTime = 29.8;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[8] - elapsedTime
  );

  yield* all(
    // Slow camera drift
    cameraRef().scale(1.04, ragDurationsFemale[8]),
    cameraRef().position.x(-10, ragDurationsFemale[8]),

    // Scene animation sequence
    chain(
      waitFor(1),

      // Fade in Title
      fadeIn(titleRef(), 2),
      waitFor(2),

      // Pop in Vector DB
      popIn(dbContainerRef(), 2),
      waitFor(2),

      // Pop in vectors
      all(
        popIn(vec1Ref(), 2),
        popIn(vec2Ref(), 2),
        popIn(vec3Ref(), 2)
      ),
      waitFor(2),

      // Slide Vector 1 into the DB, and pulse DB
      chain(
        all(
          slideOutTo(vec1Ref(), 600, 100, 2),
          chain(
            waitFor(2),
            pulseScale(dbRef(), 1.08, 2)
          )
        ),
        waitFor(2),

        // Slide Vector 2 into the DB
        all(
          slideOutTo(vec2Ref(), 600, 0, 2),
          chain(
            waitFor(2),
            pulseScale(dbRef(), 1.10, 4)
          )
        ),
        waitFor(2),

        // Slide Vector 3 into the DB
        all(
          slideOutTo(vec3Ref(), 600, -100, 2),
          chain(
            waitFor(2),
            pulseScale(dbRef(), 1.12, 6)
          )
        )
      ),

      waitFor(2),

      // Caption
      fadeIn(captionRef(), 2),
      typeText(captionTxt, 'Vector databases index these embeddings in high-dimensional spaces to find semantic connections instantly.', 2.8),

      waitFor(remainingTime)
    )
  );
});
