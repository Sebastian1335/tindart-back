describe('ProfileService', () => {
  beforeEach(() => jest.resetModules())

  test('getProfileInfo returns formatted info', async () => {
    const user = {
      id: 1,
      password: 'x',
      userName: 'u',
      email: 'a@b',
      createdAt: new Date(),
      description: 'd',
      _count: { followers: 2, following: 3 },
      post: [{ _count: { LikePost: 2 } }, { _count: { LikePost: 1 } }]
    }
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { user: { findUnique: jest.fn().mockResolvedValue(user) } , post: { findMany: jest.fn(), count: jest.fn() } } }))
    const { ProfileService } = require('../../../src/presentation/services/profile.service')
    const svc = new ProfileService()
    const res = await svc.getProfileInfo(1)
    expect(res.extra.totalLikesReceived).toBe(3)
    expect(res.userName || res.id).toBeDefined()
  })

  test('getPortafolio returns posts and total', async () => {
    const posts = [
      { id: 1, title: 'p1', description: 'd1', tags: [], authorId: 1, createdAt: new Date() },
      { id: 2, title: 'p2', description: 'd2', tags: [], authorId: 1, createdAt: new Date() }
    ]
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { post: { findMany: jest.fn().mockResolvedValue(posts), count: jest.fn().mockResolvedValue(2) } } }))
    const { ProfileService } = require('../../../src/presentation/services/profile.service')
    const svc = new ProfileService()
    const res = await svc.getPortafolio(10, 1, 1)
    expect(res.total).toBe(2)
    expect(res.posts.length).toBe(2)
  })
})
