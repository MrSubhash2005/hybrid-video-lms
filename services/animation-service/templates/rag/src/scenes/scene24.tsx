import { makeScene2D, Rect, Txt, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { PromptBox } from '../components/PromptBox';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { slideInFrom } from '../animations/slide';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';
export default makeScene2D('scene24', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const systemCardRef = createRef<Rect>();
  const promptBoxRef = createRef<Rect>();
  const tipsCardRef = createRef<Rect>();

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
            fill={THEME.colors.primary}
            text={'Prompt Engineering in RAG'}
          />
        </Rect>

        {/* System Prompt Card */}
        <Card
          ref={systemCardRef}
          x={-500}
          y={-10}
          width={320}
          height={280}
          opacity={0}
          glowColor={THEME.colors.purple}
          showGlow={true}
        >
          <Badge text={'SYSTEM PROMPT'} color={THEME.colors.purple} marginBottom={14} />
          <Txt
            fontFamily={THEME.fonts.mono}
            fontSize={13}
            fill={THEME.colors.textMuted}
            text={'You are a helpful AI assistant.\nAnswer ONLY using the\nprovided context below.\nIf unsure, say "I don\'t know".'}
            textWrap={true}
          />
        </Card>
        <Audio
          src="/audio/female/step_17.wav"
          play
        />

        {/* PromptBox in the center */}
        <Rect ref={promptBoxRef} x={60} y={-10} opacity={0}>
          <PromptBox
            questionText={'How does RAG reduce hallucination?'}
            contextText={'RAG grounds the model by injecting retrieved facts directly into the prompt...'}
            glow={true}
          />
        </Rect>

        {/* Tips Card on the right */}
        <Card
          ref={tipsCardRef}
          x={520}
          y={-10}
          width={300}
          height={280}
          opacity={0}
          glowColor={THEME.colors.success}
        >
          <Badge text={'BEST PRACTICES'} color={THEME.colors.success} marginBottom={14} />
          <Rect layout direction={'column'} gap={10}>
            <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.text} text={'✓  Cite sources in context'} />
            <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.text} text={'✓  Limit context window size'} />
            <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.text} text={'✓  Instruct to say "unknown"'} />
            <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.text} text={'✓  Separate context blocks'} />
            <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.text} text={'✓  Few-shot examples help'} />
          </Rect>
        </Card>

        {/* Caption */}
        <Caption
          ref={captionRef}
          text={''}
          y={360}
          opacity={0}
        />

      </Rect>
    </Background>
  );

  const captionTxt = captionRef().children()[0] as Txt;
  const elapsedTime = 31.7;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[17] - elapsedTime
  );

  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[17]),
    cameraRef().position.y(-5, ragDurationsFemale[17]),

    chain(
      waitFor(1),

      fadeIn(titleRef(), 0.6),
      waitFor(2),

      // Slide in system card from left
      slideInFrom(systemCardRef(), -60, 0, 0.6),
      waitFor(8),

      // Pop in prompt box center
      popIn(promptBoxRef(), 0.7),
      waitFor(8),

      // Slide in tips card from right
      slideInFrom(tipsCardRef(), 60, 0, 0.6),
      waitFor(8),

      fadeIn(captionRef(), 0.5),
      typeText(
        captionTxt,
        'A well-crafted system prompt tells the model to ground answers in retrieved context and admit uncertainty.',
        2.6
      ),

      waitFor(remainingTime)
    )
  );
});
