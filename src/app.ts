import { Application } from 'express'
import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'

const expressApp: Application = createExpressServer({
  controllers: [],
})

expressApp.listen(3000, () => {
  console.log('SERVER ON!')
})
