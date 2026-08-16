import { makeScene2D, Rect, Txt, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { zoomIn } from '../animations/zoom';
import { pulseScale } from '../animations/pulse';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene29', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();
  const subtitleRef = createRef<Rect>();

  const trend1Ref = createRef<Rect>();
  const trend2Ref = createRef<Rect>();
  const trend3Ref = createRef<Rect>();
  const trend4Ref = createRef<Rect>();

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
            fill={THEME.colors.purple}
            text={'Future of RAG'}
          />
        </Rect>

        {/* Subtitle */}
        <Rect ref={subtitleRef} y={-300} opacity={0}>
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={22}
            fill={THEME.colors.textMuted}
            text={'Emerging trends shaping the next generation of retrieval'}
          />
        </Rect>

        {/* 2×2 trend cards */}
        <Rect layout direction={'row'} gap={30} y={20} wrap={'wrap'} width={1200} justifyContent={'center'}>

          <Card
            ref={trend1Ref}
            width={520}
            height={200}
            opacity={0}
            glowColor={THEME.colors.purple}
            showGlow={true}
          >
            <Badge text={'AGENTIC RAG'} color={THEME.colors.purple} marginBottom={12} />
            <Txt fontFamily={THEME.fonts.main} fontSize={17} fill={THEME.colors.text} fontWeight={700} text={'Self-Directing Retrieval'} marginBottom={8} />
            <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.textMuted} text={'Agents decide when and what to retrieve, iteratively refining answers through multi-step reasoning.'} textWrap={true} textAlign={'center'} />
          </Card>
          <Audio
            src="/audio/female/step_22.wav"
            play
          />

          <Card
            ref={trend2Ref}
            width={480}
            height={180}
            opacity={0}
            glowColor={THEME.colors.cyan}
            showGlow={true}
          >
            <Badge text={'MULTIMODAL RAG'} color={THEME.colors.cyan} marginBottom={12} />
            <Txt fontFamily={THEME.fonts.main} fontSize={17} fill={THEME.colors.text} fontWeight={700} text={'Images, Audio & Video'} marginBottom={8} />
            <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.textMuted} text={'Retrieve from cross-modal stores: PDFs, images, charts, video transcripts, and audio simultaneously.'} textWrap={true} textAlign={'center'} />
          </Card>

          <Card
            ref={trend3Ref}
            width={480}
            height={180}
            opacity={0}
            glowColor={THEME.colors.success}
            showGlow={true}
          >
            <Badge text={'SELF-IMPROVING'} color={THEME.colors.success} marginBottom={12} />
            <Txt fontFamily={THEME.fonts.main} fontSize={17} fill={THEME.colors.text} fontWeight={700} text={'Feedback-Driven Indexing'} marginBottom={8} />
            <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.textMuted} text={'Systems learn from user feedback to re-rank, re-chunk, and improve retrieval quality over time.'} textWrap={true} textAlign={'center'} />
          </Card>

          <Card
            ref={trend4Ref}
            width={480}
            height={180}
            opacity={0}
            glowColor={THEME.colors.warning}
            showGlow={true}
          >
            <Badge text={'GRAPH RAG'} color={THEME.colors.warning} marginBottom={12} />
            <Txt fontFamily={THEME.fonts.main} fontSize={17} fill={THEME.colors.text} fontWeight={700} text={'Knowledge Graph Retrieval'} marginBottom={8} />
            <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.textMuted} text={'Combines vector search with graph traversal to retrieve multi-hop relational knowledge.'} textWrap={true} textAlign={'center'} />
          </Card>

        </Rect>

        {/* Caption */}
        <Caption
          ref={captionRef}
          text={''}
          y={410}
          opacity={0}
        />

      </Rect>
    </Background>
  );

  const captionTxt = captionRef().children()[0] as Txt;
  const elapsedTime = 5.6;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[22] - elapsedTime
  );

  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[22]),
    cameraRef().position.y(-10, ragDurationsFemale[22]),

    chain(
      waitFor(0.4),

      fadeIn(titleRef(), 0.6),
      fadeIn(subtitleRef(), 0.5),
      waitFor(0.3),

      // Zoom in trend cards
      all(
        zoomIn(trend1Ref(), 0.8, 0.6),
        chain(waitFor(0.15), zoomIn(trend1Ref(), 0.8, 0.6)),
        chain(waitFor(0.15), zoomIn(trend2Ref(), 0.8, 0.6)),
        chain(waitFor(0.3), zoomIn(trend3Ref(), 0.8, 0.6)),
        chain(waitFor(0.45), zoomIn(trend4Ref(), 0.8, 0.6))
      ),
      waitFor(0.4),


      fadeIn(captionRef(), 0.5),
      typeText(
        captionTxt,
        'The future of RAG includes agentic reasoning, multimodal retrieval, graph knowledge, and self-improving pipelines.',
        2.8
      ),

      waitFor(remainingTime)
    )
  );
});
