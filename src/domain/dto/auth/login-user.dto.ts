import { regularExps } from "../../../config/regular-exp"

export class LoginUserDto{
    constructor(
        public email: string,
        public password: string,
    ){}

    static create(object: {[key:string]: any}): [string | undefined, LoginUserDto | undefined] {
        const {email, password} = object
        if(!email) return ['Missing email', undefined]
        if(!regularExps.email.test(email)) return ['Email is not valid', undefined]
        if (!password) return ['missing password', undefined]
        if (password.length < 6) return ['password too short', undefined]

        return [undefined, new LoginUserDto(email, password)]
    }
}