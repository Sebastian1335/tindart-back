describe('FileUploadMiddleware', () => {
  beforeEach(() => jest.resetModules())

  test('containFiles returns 400 when no files', () => {
    const { FileUploadMiddleware } = require('../../../src/presentation/middlewares/file-upload.middleware')
    const req: any = { files: undefined, body: {} }
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    const next = jest.fn()
    FileUploadMiddleware.containFiles(req, res, next)
    expect(res.status).toHaveBeenCalledWith(400)
  })

  test('containFiles normalizes single file to body.files and calls next', () => {
    const { FileUploadMiddleware } = require('../../../src/presentation/middlewares/file-upload.middleware')
    const file = { data: Buffer.from('a'), mimetype: 'image/png' }
    const req: any = { files: { file }, body: {} }
    const res: any = {}
    const next = jest.fn()
    FileUploadMiddleware.containFiles(req, res, next)
    expect(Array.isArray(req.body.files)).toBe(true)
    expect(next).toHaveBeenCalled()
  })

  test('optionalFiles calls next when no files', () => {
    const { FileUploadMiddleware } = require('../../../src/presentation/middlewares/file-upload.middleware')
    const req: any = { files: undefined, body: {} }
    const res: any = {}
    const next = jest.fn()
    FileUploadMiddleware.optionalFiles(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
