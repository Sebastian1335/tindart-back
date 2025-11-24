import { WhiteBoardEntity } from '../../../src/domain/entities/whiteboard.entity';
describe("whiteboard entity", () => {
    const dataWhiteboard = {
        id: 1,
        title: "hola",
        description: "mundo",
        ownerId: 2,
    }
    test('debe crear un objeto de whiteboard', () => {
        const wb = new WhiteBoardEntity(
            dataWhiteboard.id,
            dataWhiteboard.title,
            dataWhiteboard.description,
            dataWhiteboard.ownerId
        )
        expect(wb).toBeInstanceOf(WhiteBoardEntity)
    })

    test('Debe de crear una instancia desde un obejto', () => {
        const user = WhiteBoardEntity.fromObject(dataWhiteboard);
        expect(user).toBeInstanceOf(WhiteBoardEntity);
        expect(user.id).toBe(dataWhiteboard.id)
        expect(user.title).toBe(dataWhiteboard.title)
        expect(user.description).toBe(dataWhiteboard.description)
        expect(user.ownerId).toBe(dataWhiteboard.ownerId)
    })

    test('Debe arrojar un error si no hay id', () => {
        expect(() => {
            WhiteBoardEntity.fromObject({
                
            })
        }).toThrow("Missing id")
    })
    test('Debe arrojar un error si no hay title', () => {
        expect(() => {
            WhiteBoardEntity.fromObject({
                id: 1
            })
        }).toThrow("Missing title")
    })
    test('Debe arrojar un error si no hay title', () => {
        expect(() => {
            WhiteBoardEntity.fromObject({
                id: 1,
                title: "hola"
            })
        }).toThrow("Missing description")
    })
    test('Debe arrojar un error si no hay title', () => {
        expect(() => {
            WhiteBoardEntity.fromObject({
                id: 1,
                title: "hola",
                description: "mundo"
            })
        }).toThrow("Missing ownerId")
    })
})