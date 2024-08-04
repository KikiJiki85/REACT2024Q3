import { describe, it, expect } from 'vitest';
import nextConfig from '../../next.config.mjs';

describe('Next.js Configuration', () => {
  it('should have correct distDir', () => {
    expect(nextConfig.distDir).toBe('./dist');
  });
});
