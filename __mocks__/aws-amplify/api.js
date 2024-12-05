export const generateClient = jest.fn().mockReturnValue({
  someMethod: jest.fn().mockResolvedValue('mocked-value'),
});

export default {generateClient};
