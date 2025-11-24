import { CommentEntity } from '../../../src/domain/entities/comment.entity';

describe('CommentEntity', () => {
  test('creates entity with image and like info', () => {
    const obj = {
      id: 10,
      content: 'hi',
      image: 'data',
      postId: 5,
      createdAt: new Date(),
      authorId: 2,
      author: { userName: 'sebas' },
      _count: { LikeComment: 7 },
      LikeComment: [true],
    }

    const comment = CommentEntity.fromObject(obj)
    expect(comment).toBeInstanceOf(CommentEntity)
    expect(comment.id).toBe(10)
    expect(comment.authorName).toBe('sebas')
    expect(comment.image).toBe(`${process.env.WEBSERVICE_URL}/feed/post/10/image`)
    expect(comment.countlikes).toBe(7)
    expect(comment.liked).toBe(true)
  })

  test('throws if missing required fields', () => {
    expect(() => CommentEntity.fromObject({})).toThrow('Missing id')
    expect(() => CommentEntity.fromObject({ id: 1 })).toThrow('Missing content')
  })
})
