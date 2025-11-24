describe('PostRoutes', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../../../src/presentation/services/post.service', () => ({ PostService: jest.fn() }))
    jest.doMock('../../../src/presentation/middlewares/auth.middleware', () => ({ AuthMiddleware: { validateJWT: jest.fn() } }))
    jest.doMock('../../../src/presentation/middlewares/file-upload.middleware', () => ({ FileUploadMiddleware: { containFiles: jest.fn(), optionalFiles: jest.fn() } }))
  })

  test('defines post routes', () => {
    const { PostRoutes } = require('../../../src/presentation/post/routes')
    const router = PostRoutes.routes
    const paths = router.stack.filter((s:any)=>s.route).map((s:any)=>s.route.path)
    expect(paths).toEqual(expect.arrayContaining(['/post','/','/post/:id/details','/post/:id/comment','/post/:id/image']))
  })
})
