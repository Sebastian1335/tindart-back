
import 'dotenv/config'
import {get} from 'env-var'

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    REFRESH_SEED: get('REFRESH_SEED').required().asString(),
    
    SEND_EMAIL: get("SEND_EMAIL").default("false").required().asBool(),
    
    MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
    MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
    MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
    WEBSERVICE_URL: get("WEBSERVICE_URL").required().asString(),

    CORS_LINK: get("CORS_LINK").required().asString()
}