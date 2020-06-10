import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListService } from './list/list.service';
import { DataService } from './data/data.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ListService, DataService],
})
export class AppModule {}
