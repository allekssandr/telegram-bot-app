import {Telegraf} from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

export const Bot = new Telegraf(process.env.BOT_TOKEN);

export default Bot;
