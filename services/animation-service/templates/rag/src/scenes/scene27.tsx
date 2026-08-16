import { makeScene2D, Rect, Txt, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { shakeNode } from '../animations/shake';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';
export default makeScene2D('scene27', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const lim1Ref = createRef<Rect>();
  const lim2Ref = createRef<Rect>();
  const lim3Ref = createRef<Rect>();
  const lim4Ref = createRef<Rect>();

  const noteRef = createRef<Rect>();
  const captionRef = createRef<Rect>();

  view.add(
    <Background>
      <Rect ref={cameraRef} size={['100%', '100%']} justifyContent={'center'} alignItems={'center'}>

        {/* Title */}
        <Rect ref={titleRef} y={-380} opacity={0}>
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={48}
            fontWeight={800}
            fill={THEME.colors.error}
            text={'Limitations of RAG'}
          />
        </Rect>

        {/* Limitation cards in 2×2 grid */}
        <Rect layout direction={'row'} gap={28} y={-60} wrap={'wrap'} width={1100} justifyContent={'center'}>

          <Card
            ref={lim1Ref}
            width={480}
            height={160}
            opacity={0}
            glowColor={THEME.colors.error}
          >
            <Badge text={'LATENCY'} color={THEME.colors.error} marginBottom={10} />
            <Txt fontFamily={THEME.fonts.main} fontSize={17} fill={THEME.colors.textMuted} text={'Extra retrieval step adds ~100–500ms latency per query. Real-time apps need careful optimization.'} textWrap={true} textAlign={'center'} />
          </Card>
          <Audio
            src="/audio/female/step_20.wav"
            play
          />

          <Card
            ref={lim2Ref}
            width={480}
            height={160}
            opacity={0}
            glowColor={THEME.colors.error}
          >
            <Badge text={'CHUNK QUALITY'} color={THEME.colors.error} marginBottom={10} />
            <Txt fontFamily={THEME.fonts.main} fontSize={17} fill={THEME.colors.textMuted} text={'Poor chunking or indexing leads to retrieved context that is irrelevant or incomplete.'} textWrap={true} textAlign={'center'} />
          </Card>

          <Card
            ref={lim3Ref}
            width={480}
            height={160}
            opacity={0}
            glowColor={THEME.colors.warning}
          >
            <Badge text={'CONTEXT LIMIT'} color={THEME.colors.warning} marginBottom={10} />
            <Txt fontFamily={THEME.fonts.main} fontSize={17} fill={THEME.colors.textMuted} text={'LLM context windows are finite — too many chunks overflow the prompt and lose information.'} textWrap={true} textAlign={'center'} />
          </Card>

          <Card
            ref={lim4Ref}
            width={480}
            height={160}
            opacity={0}
            glowColor={THEME.colors.warning}
          >
            <Badge text={'STALE DATA'} color={THEME.colors.warning} marginBottom={10} />
            <Txt fontFamily={THEME.fonts.main} fontSize={17} fill={THEME.colors.textMuted} text={'If the knowledge base is not re-indexed regularly, retrieved facts can become outdated.'} textWrap={true} textAlign={'center'} />
          </Card>

        </Rect>

        {/* Note badge */}
        <Rect ref={noteRef} y={230} opacity={0}>
          <Badge text={'Mitigations exist — but require careful engineering'} color={'rgba(239,68,68,0.25)'} textColor={THEME.colors.error} />
        </Rect>

        {/* Caption */}
        <Caption
          ref={captionRef}
          text={''}
          y={380}
          opacity={0}
        />

      </Rect>
    </Background>
  );

  const captionTxt = captionRef().children()[0] as Txt;
  const elapsedTime = 35.2;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[20] - elapsedTime
  );

  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[20]),
    cameraRef().position.y(5, ragDurationsFemale[20]),

    chain(
      waitFor(1),

      fadeIn(titleRef(), 0.6),
      waitFor(2),

      // Pop in limitation cards with slight shake on each
      popIn(lim1Ref(), 4),
      shakeNode(lim1Ref(), 8, 4),

      popIn(lim2Ref(), 4),
      shakeNode(lim2Ref(), 8, 4),

      popIn(lim3Ref(), 4),
      shakeNode(lim3Ref(), 8, 4),

      popIn(lim4Ref(), 4),
      waitFor(2),

      popIn(noteRef(), 4),
      waitFor(2),

      fadeIn(captionRef(), 4),
      typeText(
        captionTxt,
        'RAG has real trade-offs: latency, chunking quality, context limits, and stale data must all be managed.',
        2.6
      ),

      waitFor(remainingTime)
    )
  );
});
