import { Command } from '../util/interfaces'; // eslint-disable-line no-unused-vars
import { localize } from '../util/util';
import { Message } from 'discord.js'; // eslint-disable-line no-unused-vars

async function banCommand(message: Message, args: string[]): Promise<Message> {
  const target = message.mentions.members?.first() ?? message.guild!.members.cache.get(args[0]);
  if (!target) return message.reply(localize('error', 'en', 'command', 'NO_TARGET'));
  if (!target.bannable) return message.reply(localize('error', 'en', 'command', 'NOT_BANNABLE_ME'));
  if (target.user.id === message.author.id) return message.reply(localize('error', 'en', 'command', 'NOT_BANNABLE_SELF'));
  if (message.guild!.ownerID !== message.member!.id && target.roles.highest.position >= message.member!.roles.highest.position) {
    return message.reply(localize('error', 'en', 'command', 'NOT_BANNABLE'));
  }

  await message.channel.send(localize('dialog', 'en', 'CONFIRM_BAN').replace('{{MEMBER}}', target.toString()));
  const collected = await message.channel.awaitMessages(m => m.author.id === message.author.id, { errors: ['time'], idle: 10000, max: 1 });
  const confirm = collected.first()?.content?.toLowerCase() || false;
  if (!confirm || ![ 'yes', 'y' ].includes(confirm)) return message.channel.send(localize('dialog', 'en', 'BAN_CANCELLED'));
  const reason = args.length > 1 ? args.slice(1).join(' ') : false;

  try {
    target.send(`You were banned from server \`${message.guild!.name}\`${reason ? `\nReason: \`${reason}\`` : ''}.`);
  } catch {
    target.ban({ reason: `Banned by ${message.author.tag}${reason ? `: ${reason}` : ''}.` }).catch(err => message.channel.send(err.message));
  }
  return message.channel.send(`User ${target} was banned from the server${reason ? ` with reason \`${reason}\`` : ''}.`);
}

/* eslint-disable sort-keys */
export = {
  run: banCommand,
  name: 'ban',
  guildOnly: true,
  args: true,
  aliases: [],
  category: 'Server Moderation',
  ownerOnly: false,
  permissions: ['BAN_MEMBERS'],
} as Command;