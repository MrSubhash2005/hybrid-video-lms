import { makeScene2D, Rect, Txt, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Title } from '../components/Title';
import { Caption } from '../components/Caption';
import { Badge } from '../components/Badge';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene1', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();
  const badgesRef = createRef<Rect>();
  const captionRef = createRef<Rect>();
  const captionTextRef = createRef<Txt>();

  view.add(
    <Background>
      <Rect
        ref={cameraRef}
        size={['50%', '50%']}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Audio
          src="/audio/female/step_0.wav"
          play
        />
        <Title
          ref={titleRef}
          titleText={'Retrieval-Augmented Generation'}
          subtitleText={'An Educational Guide to RAG'}
          y={-100}
        />

        <Rect
          ref={badgesRef}
          layout
          direction={'row'}
          gap={32}
          y={100}
          opacity={0}
        >
          <Badge text={'ACCURACY'} color={THEME.colors.primary} />
          <Badge text={'KNOWLEDGE'} color={THEME.colors.cyan} />
          <Badge text={'LLM'} color={THEME.colors.purple} />
        </Rect>

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

  // Total time already consumed before final wait:
  // 0.5 + 0.8 + 0.5 + 0.6 + 0.5 + 0.5 + 2.5 = 5.9 seconds
  const remainingTime = Math.max(0, ragDurationsFemale[0] - 5.9);

  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[0]),
    cameraRef().position.y(-10, ragDurationsFemale[0]),

    chain(
      waitFor(0.5),

      popIn(titleRef(), 0.8),
      waitFor(0.5),

      fadeIn(badgesRef(), 0.6),
      waitFor(0.5),

      fadeIn(captionRef(), 0.5),

      typeText(
        captionTxt,
        'Retrieval-Augmented Generation (RAG) is a technique that enhances LLMs with external data.',
        2.5
      ),

      waitFor(remainingTime)
    )
  );
});