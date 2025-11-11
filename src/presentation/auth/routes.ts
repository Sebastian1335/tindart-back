import { Router } from "express";
import { envs } from "../../config/envs";
import { EmailService } from "../services/email.service";
import { AuthService } from "../services/auth.service";
import { AuthController } from "./controller";


export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    
    const emailService = new EmailService(
      envs.MAILER_SERVICE, 
      envs.MAILER_EMAIL, 
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    )

    const authService = new AuthService(emailService)
    const authController = new AuthController(authService)
    // Definir las rutas
    router.post('/login', (req, res) => authController.loginUser(req, res) );
    router.post('/register',  (req, res) => authController.registerUser(req, res));
    router.get('/validate-email/:token',  (req, res) => authController.validateEmail(req, res));
    router.post('/refresh', authController.refreshToken)


    return router;
  }


}