import { WhiteboardController } from '../../../src/presentation/whiteboard/controller'

describe('WhiteboardController', () => {
  const mockService: any = {
    getWhiteboards: jest.fn().mockResolvedValue([]),
    getSnapshot: jest.fn().mockResolvedValue({}),
    createWhiteboard: jest.fn().mockResolvedValue({}),
    updateWhiteboard: jest.fn().mockResolvedValue({}),
  }
  const controller = new WhiteboardController(mockService)
  const makeRes = () => {
    const res: any = {}
    res.status = jest.fn().mockImplementation(()=>res)
    res.json = jest.fn().mockImplementation(()=>res)
    return res
  }

  test('getWhiteboards validates user and calls service', async () => {
    const req: any = { user: { id: '1' } }
    const res = makeRes()
    await controller.getWhiteboards(req, res)
    expect(mockService.getWhiteboards).toHaveBeenCalledWith(1)
  })

  test('getSnapshot validates id', async () => {
    const req: any = { params: { id: 'bad' } }
    const res = makeRes()
    await controller.getSnapshot(req, res)
    expect(res.status).toHaveBeenCalled()
  })
})
