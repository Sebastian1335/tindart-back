import { ConversationEntity } from '../../../src/domain/entities/conversation.entity';

describe('ConversationEntity', () => {
  test('creates entity from values', () => {
    const obj = { id: 1, userOneId: 2, userTwoId: 3, createdAt: new Date() }
    const conv = ConversationEntity.fromObject(obj)
    expect(conv).toBeInstanceOf(ConversationEntity)
    expect(conv.id).toBe(1)
    expect(conv.userOneId).toBe(2)
  })

  test('throws when required fields missing', () => {
    expect(() => ConversationEntity.fromObject({})).toThrow('Missing conversation id')
    expect(() => ConversationEntity.fromObject({ id: 1 })).toThrow('Missing userOneId')
  })
})
