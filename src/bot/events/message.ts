import { Event } from '../util/interfaces'; // eslint-disable-line no-unused-vars
import { getPrefix } from '../util/util'; // eslint-disable-line no-unused-vars
import { Message } from 'discord.js'; // eslint-disable-line no-unused-vars
import { default as tipakBot } from '../tipakBot'; // eslint-disable-line no-unused-vars

function messageEvent(client: tipakBot, message: Message) {
  if (message.author.bot) return;
  const prefix = getPrefix(message);

  if (!prefix || !message.content.startsWith(prefix.prefix)) return;

  const args = message.content.slice(prefix.prefix.length).split(/ +/);
  const cmd = args.shift()!.toLowerCase();
  const command = client.commands.has(cmd) ? client.commands.get(cmd)! : null;
  if (!command) return;

  command.run(message, args);
}

export = {
  run: messageEvent,
  type: 'message',
} as Event;