import { Application } from 'express'
import express from 'express'
import 'reflect-metadata'
import {
  createExpressServer,
  getMetadataArgsStorage,
} from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

// ** Util Imports
import morgan from 'morgan'
import cors from 'cors'
import hpp from 'hpp'
import { NODE_ENV, PORT, LOG_FORMAT } from '@config'
import { logger, stream } from '@utils/logger'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import { connectDatabase } from '@databases'
import * as swaggerUi from 'swagger-ui-express'

// ** Controller Imports
import CommonController from '@controllers/common.controller'

const controllers = [CommonController]

const expressApp: Application = createExpressServer({
  routePrefix: '/api',
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

const storage = getMetadataArgsStorage()
const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
})

const swaggerFile = routingControllersToSpec(
  storage,
  { routePrefix: '/api' },
  {
    components: {
      schemas: schemas as any,
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
)

swaggerFile.info = {
  title: 'Express API',
  version: '1.0.0',
  description: 'Express API Docs',
}

expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

connectDatabase().catch((err) => {
  logger.error('Connect database error: ' + err)
})

const port = PORT ? +PORT : 3000
const env = NODE_ENV || 'development'

expressApp.listen(port, () => {
  logger.info(`=================================`)
  logger.info(`======= ENV: ${env} =======`)
  logger.info(`🚀 App listening on the port ${port}`)
  logger.info(`=================================`)
})
