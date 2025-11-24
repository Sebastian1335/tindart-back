describe('UpdateWhiteboardDto', () => {
  test('creates DTO when at least one field provided', () => {
    const { UpdateWhiteboardDto } = require('../../../../src/domain/dto/whiteboard/update-whiteboard.dto')
    const [err, dto] = UpdateWhiteboardDto.create({ title: 'new' })
    expect(err).toBeUndefined()
    expect(dto).toBeDefined()
  })

  test('rejects invalid field types and empty payload', () => {
    const { UpdateWhiteboardDto } = require('../../../../src/domain/dto/whiteboard/update-whiteboard.dto')
    expect(UpdateWhiteboardDto.create({ title: 123 })[0]).toMatch(/inválidos/)
    expect(UpdateWhiteboardDto.create({})[0]).toMatch(/No se envió ningún campo/)
  })
})
