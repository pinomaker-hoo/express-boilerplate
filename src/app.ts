import { Application } from 'express'
import express from 'express'
import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'

// ** Util Imports
import morgan from 'morgan'
import cors from 'cors'
import hpp from 'hpp'
import { NODE_ENV, PORT, LOG_FORMAT } from '@config'
import { logger, stream } from '@utils/logger'
import compression from 'compression'
import cookieParser from 'cookie-parser'

// ** Controller Imports
import { CommonController } from '@controllers/common.controller'

const controllers = [CommonController]

const expressApp: Application = createExpressServer({
  controllers: [],
  controllers: controllers,
  middlewares: [
    morgan(LOG_FORMAT, { stream }),
    cors({ origin: '*', credentials: true }),
    hpp(),
    compression(),
    express.json(),
    express.urlencoded({ extended: true }),
    cookieParser(),
  ],
})

const port = PORT ? +PORT : 3000
const env = NODE_ENV || 'development'

expressApp.listen(port, () => {
  logger.info(`=================================`)
  logger.info(`======= ENV: ${env} =======`)
  logger.info(`🚀 App listening on the port ${port}`)
  logger.info(`=================================`)
})
