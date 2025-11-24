describe('ProfileRoutes', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../../../src/presentation/services/profile.service', () => ({ ProfileService: jest.fn() }))
    jest.doMock('../../../src/presentation/middlewares/auth.middleware', () => ({ AuthMiddleware: { validateJWT: jest.fn() } }))
  })

  test('defines profile routes', () => {
    const { ProfileRoutes } = require('../../../src/presentation/profile/routes')
    const router = ProfileRoutes.routes
    const paths = router.stack.filter((s:any)=>s.route).map((s:any)=>s.route.path)
    expect(paths).toEqual(expect.arrayContaining(['/portafolio','/likedPosts','/savedPosts','/profileData/:id']))
  })
})
