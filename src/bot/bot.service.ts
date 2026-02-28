import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import TelegramBot from "node-telegram-bot-api";
import { Bot, BotDocument } from "schema/bot.schema";

@Injectable()
export class BotService {
    private bot: TelegramBot

    private readonly teacherId: number = Number(process.env.TEACHER_ID as string)
    constructor(@InjectModel(Bot.name) private botModel: Model<BotDocument>) {}
}