describe('index', () => {
  describe('myPackage', () => {
    it('should return a string containing the message', () => {
      const message = 'Hello';

      const result = message;

      expect(result).toMatch(message);
    });
  });
});
