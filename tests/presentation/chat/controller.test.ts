import { ChatController } from '../../../src/presentation/chat/controller'

describe('ChatController', () => {
  const mockService: any = {
    getConversationsByUser: jest.fn().mockResolvedValue([]),
    findOrCreateConversation: jest.fn().mockResolvedValue({ id: 1 }),
    getMessages: jest.fn().mockResolvedValue([]),
    getUserContacts: jest.fn().mockResolvedValue([]),
  }

  const controller = new ChatController(mockService)
  const makeRes = () => {
    const res: any = {}
    res.status = jest.fn().mockImplementation(()=>res)
    res.json = jest.fn().mockImplementation(()=>res)
    return res
  }

  test('getConversationPerUser validates user id and calls service', async () => {
    const req: any = { user: { id: '1' } }
    const res = makeRes()
    await controller.getConversationPerUser(req, res)
    expect(mockService.getConversationsByUser).toHaveBeenCalledWith(1)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test('createConversation handles invalid userTwoId', async () => {
    const req: any = { user: { id: '1' }, params: { userId: 'bad' } }
    const res = makeRes()
    await controller.createConversation(req, res)
    expect(res.status).toHaveBeenCalled()
  })
})
