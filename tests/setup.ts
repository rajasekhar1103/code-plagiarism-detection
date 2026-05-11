/**
 * Test Setup and Utilities
 */

beforeAll(() => {
  // Setup test environment
  process.env.GEMINI_API_KEY = "test-key";
});

afterEach(() => {
  // Clean up after each test
  jest.clearAllMocks();
});
