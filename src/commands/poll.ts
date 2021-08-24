import Discord from 'discord.js';
import emojis from '../utility/emojis';
import ms from 'ms';
module.exports = {
  name: 'poll',
  run: async(message, args, client) => {
    const time: string = args[0];
    const options: string[] = args.slice(1).join(' ').split('+');
    if(!/^[0-9]*s?|m|h|d|w/g.test(time) || !time) return;
    if(!options || options.length <= 2 || options.length >= 11) return;
    options.forEach((element, value) => {
      if(element.length == 0 || !/\S/g.test(element)) options[value] = null;
    });
    if(options.filter((element) => element !== null).length <= 2) return;
    const pollEmbed = new Discord.MessageEmbed()
      .setDescription(`**Title: ** ${options[0]}`)
      .setFooter(`Started by ${message.author.tag}`, message.member.user.displayAvatarURL());
    options.slice(1).forEach((element, value) => {
      pollEmbed.addField(`Option ${value + 1}.)`, `${element}`, true);
    });
    const sendPollEmbed = await message.channel.send({embeds: [pollEmbed]});
    options.slice(1).forEach((element, value) => {
      sendPollEmbed.react(emojis[value]);
    });
    setTimeout(async() => {
      const resultsEmbed = new Discord.MessageEmbed()
        .setDescription(`**Title: ** ${options[0]}`)
        .setFooter(`Started by ${message.author.tag}`, message.member.user.displayAvatarURL());
      options.slice(1).forEach((element, value) => {
        resultsEmbed.addField(`${value + 1}.) ${element}`, `${sendPollEmbed.reactions.cache.get(emojis[value]).count - 1} vote(s)`, true);
      });
      await sendPollEmbed.edit({embeds: [resultsEmbed]});
    }, ms(time) + (options.slice(1).length * 1000));
  }
}