import { Injectable, OnModuleInit } from "@nestjs/common";
import TelegramBot from "node-telegram-bot-api";
import { products } from "../bot/product";

@Injectable()
export class BotService implements OnModuleInit {
  private bot: TelegramBot;

  onModuleInit() {
    this.bot = new TelegramBot(process.env.BOT_TOKEN!, { polling: true });

    // /start
    this.bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;
      const name = msg.from?.first_name;

      await this.bot.sendMessage(chatId, `Salom ${name} 👋`);

      await this.bot.sendMessage(chatId, "📞 Telefon raqamingizni yuboring", {
        reply_markup: {
          keyboard: [[{ text: "📞 Telefon yuborish", request_contact: true }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    });

    // Telefon qabul qilish
    this.bot.on("contact", async (msg) => {
      await this.bot.sendMessage(msg.chat.id, "📍 Lokatsiyangizni yuboring", {
        reply_markup: {
          keyboard: [[{ text: "📍 Lokatsiya yuborish", request_location: true }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    });

    // Location qabul qilish
    this.bot.on("location", async (msg) => {
      await this.bot.sendMessage(msg.chat.id, "Menyuni tanlang", {
        reply_markup: {
          keyboard: [
            [{ text: "Ichimliklar" }],
            [{ text: "Yeguliklar" }],
            [{ text: "Shirinliklar" }],
          ],
          resize_keyboard: true,
        },
      });
    });

    // Kategoriya tanlash
    this.bot.on("message", async (msg) => {
      const chatId = msg.chat.id;
      if (msg.text === "Ichimliklar") {
        this.showProducts(chatId, "drinks");
      }
      if (msg.text === "Yeguliklar") {
        this.showProducts(chatId, "foods");
      }
      if (msg.text === "Shirinliklar") {
        this.showProducts(chatId, "sweets");
      }
    });

    // Buyurtma tugmasi
    this.bot.on("callback_query", async (query) => {
      await this.bot.answerCallbackQuery(query.id, {
        text: "✅ Buyurtma qabul qilindi",
      });
    });
  }

  async showProducts(chatId: number, type: "drinks" | "foods" | "sweets") {
    for (const item of products[type]) {
      await this.bot.sendPhoto(chatId, item.image, {
        caption: `${item.name}\n ${item.price} so'm\n ${item.composition}`,
        reply_markup: {
          inline_keyboard: [
            [{ text: "🛒 Buyurtma berish", callback_data: item.id }],
          ],
        },
      });
    }
  }
}