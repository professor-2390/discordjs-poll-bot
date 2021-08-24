module.exports = {
  name: 'messageCreate',
  run(client, message) {
    if(message.author.bot) return;
    if(message.channel.type == 'DM') return;
    if(!message.content.startsWith('!')) return;
    const args: string[] = message.content.substring('!'.length).split(' ');
    const command: string = args.shift().toLowerCase();
    if(client.commands.has(command)) client.commands.get(command).run(message, args, client);
  }
}