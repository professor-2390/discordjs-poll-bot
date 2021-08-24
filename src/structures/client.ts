import Discord from 'discord.js';
import command from '../interfaces/command';
export default class pollBot extends Discord.Client {
  public commands: Discord.Collection<string, command> = new Discord.Collection();
}