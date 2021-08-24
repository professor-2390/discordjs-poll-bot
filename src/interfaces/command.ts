import Discord from 'discord.js';
import pollBot from '../structures/client';
export default interface command {
  name: string;
  run(message: Discord.Message, args: string[], client: pollBot): void;
}