import { Module } from '@nestjs/common';
import { PoiModule } from './poi/poi.module';

@Module({
  imports: [PoiModule],
})
export class AppModule {}
