const User = require('../src/models/user');

describe('user tests', () => {
    it('hashear', () => {
        const user = new User();
        var result = user.hashear('cliente1').length
        expect(result).toBe(60)
    })

    it('compararPW', () => {
        const user = new User();
        user.password = "$2a$10$f1qOIzh.wiLR47FqBvba.uGXxjEqayTdcwJU/ZohpX4rwR5T3R8qi"
        var result = user.compararPW('cliente1')
        expect(result).toBe(true)
    })
})