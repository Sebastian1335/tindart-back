import { UserEntity } from '../../../src/domain/entities/user.entitys';
describe("UserEntity", () => {
    const dataUser = {
        id: 1,
        userName: "sebas",
        email: "hola@gmail.com",
        password: "123456",
        createdAt: new Date(),
    }
    test('debe crear un objeto de user', () => {
        const user = new UserEntity(dataUser.id, dataUser.userName, dataUser.email, dataUser.password, dataUser.createdAt);
        expect(user).toBeInstanceOf(UserEntity);
        expect(user.id).toBe(dataUser.id)
        expect(user.email).toBe(dataUser.email)
        expect(user.createdAt).toBe(dataUser.createdAt)
        expect(user.password).toBe(dataUser.password)
    })
    
    test('Debe de crear una instancia desde un obejto', () => {
        const user = UserEntity.fromObject(dataUser);
        expect(user).toBeInstanceOf(UserEntity);
        expect(user.id).toBe(dataUser.id)
        expect(user.email).toBe(dataUser.email)
        expect(user.createdAt).toBe(dataUser.createdAt)
        expect(user.password).toBe(dataUser.password)
    })

    test('Debe arrojar error si no es userName no es valido', () => {
        expect(() => 
                UserEntity.fromObject({
                id: 1,
            })).toThrow('Missing userName')
    })

    test('Debe arrojar error si no es email valido', () => {
        expect(() => 
                UserEntity.fromObject({
                id: 1,
                userName: "Sebastian",
            })).toThrow('Missing email')
    })
    
    test('Debe arrojar error si no es email valido', () => {
        expect(() => 
                UserEntity.fromObject({
                id: 1,
                userName: "Sebastian",
                email: "hola@gmail.com",
            })).toThrow('Missing password')
    })
    test('Debe arrojar error si no es email valido', () => {
        expect(() => 
                UserEntity.fromObject({
            })).toThrow('Missing id')
    })
})