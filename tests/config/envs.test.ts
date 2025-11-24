describe('envs', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env.PORT = '3000'
    process.env.JWT_SEED = 'jwt-secret'
    process.env.REFRESH_SEED = 'refresh-secret'
    process.env.MAILER_SERVICE = 'svc'
    process.env.MAILER_EMAIL = 'a@b.com'
    process.env.MAILER_SECRET_KEY = 'key'
    process.env.WEBSERVICE_URL = 'http://localhost'
    // not setting SEND_EMAIL to test default
  })

  test('reads environment variables via envs', () => {
    const { envs } = require('../../src/config/envs')
    expect(envs.PORT).toBe(3000)
    expect(envs.JWT_SEED).toBe('jwt-secret')
    expect(envs.SEND_EMAIL).toBe(false)
  })
})
