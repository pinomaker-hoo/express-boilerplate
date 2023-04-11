import 'reflect-metadata'
import { JsonController, Get } from 'routing-controllers'

// ** Service Imports
import CommonService from '@/services/common.service'

@JsonController('/auth')
export default class CommonController {
  private _service = new CommonService()

  @Get('/loginByPass')
  public async login() {
    return 'Hello'
  }
}
