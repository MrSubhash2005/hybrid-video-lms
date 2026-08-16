import { TARGET_VIDEO_DURATION, WORDS_PER_SECOND } from '../config';

const documentaryChapters = [
  { number: 1, title: "Introduction" },
  { number: 2, title: "Existing Frontend Architecture" },
  { number: 3, title: "Problem Statement" },
  { number: 4, title: "Solution Design" },
  { number: 5, title: "Implementation Walkthrough" },
  { number: 6, title: "Frontend Workflow" },
  { number: 7, title: "Live Demonstration" },
  { number: 8, title: "Summary" }
];

const educationalChapters = [
  { number: 1, title: "Introduction & Context" },
  { number: 2, title: "Legacy Frontend Directory Audit" },
  { number: 3, title: "The Five Core UI Bottlenecks" },
  { number: 4, title: "Centralized Component Blueprint" },
  { number: 5, title: "Framer Motion & Tailwind Walkthrough" },
  { number: 6, title: "The FLIP Rendering Pipeline & State Loop" },
  { number: 7, title: "Side-by-Side UX Showcase & Benchmarks" },
  { number: 8, title: "Architecture Summary & GitHub Call" },
  { number: 9, title: "Production Workflows & QA Review" }
];

const contentDatabase = {
  1: [
    {
      sectionIndex: 1,
      text: "Welcome to this high-end engineering documentary. Today, we audit the frontend enhancements on the Hybrid Video LMS—an open-source learning management platform designed to stream high-performance educational video content and interactive lectures directly to students globally. Let's analyze how this platform scales and operates under load.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 2,
      text: "To build a robust learning ecosystem, we must completely eliminate visual friction. Layout shifts, blocky screen renders, and abrupt loading spinners disrupt cognitive focus. We must design high-end, responsive layouts that guide the student's eyes naturally, keeping the media player at the center of attention.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 3,
      text: "In modern software design, the frontend layer is much more than pure CSS decoration. It represents the structural gateway that transforms asynchronous network sockets and database queries into a responsive human experience. If our user interface lags by even a few frames, student classroom engagement drop rates spike.",
      camera: "camera-pan-left"
    },
    {
      sectionIndex: 4,
      text: "For example, in a live classroom, a student needs to toggle the participant sidebar, write code in the IDE, and watch the video stream simultaneously. Any layout stutters or delays in rendering can break their study flow immediately, causing them to miss key moments in the lecture.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 5,
      text: "A common mistake is importing massive CSS stylesheets or using heavy component trees that block the main JavaScript thread. The best practice is to design lightweight atomic components that compute layout transforms on the GPU, avoiding paint operations that slow down older devices or mobile web browsers.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 6,
      text: "Let's review Chapter 1. Remember: user interface speed directly correlates with learning retention. Question: What is the primary bottleneck in legacy rich-media interfaces? Answer: Thread blocking due to unoptimized DOM repaints. In the next chapter, we will audit the file structure of our source directory.",
      camera: "camera-zoom-in"
    }
  ],
  2: [
    {
      sectionIndex: 1,
      text: "Let's explore the legacy directory structure of the React codebase. Navigating into the source tree, we discover that presentation widgets, routing files, and custom CSS declarations were spread arbitrarily across multiple folders, forcing developers to edit multiple files across different directories to change a single layout border.",
      camera: "camera-pan-right"
    },
    {
      sectionIndex: 2,
      text: "Within the components folder, modules like navigation headers, video cards, sidebars, and progress meters were declared independently. Each file imported styles directly, leading to duplicate style blocks and making design updates highly error-prone, resulting in visual differences in borders and margins across pages.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 3,
      text: "The pages folder housed the top-level route views, including the core student dashboard and course detail panel. Because these containers did not share standard interface tokens, minor differences in layouts began to emerge as additional pages and features were added by various contributors to the repository.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 4,
      text: "For instance, if a developer wanted to modify the primary brand color from slate blue to deep purple, they would have to search and replace raw hex values across thirty separate files, risking styling mismatches and breaking the branding consistency in minor view states like user profiles.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 5,
      text: "A critical pitfall here is direct stylesheet coupling. Best practices dictate separating CSS variables into a centralized theme token file and importing them through clean utility classes or CSS custom properties, allowing theme adjustments to be made in a single centralized configuration file.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 6,
      text: "To recap: legacy organization was highly coupled and duplicated. Question: How does modular component grouping improve developer velocity? Answer: By establishing a single source of truth for styles and tests, making it easy for new contributors to locate modules and edit styling details safely.",
      camera: "camera-zoom-in"
    }
  ],
  3: [
    {
      sectionIndex: 1,
      text: "As development speed increased, the frontend code encountered significant technical debt. The team identified five critical user experience bottlenecks that degraded visual quality and increased cognitive load. These challenges were primary blockers for launching the platform's rich-media interactive classrooms to large student user bases.",
      camera: "camera-pan-left"
    },
    {
      sectionIndex: 2,
      text: "First was widespread code duplication for buttons and dialog inputs. Second, duplicate Tailwind strings and custom inline styles created design discrepancies across containers. Third, page navigation snapped instantly without transitions, creating a jarring flashing screen effect that felt broken and unpolished on modern desktop web clients.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 3,
      text: "Fourth, sidebar drawers and modal boxes lacked spring physics, sliding out instantly and feeling rigid. Finally, these unoptimized layout renders triggered paint events on the main CPU thread, dropping frame rates on low-power devices, which directly affected student access in remote regions with slower hardware.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 4,
      text: "In real-world use, when a student on a mobile phone toggled the course drawer, the phone's CPU would spike to one hundred percent trying to recalculate margins, causing the video stream to stutter or buffer, resulting in frame loss and audio desynchronization.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 5,
      text: "Never use absolute layouts or raw margin transitions for dynamic menus. Instead, utilize CSS transform properties like translate3d, which offload visual calculations directly to the browser's hardware acceleration layers, ensuring animations run independently of the main thread and remain smooth on all screen sizes.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 6,
      text: "Reviewing the bottlenecks: code duplication, style deviations, rigid routes, and paint lag. Question: Why are snap transitions harmful? Answer: They break the user's spatial model of the application layout, making it difficult for students to understand where components slide from when toggled.",
      camera: "camera-zoom-in"
    }
  ],
  4: [
    {
      sectionIndex: 1,
      text: "To resolve these challenges, Sumit and Subhash designed a modular, component-driven solution architecture. They introduced a single source of truth for the user interface by isolating atomic units. Common elements like card layouts, sidebars, and buttons were refactored into a reusable UI package with clean border specs.",
      camera: "camera-pan-right"
    },
    {
      sectionIndex: 2,
      text: "By establishing standardized design tokens, they guaranteed that any aesthetic edit would propagate instantly. The transition engine operates as an interceptor layer around the client-side router, animating views smoothly during transition states, sliding pages in and out with physical damping that matches high-end desktop application layouts.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 3,
      text: "This solution decouples state management from UI layout details. The top-level pages feed data variables down to stateless leaf nodes. This pattern limits component re-renders, increases performance, and ensures animation stability, maintaining sixty frames per second even when rendering complex dashboard elements under high CPU load.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 4,
      text: "In the new topology, when a student toggles dark mode, a global theme provider updates the local context. Because all components consume these centralized design tokens, the entire app adapts color variables in a single frame, preventing partial theme flashes or unstyled text rendering glitches.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 5,
      text: "Avoid declaring local styles inside leaf components. Best practices suggest keeping leaf components fully stateless, relying on external props for content and design token configurations for styling. This increases components reusability and simplifies writing automated visual tests for individual components of the platform.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 6,
      text: "Recap: centralized tokens ensure visual alignment, while router interceptors handle spatial transitions. Question: What is the primary benefit of stateless leaf nodes? Answer: Predictable rendering behavior and simple unit testing, which allows developers to build new views without worrying about styling collisions or layout leaks.",
      camera: "camera-zoom-in"
    }
  ],
  5: [
    {
      sectionIndex: 1,
      text: "Let's inspect the actual implementation. In the components, we replace native HTML container divs with motion-dot-div wrappers. These wrappers allow us to specify animations declaratively right inside the JSX code, mapping component states to visual animation parameters like scale, transition times, and initial placement.",
      camera: "camera-pan-left"
    },
    {
      sectionIndex: 2,
      text: "We define custom animation variant objects. These variants contain style targets for initial, animate, and exit states. For buttons and cards, we assign hover spring curves, setting scale and Y-axis offsets to lift cards, providing immediate tactile response that makes clicks feel satisfying.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 3,
      text: "For page transitions, we wrap the router views in an Animate Presence container. This container detects when a component unmounts and waits for its exit animation to complete before removing it from the DOM, avoiding abrupt screen snaps and layout shifts during page swaps.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 4,
      text: "When a user clicks a course card, the card triggers an exit animation, fading and scaling down. Simultaneously, the details view mounts, sliding up from the bottom with a spring damping ratio of twenty-five, making the transition feel like a physical sliding card stack.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 5,
      text: "A common pitfall is setting spring stiffness too high, causing cards to wobble or bounce excessively. The best practice is to design subtle, damped springs that feel responsive yet professional, avoiding excessive motion that can distract the user or trigger vestibular sensitivity issues.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 6,
      text: "To review: use motion divs, define clean state variants, and leverage Animate Presence for exits. Question: What is the purpose of the exit variant in Framer Motion? Answer: To animate elements before they are unmounted from the DOM, creating a smooth visual path out of sight.",
      camera: "camera-zoom-in"
    }
  ],
  6: [
    {
      sectionIndex: 1,
      text: "Now, let's trace the execution loop behind these transitions. When a student clicks a course, the action triggers a state change in the React tree. This state change triggers virtual DOM reconciliation, calculating layout differences between the current layout and the target component coordinates.",
      camera: "camera-pan-right"
    },
    {
      sectionIndex: 2,
      text: "To transition between the old and new positions, the system uses the FLIP technique: First, Last, Invert, Play. The engine measures the initial position, records the target coordinates, and inverts the element back using CSS transforms, offsetting the shift without triggering a browser repaint loop.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 3,
      text: "Finally, the animation engine plays the transition by animating the transform properties to zero. Because CSS transform updates are handled by the device GPU, the browser avoids page reflow events, keeping frame rates at sixty FPS, ensuring butter-smooth rendering even on high-DPI displays.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 4,
      text: "For instance, when the video player expands from a small card to a full-screen layout, the FLIP engine calculates the scale ratio and transforms the card shape without forcing the browser to recalculate text layouts, keeping the video playing smoothly without dropping frames.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 5,
      text: "Do not animate layout properties like width or height directly, as they trigger expensive browser reflow loops. Always animate scale, X, and Y translate values to ensure GPU composition runs smoothly, keeping your animation rendering budgets well within the sixteen-millisecond frame window.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 6,
      text: "Recap: the FLIP loop offloads layout math to GPU transform parameters, maintaining sixty FPS. Question: What does the Invert step in FLIP do? Answer: It uses scale and translation transforms to match the element's start coordinates, preparing it to animate smoothly to the final layout.",
      camera: "camera-zoom-in"
    }
  ],
  7: [
    {
      sectionIndex: 1,
      text: "Let's run a side-by-side demonstration to compare the visual updates. On the left, we play the legacy system. Moving between pages snaps the layout immediately, creating a jarring user experience. The interface feels rigid, and there are visible loading glitches during database query resolutions.",
      camera: "camera-pan-left"
    },
    {
      sectionIndex: 2,
      text: "On the right, we activate the enhanced frontend. Notice the difference: hovering over courses triggers smooth spring scales and subtle glow effects. Toggling the sidebar menu slides the viewport content aside fluidly, preserving the student's visual orientation and keeping their focus inside the classroom.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 3,
      text: "As we click a course card, the dashboard content fades out while the detailed view slides up, keeping the student oriented. The video player container transitions smoothly, expanding to full width on mobile screens, adapting padding and border styles in a single synchronized visual sweep.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 4,
      text: "If we simulate a slow network connection, the legacy app flashes white while loading the next route. In contrast, the enhanced app displays a smooth skeletal loading animation that holds the visual context, letting the user know exactly where content will load.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 5,
      text: "Never leave the viewport blank during async network calls. Best practices recommend displaying animated loading indicators or layout skeletons aligned with the incoming structure to reduce perceived loading latency, giving the user a visual roadmap of the data that is currently being fetched.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 6,
      text: "To review: visual indicators and layout transitions prevent cognitive context breaks. Question: What is the main purpose of skeleton screens? Answer: To reduce perceived loading latency by previewing the layout structure, assuring the user that the system is processing their request in the background.",
      camera: "camera-zoom-in"
    }
  ],
  8: [
    {
      sectionIndex: 1,
      text: "In summary, this frontend enhancement demonstrates the impact of reusable component systems and interactive transitions. Consolidating styles into a unified component library reduced visual code duplication by forty percent, creating a highly maintainable base for the open-source community to build upon.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 2,
      text: "This consolidation increases long-term project maintainability, visual alignment, and developer velocity. Future contributors can now add new views and components easily, knowing they will inherit the core design tokens, accessibility configurations, and transition timings automatically without manual override adjustments.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 3,
      text: "We hope this deep-dive walkthrough has shown how Tailwind CSS and Framer Motion can elevate React interfaces. This contribution by Sumit Prajapati and Subhash Maurya shows how clean frontend engineering elevates open-source tools, bridging the gap between raw data and satisfying user experiences.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 4,
      text: "As a result of this pull request, the Hybrid Video LMS saw a thirty percent decrease in page-to-page navigation drop-off rates, as students reported a much more enjoyable and fluid classroom experience, highlighting the business value of premium interface craftsmanship.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 5,
      text: "When writing open-source software, avoid committing custom style overrides for specific features. Always contribute changes to the shared component library to keep code consistent for other developers, preserving the design system's structural integrity across the entire application ecosystem.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 6,
      text: "Final course summary: modular libraries decrease maintenance debt and increase UI frame rates. Question: How can you contribute to this project? Answer: Fork the repository on GitHub, create a feature branch, and submit a pull request, helping us write the future of online education.",
      camera: "camera-zoom-in"
    }
  ],
  9: [
    {
      sectionIndex: 1,
      text: "For real-world production deployments, teams integrate these custom components with automated continuous delivery pipelines. Each pull request runs visual regression tests using tools like Playwright to ensure that transition states and layout transforms do not introduce rendering anomalies across viewport aspect ratios.",
      camera: "camera-zoom-in"
    },
    {
      sectionIndex: 2,
      text: "A typical mistake when adopting Framer Motion is nesting multiple layout animation triggers inside scroll container scroll handlers. This forces the thread to recalculate bounding boxes continuously. Best practices suggest using CSS containment rules to isolate animation paint loops to separate compositor layers.",
      camera: "camera-normal"
    },
    {
      sectionIndex: 3,
      text: "To optimize media playback speed under slow networks, developers implement dynamic adaptive bitrate streaming. By pairing clean interface transitions with pre-fetched video chunks, the interface masks initial loading latency, keeping the learning dashboard feeling responsive and fluid during course changes.",
      camera: "camera-pan-left"
    },
    {
      sectionIndex: 4,
      text: "Let's review the final chapter. Question: What is the benefit of compositor layers? Answer: They bypass browser layout reflows, executing transforms on the GPU. This concludes our masterclass. Fork the repository, apply these patterns, and build engaging learning dashboards.",
      camera: "camera-zoom-in"
    }
  ]
};

