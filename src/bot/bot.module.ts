import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BotService } from "./bot.service";
import { BotUser } from "./entity/bot.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BotUser])],
  providers: [BotService],
})
export class BotModule {}