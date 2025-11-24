import { PostEntity } from '../../../src/domain/entities/post.entity';

describe('PostEntity', () => {
  test('creates entity and builds image url when image present', () => {
    const obj = {
      id: 1,
      title: 'hello',
      image: 'data',
      description: 'desc',
      tags: ['a', 'b'],
      authorId: 2,
      createdAt: new Date(),
    }

    const post = PostEntity.fromObject(obj)
    expect(post).toBeInstanceOf(PostEntity)
    expect(post.id).toBe(1)
    expect(post.title).toBe('hello')
    expect(post.image).toBe(`${process.env.WEBSERVICE_URL}/feed/post/1/image`)
  })

  test('throws on invalid tags', () => {
    expect(() =>
      PostEntity.fromObject({ id: 1, title: 't', description: 'd', tags: 'not-array', authorId: 1 })
    ).toThrow('Missing or invalid tags')
  })
})
