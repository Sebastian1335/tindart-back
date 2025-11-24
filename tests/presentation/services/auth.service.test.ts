describe('AuthService', () => {
  beforeEach(() => jest.resetModules())

  test('registerUser success returns user and tokens', async () => {
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { user: { findUnique: jest.fn().mockResolvedValue(null), create: jest.fn().mockResolvedValue({ id: 1, email: 'a@b.com', password: 'hashed', userName: 'u' }) } } }))
    jest.doMock('../../../src/config/jwt.adapter', () => ({ JwtAdapter: { generateToken: jest.fn().mockResolvedValue('token'), generateRefreshToken: jest.fn().mockResolvedValue('refresh') } }))
    jest.doMock('../../../src/config/bcrypt.adapter', () => ({ bcryptAdapter: { hash: jest.fn().mockReturnValue('hashed') } }))
    const mockEmail = { sendEmail: jest.fn().mockResolvedValue(true) }
    const { AuthService } = require('../../../src/presentation/services/auth.service')
    const svc = new AuthService(mockEmail)
    const res = await svc.registerUser({email: 'a@b.com', password: '123', name: 'u'})
    expect(res.user).toBeDefined()
    expect(res.token).toBe('token')
    expect(res.refresh).toBe('refresh')
  })

  test('loginUser success returns user and tokens', async () => {
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { user: { findUnique: jest.fn().mockResolvedValue({ id: 2, email: 'x@y.com', password: 'hashed', userName: 'ux' }) } } }))
    jest.doMock('../../../src/config/bcrypt.adapter', () => ({ bcryptAdapter: { compare: jest.fn().mockReturnValue(true) } }))
    jest.doMock('../../../src/config/jwt.adapter', () => ({ JwtAdapter: { generateToken: jest.fn().mockResolvedValue('t2'), generateRefreshToken: jest.fn().mockResolvedValue('r2') } }))
    const { AuthService } = require('../../../src/presentation/services/auth.service')
    const svc = new AuthService({ sendEmail: jest.fn() })
    const res = await svc.loginUser({ email: 'x@y.com', password: '123' })
    expect(res.user).toBeDefined()
    expect(res.token).toBe('t2')
    expect(res.refresh).toBe('r2')
  })
})
