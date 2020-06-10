import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ListService } from './list/list.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private listService : ListService) {}

  @Get()
  getHtml(): string {
    return this.listService.getHtml();
  }
  @Get('/json')
  getJson() {
    return this.listService.getJson();
  }
  @Get('/list')
  getList() {
    return this.listService.getLine();
  }
  @Get('/addM')
  addItem() {
    return this.listService.addItem();
  }
}
