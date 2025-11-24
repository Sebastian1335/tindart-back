describe('WhiteboardRoutes', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../../../src/presentation/services/whiteboard.service', () => ({ WhiteboardService: jest.fn() }))
    jest.doMock('../../../src/presentation/middlewares/auth.middleware', () => ({ AuthMiddleware: { validateJWT: jest.fn() } }))
  })

  test('defines whiteboard routes', () => {
    const { WhiteboardRoutes } = require('../../../src/presentation/whiteboard/routes')
    const router = WhiteboardRoutes.routes
    const paths = router.stack.filter((s:any)=>s.route).map((s:any)=>s.route.path)
    expect(paths).toEqual(expect.arrayContaining(['/','/:id/snapshot','/','/:id']))
  })
})
