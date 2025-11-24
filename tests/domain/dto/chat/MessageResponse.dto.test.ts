describe('MessageResponseDto', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env.WEBSERVICE_URL = 'http://localhost'
  })

  test('builds response from entity without post', () => {
    const { MessageResponseDto } = require('../../../../src/domain/dto/chat/MessageResponse.dto')
    const entity = { id: 1, text: 'hi', status: 's', createdAt: new Date(), fromId: 1, conversationId: 2, postId: null }
    const resp = MessageResponseDto.fromEntity(entity)
    expect(resp.postPreviewUrl).toBeNull()
    expect(resp.id).toBe(1)
  })

  test('builds response with postPreviewUrl when postId present', () => {
    const { MessageResponseDto } = require('../../../../src/domain/dto/chat/MessageResponse.dto')
    const entity = { id: 2, text: null, status: 's', createdAt: new Date(), fromId: 1, conversationId: 2, postId: 9 }
    const resp = MessageResponseDto.fromEntity(entity)
    expect(resp.postPreviewUrl).toBe(`${process.env.WEBSERVICE_URL}/feed/post/9/image`)
  })
})
