import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()
export const DB = new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USERNAME,
    process.env.POSTGRES_PASSWORD,
    {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      dialect: process.env.POSTGRES_DIALECT,
    },
)

export default DB