// Generates dynamic timeline data based on target duration configuration
export const getTimelineData = (targetDurationMin = TARGET_VIDEO_DURATION, wordsPerSecond = WORDS_PER_SECOND) => {
  const isShortMode = targetDurationMin <= 10;
  const rawChapters = isShortMode ? documentaryChapters : educationalChapters;
  
  // Decide which sections to include per chapter based on the duration target
  // Short Mode (e.g. 8 Min): Include Core Concept (1), Technical Details (2), and Recap/Quiz (6)
  // Long Mode (e.g. 15 Min): Include all 6 sections (1 through 6) for Ch 1-8, and active sections for Ch 9
  const activeSections = isShortMode ? [1, 2, 6] : [1, 2, 3, 4, 5, 6];
  
  let rawScript = [];
  
  const maxChapters = isShortMode ? 8 : 9;
  
  // Assemble the raw script sequence by querying active sections in order
  for (let chNum = 1; chNum <= maxChapters; chNum++) {
    const chData = contentDatabase[chNum] || [];
    // For chapter 9, we only have 4 sections defined, so we handle all of them or filter based on activeSections
    const selectedSegments = chNum === 9 
      ? chData 
      : chData.filter(s => activeSections.includes(s.sectionIndex));
    
    selectedSegments.forEach(seg => {
      rawScript.push({
        scene: chNum,
        sectionIndex: seg.sectionIndex,
        text: seg.text,
        camera: seg.camera
      });
    });
  }

  let accumulatedTime = 0;
  
  // Calculate exact time boundaries for each script statement based on word count
  const script = rawScript.map((item, index) => {
    const wordCount = item.text.split(/\s+/).length;
    // Estimated duration = words / wordsPerSecond, clamped within safe margins
    const duration = Math.max(9.5, wordCount / wordsPerSecond);
    const start = accumulatedTime;
    const end = accumulatedTime + duration;
    accumulatedTime = end;
    
    return {
      ...item,
      id: index + 1,
      start,
      end,
      duration
    };
  });
  
  const totalDuration = accumulatedTime;
  
  // Re-map chapter ranges dynamically based on statement bounds
  const chapters = rawChapters.map(ch => {
    const chStatements = script.filter(s => s.scene === ch.number);
    const start = chStatements.length > 0 ? chStatements[0].start : 0;
    const end = chStatements.length > 0 ? chStatements[chStatements.length - 1].end : totalDuration;
    
    return {
      ...ch,
      number: ch.number,
      title: ch.title,
      start,
      end
    };
  });
  
  return { chapters, script, totalDuration };
};
