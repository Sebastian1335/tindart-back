describe('AuthRoutes', () => {
  beforeEach(() => {
    jest.resetModules()
    // Mock EmailService and AuthService so routes file doesn't construct real instances
    jest.doMock('../../../src/presentation/services/email.service', () => ({ EmailService: jest.fn() }))
    jest.doMock('../../../src/presentation/services/auth.service', () => ({ AuthService: jest.fn().mockImplementation(()=>({})) }))
  })

  test('defines expected auth routes', () => {
    const { AuthRoutes } = require('../../../src/presentation/auth/routes')
    const router = AuthRoutes.routes
    // router.stack contains layers with route.path
    const paths = router.stack.filter((s:any)=>s.route).map((s:any)=>s.route.path)
    expect(paths).toEqual(expect.arrayContaining(['/login','/register','/validate-email/:token','/refresh']))
  })
})
