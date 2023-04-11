import 'reflect-metadata'
import { JsonController, Get } from 'routing-controllers'

@JsonController('/auth')
export class CommonController {
  @Get('/loginByPass')
  public async login() {
    return 'Hello'
  }
}
