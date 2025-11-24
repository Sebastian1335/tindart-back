describe('WhiteboardService', () => {
  beforeEach(() => jest.resetModules())

  test('getWhiteboards maps response without snapshot', async () => {
    const boards = [{ id: 1, title: 't', description: 'd', ownerId: 1, snapshot: 's' }]
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { whiteBoard: { findMany: jest.fn().mockResolvedValue(boards) } } }))
    const { WhiteboardService } = require('../../../src/presentation/services/whiteboard.service')
    const svc = new WhiteboardService()
    const res = await svc.getWhiteboards(1)
    expect(Array.isArray(res)).toBe(true)
    expect(res[0].snapshot).toBeUndefined()
  })

  test('getSnapshot returns snapshot object', async () => {
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { whiteBoard: { findUnique: jest.fn().mockResolvedValue({ snapshot: 'snap' }) } } }))
    const { WhiteboardService } = require('../../../src/presentation/services/whiteboard.service')
    const svc = new WhiteboardService()
    const res = await svc.getSnapshot(1)
    expect(res.snapshot).toBe('snap')
  })

  test('createWhiteboard returns created whiteboard', async () => {
    const created = { id: 3, title: 't', description: 'd', ownerId: 1 }
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { whiteBoard: { create: jest.fn().mockResolvedValue(created) } } }))
    const { WhiteboardService } = require('../../../src/presentation/services/whiteboard.service')
    const svc = new WhiteboardService()
    const res = await svc.createWhiteboard({ title: 't', description: 'd', ownerId: 1 })
    expect(res.id).toBe(3)
  })
})
