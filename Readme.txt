import { Sequelize } from "sequelize";
export const sequelize = new Sequelize("api_rest_db", "root", "tu_contraseña", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

Instanciar objeto (nombreBase de datos, usuarioDB, contraseña)


npm install -g sequelize-auto //Global, npm

npm install sequelize-auto --save-dev //Local para el proyecto, npx

npx sequelize-auto -h localhost -d api_rest_db -u root -p 3306 -x -e mysql -o "./models" -l esm

Flujo de trabajo
server.js --> routes -->controleres --> services
