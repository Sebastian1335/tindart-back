describe('CreateConversationDto', () => {
  test('creates DTO on valid input', () => {
    const { CreateConversationDto } = require('../../../../src/domain/dto/chat/create-conversation.dto')
    const [err, dto] = CreateConversationDto.create({ userOneId: 1, userTwoId: 2 })
    expect(err).toBeUndefined()
    expect(dto).toBeDefined()
    expect(dto.userOneId).toBe(1)
  })

  test('rejects invalid types and same user', () => {
    const { CreateConversationDto } = require('../../../../src/domain/dto/chat/create-conversation.dto')
    expect(CreateConversationDto.create({ userOneId: 'a', userTwoId: 2 })[0]).toMatch(/inválido/)
    expect(CreateConversationDto.create({ userOneId: 1, userTwoId: 1 })[0]).toMatch(/no puede ser contigo mismo/)
  })
})
