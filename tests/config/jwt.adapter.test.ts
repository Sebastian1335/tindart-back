describe('JwtAdapter', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env.JWT_SEED = 'test-jwt-seed'
    process.env.REFRESH_SEED = 'test-refresh-seed'
  })

  test('generate and validate token', async () => {
    const { JwtAdapter } = require('../../src/config/jwt.adapter')
    const payload = { id: 42 }
    const token: any = await JwtAdapter.generateToken(payload, '1h')
    expect(typeof token).toBe('string')
    const decoded: any = await JwtAdapter.validateToken<{id:number}>(token)
    expect(decoded).toHaveProperty('id')
    expect(decoded.id).toBe(42)
  })

  test('generateRefresh and validateRefresh token', async () => {
    const { JwtAdapter } = require('../../src/config/jwt.adapter')
    const payload = { id: 7 }
    const token: any = await JwtAdapter.generateRefreshToken(payload, '1h')
    expect(typeof token).toBe('string')
    const decoded: any = await JwtAdapter.validateRefreshToken<{id:number}>(token)
    expect(decoded.id).toBe(7)
  })

  test('validateToken returns null for invalid token', async () => {
    const { JwtAdapter } = require('../../src/config/jwt.adapter')
    const res = await JwtAdapter.validateToken('invalid')
    expect(res).toBeNull()
  })
})
