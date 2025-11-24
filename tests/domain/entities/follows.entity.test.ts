import { FollowsEntity } from '../../../src/domain/entities/follows.entity';


describe('FollowsEntity', () => {
  test('creates entity from values', () => {
    const obj = { id: 1, idSeguidor: 2, idSeguido: 3 }
    const f = FollowsEntity.fromObject(obj)
    expect(f).toBeInstanceOf(FollowsEntity)
    expect(f.idSeguidor).toBe(2)
  })

  test('throws when required fields missing', () => {
    expect(() => FollowsEntity.fromObject({})).toThrow('Missing id')
    expect(() => FollowsEntity.fromObject({ id: 1 })).toThrow('Missing idSeguidor')
  })
})
