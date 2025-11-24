import { ProfileController } from '../../../src/presentation/profile/controller'

describe('ProfileController', () => {
  const mockService: any = {
    getPortafolio: jest.fn().mockResolvedValue({ posts: [], total: 0 }),
    getLikedPosts: jest.fn().mockResolvedValue({ posts: [], total: 0 }),
    getSavedPosts: jest.fn().mockResolvedValue({ posts: [], total: 0 }),
    getProfileInfo: jest.fn().mockResolvedValue({}),
  }
  const controller = new ProfileController(mockService)
  const makeRes = () => {
    const res: any = {}
    res.status = jest.fn().mockImplementation(()=>res)
    res.json = jest.fn().mockImplementation(()=>res)
    return res
  }

  test('getPortafolio returns paginated response', async () => {
    const req: any = { user: { id: 1 }, query: {} }
    const res = makeRes()
    await controller.getPortafolio(req, res)
    expect(mockService.getPortafolio).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test('getProfileInfo validates id', async () => {
    const req: any = { params: { id: 'x' } }
    const res = makeRes()
    await controller.getProfileInfo(req, res)
    expect(res.status).toHaveBeenCalled()
  })
})
