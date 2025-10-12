import { bcryptAdapter } from '../../config/bcrypt.adapter';
import { envs } from '../../config/envs';
import { JwtAdapter } from '../../config/jwt.adapter';
import { CustomError } from '../../domain/errors/custom.error';
import { UserEntity } from '../../domain/entities/user.entitys';
import { LoginUserDto } from '../../domain/dto/auth/login-user.dto';
import { RegisterUserDto } from '../../domain/dto/auth/register-user.dto';
import { EmailService } from './email.service';
import { prisma } from '../../data/postgres'

export class AuthService {
    constructor(
        //DI - EMAIL SERVICE
        private readonly emailService: EmailService
    ){}

    public async registerUser(registerUserDto:RegisterUserDto) {
        const existUser = await prisma.user.findUnique({where: {email: registerUserDto.email}})
        if(existUser) throw CustomError.badRequest('Email already exist')
        try {
            const user = await prisma.user.create({data: {
                email: registerUserDto.email,
                password: bcryptAdapter.hash(registerUserDto.password),
                userName: registerUserDto.name
            }})
            // generar un JWT para mantener la autenticacion del usuario
            const token = await JwtAdapter.generateToken({id: user.id})
            if (!token) throw CustomError.internalServer('Error while creating jwt')

            // Email de confirmacion
            this.sendEmailValidation(user.email)
            const {password, ...userEntity} = UserEntity.fromObject(user)
            return {user: userEntity, token: token}

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    public async loginUser(loginUser: LoginUserDto) {
        //FindONe para verificar si existe
        const user = await prisma.user.findUnique({where: {email: loginUser.email}})
        if (!user) throw CustomError.badRequest('Usuario no resgistrado')
        // if (user.emailValidated === false) throw CustomError.unauthrized('Email no validado')
        const isMatch = bcryptAdapter.compare(loginUser.password!, user.password)
        if (!isMatch) throw CustomError.badRequest('Contraseña incorrecta')
        // isMatch... bcript.compare(123123,asdsfawferwrfwr123)
        const {password, ...info} = UserEntity.fromObject(user)


        const token = await JwtAdapter.generateToken({id: user.id})
        if (!token) throw CustomError.internalServer('Error while creating jwt')
        
        return{
            user: info,
            token: token
        }
    }

    private sendEmailValidation = async (email:string) => {
        const token = await JwtAdapter.generateToken({email});
        if (!token) throw CustomError.internalServer('Error getting token');
        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

        const html = `
        <h1> Validate yout email</h1>
        <p>Click on the following link to validate you email</p>
        <a href="${link}">Validate your email: ${email}</a>
        `;
        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html
        }

        const isSent = await this.emailService.sendEmail(options)
        if (!isSent) throw CustomError.internalServer('Error Sendinf email')
        return true
    }

    public validateEmail = async(token: string) => {
        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw CustomError.unauthrized('invalid token');

        const {email} = payload as {email: string};

        if (!email) throw CustomError.internalServer('Email not in token');

        const user = await prisma.user.findUnique({where: {email}});
        if (!user) throw CustomError.internalServer('Email not exist');

        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                emailValidated: true
            }
        })

        return true
    }
}
