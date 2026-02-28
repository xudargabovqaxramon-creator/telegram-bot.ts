import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Bot, BotSchema } from "schema/bot.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Bot.name, schema: BotSchema }])],
})

export class BotModule {}