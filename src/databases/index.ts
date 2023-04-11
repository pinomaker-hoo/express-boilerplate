import {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_PASS,
  DB_USER,
  NODE_ENV,
} from '../config'
import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'

export const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 20,
    min: 1,
    acquire: 3000,
    idle: 10000,
  },
  logging: NODE_ENV === 'development' ? console.log : false,
})

export async function connectDatabase() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: parseInt(DB_PORT),
    user: DB_USER,
    password: DB_PASS,
  })
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\`;`)
  await sequelize
    .sync({ alter: true })
    .then(() => {
      console.log('Synced db')
    })
    .catch((err) => {
      console.error(err)
    })
}
