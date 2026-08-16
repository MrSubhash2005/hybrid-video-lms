import { makeScene2D, Rect, Txt, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene28', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const app1Ref = createRef<Rect>();
  const app2Ref = createRef<Rect>();
  const app3Ref = createRef<Rect>();
  const app4Ref = createRef<Rect>();
  const app5Ref = createRef<Rect>();
  const app6Ref = createRef<Rect>();

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
            fill={THEME.colors.primary}
            text={'Real-world Applications'}
          />
        </Rect>
        <Audio
          src="/audio/female/step_21.wav"
          play
        />

        {/* 2×3 grid of application cards */}
        <Rect layout direction={'row'} gap={24} y={-10} wrap={'wrap'} width={1100} justifyContent={'center'}>

          <Card ref={app1Ref} width={310} height={160} opacity={0} glowColor={THEME.colors.primary}>
            <Badge text={'CUSTOMER SUPPORT'} color={THEME.colors.primary} marginBottom={10} />
            <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.textMuted} text={'AI bots answer queries from support docs, FAQs, and knowledge bases.'} textWrap={true} textAlign={'center'} />
          </Card>

          <Card ref={app2Ref} width={310} height={160} opacity={0} glowColor={THEME.colors.cyan}>
            <Badge text={'CODE ASSISTANT'} color={THEME.colors.cyan} marginBottom={10} />
            <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.textMuted} text={'Retrieves relevant code snippets, docs, and API references in real time.'} textWrap={true} textAlign={'center'} />
          </Card>

          <Card ref={app3Ref} width={310} height={160} opacity={0} glowColor={THEME.colors.success}>
            <Badge text={'LEGAL & COMPLIANCE'} color={THEME.colors.success} marginBottom={10} />
            <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.textMuted} text={'Surfaces relevant clauses from contracts and regulations with citations.'} textWrap={true} textAlign={'center'} />
          </Card>

          <Card ref={app4Ref} width={310} height={160} opacity={0} glowColor={THEME.colors.purple}>
            <Badge text={'HEALTHCARE'} color={THEME.colors.purple} marginBottom={10} />
            <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.textMuted} text={'Answers clinical questions grounded in medical literature and guidelines.'} textWrap={true} textAlign={'center'} />
          </Card>

          <Card ref={app5Ref} width={310} height={160} opacity={0} glowColor={THEME.colors.warning}>
            <Badge text={'ENTERPRISE SEARCH'} color={THEME.colors.warning} marginBottom={10} />
            <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.textMuted} text={'Enables employees to search internal wikis, Slack, and emails semantically.'} textWrap={true} textAlign={'center'} />
          </Card>

          <Card ref={app6Ref} width={310} height={160} opacity={0} glowColor={THEME.colors.error}>
            <Badge text={'FINANCIAL ANALYSIS'} color={THEME.colors.error} marginBottom={10} />
            <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.textMuted} text={'Synthesizes earnings reports and news to answer analyst questions accurately.'} textWrap={true} textAlign={'center'} />
          </Card>

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
  const elapsedTime = 25.4;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[21] - elapsedTime
  );

  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[21]),
    cameraRef().position.y(-5, ragDurationsFemale[21]),

    chain(
      waitFor(1),

      fadeIn(titleRef(), 0.6),
      waitFor(2),

      // Pop in cards with stagger
      all(
        popIn(app1Ref(), 2),
        chain(waitFor(1), popIn(app2Ref(), 2)),
        chain(waitFor(2), popIn(app3Ref(), 2)),
        chain(waitFor(3), popIn(app4Ref(), 2)),
        chain(waitFor(4), popIn(app5Ref(), 2)),
        chain(waitFor(5), popIn(app6Ref(), 2))
      ),
      waitFor(0.5),

      fadeIn(captionRef(), 0.5),
      typeText(
        captionTxt,
        'RAG powers real-world apps across customer support, legal, healthcare, finance, enterprise search, and code assistance.',
        2.8
      ),

      waitFor(remainingTime)
    )
  );
});
