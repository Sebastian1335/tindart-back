import express, { Router } from 'express'
import fileUpload from 'express-fileupload'  

interface Options {
    port: number,
    routes: Router
}


export class Server{
    private app = express()
    private serverListener?: any;
    private readonly port: number
    private readonly routes: Router
    constructor(options: Options){
        const {port, routes} = options
        this.port = port
        this.routes = routes
    }
    async start() {

        //* Middlewares
        this.app.use(express.json())
        this.app.use( express.urlencoded({ extended: true }) ); 
        this.app.use(fileUpload({
            limits: {fileSize: 150 * 1024 * 1024}
        }))
        //* Routes
        this.app.use(this.routes)


        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on ${this.port}`);
        })
    }
}