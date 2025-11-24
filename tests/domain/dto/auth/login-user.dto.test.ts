describe('LoginUserDto', () => {
  test('creates DTO on valid input', () => {
    const { LoginUserDto } = require('../../../../src/domain/dto/auth/login-user.dto')
    const [err, dto] = LoginUserDto.create({ email: 'test@example.com', password: 'secret1' })
    expect(err).toBeUndefined()
    expect(dto).toBeDefined()
    expect(dto.email).toBe('test@example.com')
  })

  test('rejects invalid email and short password', () => {
    const { LoginUserDto } = require('../../../../src/domain/dto/auth/login-user.dto')
    expect(LoginUserDto.create({ password: 'secret1' })[0]).toMatch(/Missing email/)
    expect(LoginUserDto.create({ email: 'bad', password: 'secret1' })[0]).toMatch(/Email is not valid/)
    expect(LoginUserDto.create({ email: 'a@b.com', password: '123' })[0]).toMatch(/password too short/)
  })
})
