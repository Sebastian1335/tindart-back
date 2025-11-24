describe('EmailService', () => {
  beforeEach(() => jest.resetModules())

  test('sendEmail returns true when postToProvider is false', async () => {
    const { EmailService } = require('../../../src/presentation/services/email.service')
    const svc = new EmailService('s', 'u', 'p', false)
    const res = await svc.sendEmail({ to: 'a@b.com', subject: 's', htmlBody: '<p>x</p>' })
    expect(res).toBe(true)
  })

  test('sendEmail posts to provider when configured', async () => {
    jest.doMock('nodemailer', () => ({ createTransport: () => ({ sendMail: jest.fn().mockResolvedValue({}) }) }))
    const { EmailService } = require('../../../src/presentation/services/email.service')
    const svc = new EmailService('svc', 'mail', 'pass', true)
    const res = await svc.sendEmail({ to: 'a@b.com', subject: 's', htmlBody: '<p>x</p>' })
    expect(res).toBe(true)
  })
})
