describe('AuthMiddleware.validateJWT', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('returns 401 when Authorization header is missing', async () => {
    const { AuthMiddleware } = require('../../../src/presentation/middlewares/auth.middleware')
    const req: any = { header: () => undefined }
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    const next = jest.fn()
    await AuthMiddleware.validateJWT(req, res, next)
    expect(res.status).toHaveBeenCalledWith(401)
  })

  test('sets req.user when token valid', async () => {
    // mock JwtAdapter and prisma before importing the middleware
    jest.doMock('../../../src/config/jwt.adapter', () => ({ JwtAdapter: { validateToken: jest.fn().mockResolvedValue({ id: '1' }) } }))
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { user: { findUnique: jest.fn().mockResolvedValue({ id: 1, userName: 'u', email: 'a@b.com', password: 'p', createdAt: new Date() }) } } }))

    const { AuthMiddleware } = require('../../../src/presentation/middlewares/auth.middleware')
    const req: any = { header: (h: string) => 'Bearer token' }
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    const next = jest.fn()
    await AuthMiddleware.validateJWT(req, res, next)
    expect(next).toHaveBeenCalled()
    expect((req as any).user).toBeDefined()
    expect((req as any).user.id).toBe(1)
  })
})
