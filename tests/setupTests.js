// Global test setup: silence noisy console.error during tests
beforeAll(() => {
  // preserve original to restore if needed
  global.__originalConsoleError = console.error
  console.error = jest.fn()
})

afterAll(() => {
  if (global.__originalConsoleError) console.error = global.__originalConsoleError
})
