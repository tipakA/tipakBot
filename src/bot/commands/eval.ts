import { Command } from '../util/interfaces'; // eslint-disable-line no-unused-vars
import { inspect } from 'util';
import { Message } from 'discord.js'; // eslint-disable-line no-unused-vars
import tipakBot from '../tipakBot'; // eslint-disable-line no-unused-vars

async function clear(client: tipakBot, input: any) {
  if (input?.constructor.name === 'Promise') input = await input; /* eslint-disable-line no-param-reassign */

  return inspect(input, { depth: 0 })
    .replace(/`/g, '`\u200b')
    .replace(/@/g, '`\u200b')
    .replace(client.token!, '👌😂💯😂😂💯😂👌😂💯💯👌');
}

async function evalCommand(message: Message, args: string[]): Promise<Message> {
  const client = message.client; // eslint-disable-line no-unused-vars
  const code = args.join(' ');
  let cleaned;
  try {
    const evaled = eval(code);
    cleaned = await clear(message.client as tipakBot, evaled);
  } catch (err) {
    cleaned = await clear(message.client as tipakBot, err);
  }
  return message.channel.send(cleaned, { code: 'js' }).catch(() => message);
}

/* eslint-disable sort-keys */
export = {
  run: evalCommand,
  name: 'eval',
  guildOnly: false,
  args: false,
  aliases: [],
  category: 'Hidden',
  ownerOnly: true,
  ownerSilentError: true,
  permissions: [],
} as Command;