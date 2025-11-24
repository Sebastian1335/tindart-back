import { MessageEntity } from '../../../src/domain/entities/message.entity';

describe('MessageEntity', () => {
  test('creates entity with post preview url when post present', () => {
    const obj = {
      id: 2,
      text: 'hello',
      status: 'sent',
      createdAt: new Date(),
      fromId: 1,
      conversationId: 3,
      postId: 9,
      post: { id: 9 },
    }

    const msg = MessageEntity.fromObject(obj)
    expect(msg).toBeInstanceOf(MessageEntity)
    expect(msg.postId).toBe(9)
    expect(msg.postPreviewUrl).toBe(`${process.env.WEBSERVICE_URL}/feed/post/9/image`)
  })

  test('throws when required fields missing', () => {
    expect(() => MessageEntity.fromObject({})).toThrow('Missing id')
    expect(() => MessageEntity.fromObject({ id: 1 })).toThrow('Missing fromId')
  })
})
