describe('CreatePostDto', () => {
  test('creates DTO with valid buffer and mime', () => {
    const { CreatePostDto } = require('../../../../src/domain/dto/post/create-post.dto')
    const img = Buffer.from('img')
    const [err, dto] = CreatePostDto.create({ authorId: 1, title: 't', image: img, imageMimeType: 'image/png', description: 'd', tags: ['a'] })
    expect(err).toBeUndefined()
    expect(dto).toBeDefined()
    expect(dto.image).toBeInstanceOf(Buffer)
  })

  test('rejects invalid image and tags', () => {
    const { CreatePostDto } = require('../../../../src/domain/dto/post/create-post.dto')
    expect(CreatePostDto.create({ authorId: 1, title: 't', image: 'no', imageMimeType: 'image/png', description: 'd', tags: ['a'] })[0]).toMatch(/imagen invalido/)
    expect(CreatePostDto.create({ authorId: 1, title: 't', image: Buffer.from('a'), imageMimeType: 'image/png', description: 'd', tags: 'not-array' })[0]).toMatch(/tags invalido/)
  })
})
