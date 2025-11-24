describe('ChatService', () => {
  beforeEach(() => jest.resetModules())

  test('findOrCreateConversation returns existing conversation', async () => {
    const conv = { id: 1, userOneId: 1, userTwoId: 2 }
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { conversation: { findFirst: jest.fn().mockResolvedValue(conv) } } }))
    const { ChatService } = require('../../../src/presentation/services/chat.service')
    const svc = new ChatService()
    const res = await svc.findOrCreateConversation({ userOneId: 1, userTwoId: 2 })
    expect(res).toEqual(conv)
  })

  test('findOrCreateConversation creates when none exists', async () => {
    const conv = { id: 2, userOneId: 3, userTwoId: 4 }
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { conversation: { findFirst: jest.fn().mockResolvedValue(null), create: jest.fn().mockResolvedValue(conv) } } }))
    const { ChatService } = require('../../../src/presentation/services/chat.service')
    const svc = new ChatService()
    const res = await svc.findOrCreateConversation({ userOneId: 3, userTwoId: 4 })
    expect(res).toEqual(conv)
  })

  test('saveMessage throws when conversation missing', async () => {
    jest.doMock('../../../src/data/postgres', () => ({ prisma: { conversation: { findUnique: jest.fn().mockResolvedValue(null) } } }))
    const { ChatService } = require('../../../src/presentation/services/chat.service')
    const svc = new ChatService()
    await expect(svc.saveMessage({ conversationId: 10, fromId: 1, text: 'hi' })).rejects.toThrow()
  })
})
