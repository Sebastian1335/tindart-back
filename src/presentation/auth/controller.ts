import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginUserDto } from "../../domain/dto/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dto/auth/register-user.dto";
import { CustomError } from "../../domain/errors/custom.error";

export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})
        }
        console.log(`${error}`)
        return res.status(500).json({error: typeof error == "string" ? error : 'Internal Server Error'})
    }
    
    registerUser = (req: Request, res: Response) => {
        if (req.body == undefined) return this.handleError("not body provided" ,res)
        const [error, registerDto] = RegisterUserDto.create(req.body)
        if (error) return res.status(400).json({error})
        
        this.authService.registerUser(registerDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res))
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginDto] = LoginUserDto.create(req.body)
        if(error) return res.status(400).json({error})
        
        this.authService.loginUser(loginDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res))
    }

    validateEmail = (req: Request, res: Response) => {
        const {token} = req.params;
        if (!token) res.status(400).json({error: "token not provided"})
        this.authService.validateEmail(token!)
            .then(() => res.json('email validated'))
            .catch(error => this.handleError(error, res))
    }

}