describe('PostService', () => {
  beforeEach(() => jest.resetModules())

  test('uploadPost returns post entity', async () => {
    const created = { id: 10, title: 't', description: 'd', authorId: 1, tags: [], createdAt: new Date() }
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { post: { create: jest.fn().mockResolvedValue(created) } } }))
    const { PostService } = require('../../../src/presentation/services/post.service')
    const svc = new PostService()
    const res = await svc.uploadPost({ title: 't', description: 'd', authorId: 1, image: null, imageMimeType: null, tags: [] })
    expect(res.id).toBe(10)
    expect(res.title).toBe('t')
  })

  test('getPostDetails throws when post null', async () => {
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { post: { findUnique: jest.fn().mockResolvedValue(null) } } }))
    const { PostService } = require('../../../src/presentation/services/post.service')
    const svc = new PostService()
    await expect(svc.getPostDetails(1, 1)).rejects.toThrow()
  })

  test('createComment returns comment entity', async () => {
    const comment = { id: 5, content: 'hi', author: { userName: 'u' }, postId: 2, authorId: 1, createdAt: new Date() }
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { comment: { create: jest.fn().mockResolvedValue(comment) } } }))
    const { PostService } = require('../../../src/presentation/services/post.service')
    const svc = new PostService()
    const res = await svc.createComment({ content: 'hi', authorId: 1, postId: 2 })
    expect(res.id).toBe(5)
  })
})
