const { regularExps } = require('../../src/config/regular-exp')

describe('regularExps', () => {
  test('email regex accepts valid emails and rejects invalid', () => {
    const re = regularExps.email
    expect(re.test('user@example.com')).toBe(true)
    expect(re.test('user.name_tag@sub.domain.co')).toBe(true)
    expect(re.test('bad-email')).toBe(false)
    expect(re.test('user@com')).toBe(false)
  })
})
