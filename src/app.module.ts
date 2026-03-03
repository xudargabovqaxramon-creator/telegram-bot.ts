import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BotModule } from "./bot/bot.module";
import { BotUser } from "./bot/entity/bot.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "0888",
      database: "telegram_bot",
      entities: [BotUser],
      synchronize: true, // dev only
    }),
    BotModule,
  ],
})
export class AppModule {}