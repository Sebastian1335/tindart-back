describe('InteractionRoutes', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../../../src/presentation/services/interaction.service', () => ({ InteractionService: jest.fn() }))
    jest.doMock('../../../src/presentation/middlewares/auth.middleware', () => ({ AuthMiddleware: { validateJWT: jest.fn() } }))
  })

  test('defines interaction routes', () => {
    const { InteractionRoutes } = require('../../../src/presentation/interaction/routes')
    const router = InteractionRoutes.routes
    const paths = router.stack.filter((s:any)=>s.route).map((s:any)=>s.route.path)
    expect(paths).toEqual(expect.arrayContaining(['/like/post/:postId','/save/post/:postId','/share/post/:postId','/like/comment/:commentId','/follow/:userId']))
  })
})
