/**
 * Helper utilities for generating layout math, particles, and custom timings.
 */

export interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

/**
 * Generates a set of random floating particles inside specified width/height bounds.
 */
export function generateParticles(count: number, width: number, height: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.2,
    });
  }
  return particles;
}

/**
 * Formats multi-line text into clean chunk displays.
 */
export function chunkText(text: string, chunkSize: number): string[] {
  const words = text.split(' ');
  const chunks: string[] = [];
  let currentChunk: string[] = [];

  for (const word of words) {
    currentChunk.push(word);
    if (currentChunk.join(' ').length >= chunkSize) {
      chunks.push(currentChunk.join(' '));
      currentChunk = [];
    }
  }
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }
  return chunks;
}

/**
 * Returns an array of numbers representing a high-dimensional vector.
 */
export function generateVectorArray(dimensions: number = 8): number[] {
  return Array.from({ length: dimensions }, () => Math.round((Math.random() * 2 - 1) * 100) / 100);
}
