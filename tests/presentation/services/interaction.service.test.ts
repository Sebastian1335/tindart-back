describe('InteractionService', () => {
  beforeEach(() => jest.resetModules())

  test('toggleLikePost creates like when none exists', async () => {
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { likePost: { findUnique: jest.fn().mockResolvedValue(null), create: jest.fn().mockResolvedValue({}) , delete: jest.fn() } } }))
    const { InteractionService } = require('../../../src/presentation/services/interaction.service')
    const svc = new InteractionService()
    const res = await svc.toggleLikePost(1, 2)
    expect(res.response).toMatch(/le dio like/)
  })

  test('toggleLikePost deletes like when exists', async () => {
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { likePost: { findUnique: jest.fn().mockResolvedValue({id:1}), delete: jest.fn().mockResolvedValue({}) , create: jest.fn() } } }))
    const { InteractionService } = require('../../../src/presentation/services/interaction.service')
    const svc = new InteractionService()
    const res = await svc.toggleLikePost(1, 2)
    expect(res.response).toMatch(/quitó el like/)
  })
})
