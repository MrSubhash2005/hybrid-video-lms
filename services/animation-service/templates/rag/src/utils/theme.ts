export const THEME = {
  colors: {
    bg: '#0B0F19',
    bgDark: '#030712',
    bgGradient: ['#0B0F19', '#020617'],
    cardBg: 'rgba(15, 23, 42, 0.65)',
    cardBorder: 'rgba(148, 163, 184, 0.1)',
    primary: '#3B82F6',      // Electric Blue for RAG Pipeline
    cyan: '#06B6D4',         // Cyan for Embeddings/Vectors
    purple: '#8B5CF6',       // Purple for LLM / Generation
    text: '#F9FAFB',         // Bright white
    textMuted: '#9CA3AF',    // Muted grey
    textDark: '#4B5563',     // Darker grey for details
    error: '#EF4444',        // Red for Hallucinations
    success: '#10B981',      // Emerald Green for accurate answers
    warning: '#F59E0B',      // Amber for cuts / warnings
    accent: '#3B82F6',
  },
  fonts: {
    main: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, Courier New, monospace',
  },
  shadows: {
    card: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
    glowBlue: '0 0 20px rgba(59, 130, 246, 0.4)',
    glowCyan: '0 0 20px rgba(6, 182, 212, 0.4)',
    glowPurple: '0 0 20px rgba(139, 92, 246, 0.4)',
    glowError: '0 0 20px rgba(239, 68, 68, 0.4)',
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 24,
    round: 9999,
  }
};
