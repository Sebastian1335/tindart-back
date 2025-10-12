
Copiar el contenido de env.template en un nuevo archivo .env



`docker compose up -d`


Para construir la base de datos usando prisma
`npx prisma migrate dev`


--NO USAR--
`npx prisma migrate dev --name init`

Para usar probar la validación del correo elecrtronico, cambiar la variable de entorno SEND_EMAIL a true,
MAILER_EMAIL va tu correo, MAILER_SECRET_KEY tu contraseña de aplicacion de gmail (myaccount.google.com/apppasswords)(tienes que tener activado la verificación en dos pasos).