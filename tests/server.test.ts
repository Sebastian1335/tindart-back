describe('should call server with arguments and start', () => {
    test('should work', async () => {
        // Ensure a clean module registry so our mocks/env are applied
        jest.resetModules()

        // Provide required env vars before importing modules that read them
        process.env.PORT = '4000'
        process.env.JWT_SEED = 'test'
        process.env.REFRESH_SEED = 'test'
        process.env.MAILER_SERVICE = 'test'
        process.env.MAILER_EMAIL = 'test@example.com'
        process.env.MAILER_SECRET_KEY = 'secret'
        process.env.WEBSERVICE_URL = 'http://localhost'

        const startMock = jest.fn()
        const ServerMock = jest.fn().mockImplementation(() => ({ start: startMock, server: {} }))

        jest.doMock('../src/server', () => ({ Server: ServerMock }))

        // Import app after mocks and env vars are set so it uses the mocks
        require('../src/app')

        expect(ServerMock).toHaveBeenCalledTimes(1)
        expect(ServerMock).toHaveBeenCalledWith({
            port: Number(process.env.PORT),
            routes: expect.anything(),
        })
        expect(startMock).toHaveBeenCalled()
    })
})