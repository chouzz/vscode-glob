import { match } from "../src/glob";

describe('vscode-glob', () => {
  describe('glob', () => {
    it('should match the glob pattern', () => {
      const matched = match('src/**', 'src/main.cpp');

      expect(matched).toBe(true);
    });
  });
});
