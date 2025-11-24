describe('CreateWhiteboardDto', () => {
  test('creates DTO on valid input', () => {
    const { CreateWhiteboardDto } = require('../../../../src/domain/dto/whiteboard/create-whiteboard.dto')
    const [err, dto] = CreateWhiteboardDto.create({ ownerId: 1, title: 't', description: 'd', snapshot: { a: 1 } })
    expect(err).toBeUndefined()
    expect(dto).toBeDefined()
  })

  test('rejects invalid snapshot and missing fields', () => {
    const { CreateWhiteboardDto } = require('../../../../src/domain/dto/whiteboard/create-whiteboard.dto')
    expect(CreateWhiteboardDto.create({ ownerId: 'x', title: 't', description: 'd' })[0]).toMatch(/ownerId/)
    expect(CreateWhiteboardDto.create({ ownerId: 1, title: 't' })[0]).toMatch(/Descripción faltante/)
    expect(CreateWhiteboardDto.create({ ownerId: 1, title: 't', description: 'd', snapshot: 'bad' })[0]).toMatch(/Snapshot inválido/)
  })
})
