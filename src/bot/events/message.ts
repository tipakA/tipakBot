import { Message } from 'discord.js';
import { Event } from '../util/interfaces';
import { getPrefix } from '../util/util';
import ( default as tipakBot ) from '../tipakBot';

function messageEvent(client: tipakBot, message: Message) {
  if (message.author.bot) return;
  const prefix = getPrefix(message);
  if (!prefix || !message.content.startsWith(prefix.prefix)) return;
  
  const args = message.content.slice(prefix.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  
  if (command === 'ping') return message.channel.send('pong');
}

export = {
  run: messageEvent,
  type: 'message',
} as Event;