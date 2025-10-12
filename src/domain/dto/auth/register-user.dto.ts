import { regularExps } from "../../../config/regular-exp"

export class RegisterUserDto{
    constructor(
        public name: string,
        public email: string,
        public password: string,
    ){}
    static create(object: {[key:string]: any}):[string | undefined, RegisterUserDto | undefined] {
        const {name, email, password} = object
        if(!name) return ['Missing name', undefined]
        if(!email) return ['Missing email', undefined]
        if(!regularExps.email.test(email)) return ['Email is not valid', undefined]
        if (!password) return ['missing password', undefined]
        if (password.length < 6) return ['password too short', undefined]

        return [undefined, new RegisterUserDto(name, email, password)]
    }
}

