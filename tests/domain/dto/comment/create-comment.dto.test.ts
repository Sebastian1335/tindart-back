describe('CreateCommentDto', () => {
  test('creates DTO with image and valid mime', () => {
    const { CreateCommentDto } = require('../../../../src/domain/dto/comment/create-comment.dto')
    const img = Buffer.from('abc')
    const [err, dto] = CreateCommentDto.create({ authorId: 1, postId: 2, content: 'hey', image: img, imageMimeType: 'image/png' })
    expect(err).toBeUndefined()
    expect(dto).toBeDefined()
    expect(dto.image).toBeInstanceOf(Buffer)
  })

  test('rejects invalid image or mimeType and missing fields', () => {
    const { CreateCommentDto } = require('../../../../src/domain/dto/comment/create-comment.dto')
    expect(CreateCommentDto.create({ authorId: 1, postId: 2 })[0]).toMatch(/no hay titulo/)
    expect(CreateCommentDto.create({ authorId: 1, postId: 2, content: 'ok', image: 'no-buffer' })[0]).toMatch(/imagen invalido/)
    expect(CreateCommentDto.create({ authorId: 1, postId: 2, content: 'ok', image: Buffer.from('a'), imageMimeType: 'bad/type' })[0]).toMatch(/mimeType no permitido/)
  })
})
