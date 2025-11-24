describe('RegisterUserDto', () => {
  test('creates DTO on valid input', () => {
    const { RegisterUserDto } = require('../../../../src/domain/dto/auth/register-user.dto')
    const [err, dto] = RegisterUserDto.create({ name: 'sebas', email: 'test@example.com', password: 'secret1' })
    expect(err).toBeUndefined()
    expect(dto).toBeDefined()
    expect(dto.name).toBe('sebas')
  })

  test('rejects missing fields and invalid email', () => {
    const { RegisterUserDto } = require('../../../../src/domain/dto/auth/register-user.dto')
    expect(RegisterUserDto.create({ email: 'a@b.com', password: '123' })[0]).toMatch(/Missing name/)
    expect(RegisterUserDto.create({ name: 'a', password: '123456' })[0]).toMatch(/Missing email/)
    expect(RegisterUserDto.create({ name: 'a', email: 'bad', password: '123456' })[0]).toMatch(/Email is not valid/)
  })
})
