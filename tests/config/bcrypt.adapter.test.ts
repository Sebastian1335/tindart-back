describe('bcryptAdapter', () => {
  const { bcryptAdapter } = require('../../src/config/bcrypt.adapter')

  test('hash produces a string and compare returns true', () => {
    const pass = 'my-secret'
    const hashed = bcryptAdapter.hash(pass)
    expect(typeof hashed).toBe('string')
    expect(bcryptAdapter.compare(pass, hashed)).toBe(true)
  })

  test('compare returns false for wrong password', () => {
    const pass = 'my-secret'
    const hashed = bcryptAdapter.hash(pass)
    expect(bcryptAdapter.compare('other', hashed)).toBe(false)
  })
})
