describe('ChatRoutes', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../../../src/presentation/services/chat.service', () => ({ ChatService: jest.fn() }))
    // Mock AuthMiddleware to avoid depending on Jwt/prisma
    jest.doMock('../../../src/presentation/middlewares/auth.middleware', () => ({ AuthMiddleware: { validateJWT: jest.fn() } }))
  })

  test('defines chat routes', () => {
    const { ChatRoutes } = require('../../../src/presentation/chat/router')
    const router = ChatRoutes.routes
    const paths = router.stack.filter((s:any)=>s.route).map((s:any)=>s.route.path)
    expect(paths).toEqual(expect.arrayContaining(['/conversations','/conversation/:userId','/messages/:conversationId','/contacts']))
  })
})
