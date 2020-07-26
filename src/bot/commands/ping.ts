import { Command } from '../util/interfaces'; // eslint-disable-line no-unused-vars
import { Message } from 'discord.js'; // eslint-disable-line no-unused-vars

function pingCommand(message: Message, args: string[]): Promise<Message> {
  if (!args.length) return message.channel.send('Pong.');
  return message.channel.send(`Pong, ${args.join()}`);
}

/* eslint-disable sort-keys */
export const command: Command = {
  run: pingCommand,
  name: 'ping',
  guildOnly: false,
  args: false,
  aliases: [],
  category: 'Bot Utility',
  ownerOnly: false,
  permissions: [],
}