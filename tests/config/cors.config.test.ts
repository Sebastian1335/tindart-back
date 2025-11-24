const { corsLink } = require('../../src/config/cors.config')

describe('corsLink', () => {
  test('default corsLink is set', () => {
    expect(corsLink).toBe('*')
  })
})
