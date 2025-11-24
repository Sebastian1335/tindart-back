const { allowedMimeTypes } = require('../../src/config/mimeTypes')

describe('allowedMimeTypes', () => {
  test('contains common image mime types', () => {
    expect(allowedMimeTypes).toEqual(expect.arrayContaining(['image/png','image/jpeg','image/webp']))
    expect(allowedMimeTypes).not.toContain('text/plain')
  })
})
