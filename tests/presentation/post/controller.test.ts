import { PostController } from '../../../src/presentation/post/controller'

describe('PostController', () => {
  const mockService: any = {
    uploadPost: jest.fn().mockResolvedValue({ id: 1 }),
    getFeed: jest.fn().mockResolvedValue({ posts: [], total: 0 }),
    getPostDetails: jest.fn().mockResolvedValue({}),
    createComment: jest.fn().mockResolvedValue({}),
    getImage: jest.fn().mockResolvedValue({ mimeType: 'image/png', image: Buffer.from('a') }),
  }
  const controller = new PostController(mockService)
  const makeRes = () => {
    const res: any = {}
    res.status = jest.fn().mockImplementation(()=>res)
    res.json = jest.fn().mockImplementation(()=>res)
    res.set = jest.fn()
    res.send = jest.fn()
    return res
  }

  test('getFeedPost returns data', async () => {
    const req: any = { query: {} }
    const res = makeRes()
    await controller.getFeedPost(req, res)
    expect(mockService.getFeed).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test('getImage validates id and returns image', async () => {
    const req: any = { params: { id: '5' } }
    const res = makeRes()
    await controller.getImage(req, res)
    expect(mockService.getImage).toHaveBeenCalledWith(5)
    expect(res.set).toHaveBeenCalled()
  })
})
