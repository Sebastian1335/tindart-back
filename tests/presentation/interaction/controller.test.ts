import { InteractionController } from '../../../src/presentation/interaction/controller'

describe('InteractionController', () => {
  const mockService: any = {
    toggleLikePost: jest.fn().mockResolvedValue({}),
    toggleSavePost: jest.fn().mockResolvedValue({}),
    toggleSharePost: jest.fn().mockResolvedValue({}),
    toggleLikeComment: jest.fn().mockResolvedValue({}),
    toggleFollowUser: jest.fn().mockResolvedValue({}),
  }
  const controller = new InteractionController(mockService)
  const makeRes = () => {
    const res: any = {}
    res.status = jest.fn().mockImplementation(()=>res)
    res.json = jest.fn().mockImplementation(()=>res)
    return res
  }

  test('toggleLikePost validates postId', async () => {
    const req: any = { user: { id: 1 }, params: { postId: 'a' } }
    const res = makeRes()
    await controller.toggleLikePost(req, res)
    expect(res.status).toHaveBeenCalled()
  })

  test('toggleFollowUser validates otherUserId', async () => {
    const req: any = { user: { id: 1 }, params: { userId: '2' } }
    const res = makeRes()
    await controller.toggleFollowUser(req, res)
    expect(mockService.toggleFollowUser).toHaveBeenCalledWith(1, 2)
  })
})
