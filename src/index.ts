import dotenv from 'dotenv';
import Discord from 'discord.js';
import pollBot from './structures/client';
import path from 'path';
import fs from 'fs';
const client = new pollBot({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ],
});
dotenv.config();
client.login(process.env.token)
  .catch((err) => {
    console.error(err);
  });
fs.readdirSync(path.join(__dirname, 'events')).forEach((file) => {
  import event = require(`./events/${file}`);
  client.on(event.name, event.run.bind(null, client));
});
fs.readdirSync(path.join(__dirname, 'commands')).forEach((file) => {
  import command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});
