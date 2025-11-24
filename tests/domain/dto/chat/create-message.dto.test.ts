describe('CreateMessageDto', () => {
  test('creates DTO with text', () => {
    const { CreateMessageDto } = require('../../../../src/domain/dto/chat/create-message.dto')
    const [err, dto] = CreateMessageDto.create({ fromId: 1, conversationId: 2, text: 'hi' })
    expect(err).toBeUndefined()
    expect(dto).toBeDefined()
    expect(dto.text).toBe('hi')
  })

  test('creates DTO with postId and no text', () => {
    const { CreateMessageDto } = require('../../../../src/domain/dto/chat/create-message.dto')
    const [err, dto] = CreateMessageDto.create({ fromId: 1, conversationId: 2, postId: 5 })
    expect(err).toBeUndefined()
    expect(dto.postId).toBe(5)
  })

  test('rejects when neither text nor postId provided', () => {
    const { CreateMessageDto } = require('../../../../src/domain/dto/chat/create-message.dto')
    expect(CreateMessageDto.create({ fromId: 1, conversationId: 2 })[0]).toMatch(/debe tener texto o un postId/)
  })
})
