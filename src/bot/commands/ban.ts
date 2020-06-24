import { Command } from '../util/interfaces'; // eslint-disable-line no-unused-vars
import { localize } from '../util/util';
import { Message } from 'discord.js'; // eslint-disable-line no-unused-vars

async function banCommand(message: Message, args: string[]): Promise<Message> {
  const target = message.mentions.members?.first() ?? message.guild!.members.cache.get(args[0]);
  if (!target) return message.reply(localize('error', 'en', 'command', [], 'NO_TARGET'));
  if (target.user.id === message.author.id) return message.reply(localize('error', 'en', 'command', [], 'NOT_BANNABLE_SELF'));
  if (!target.bannable) return message.reply(localize('error', 'en', 'command', [], 'NOT_BANNABLE_ME'));
  if (message.guild!.ownerID !== message.member!.id && target.roles.highest.position >= message.member!.roles.highest.position) {
    return message.reply(localize('error', 'en', 'command', [], 'NOT_BANNABLE'));
  }

  await message.channel.send(localize('dialog', 'en', 'CONFIRM_BAN', [[ '{{MEMBER}}', target.toString() ]]));
  const collected = await message.channel.awaitMessages(m => m.author.id === message.author.id, { errors: ['time'], idle: 10000, max: 1 });
  const confirm = collected.first()?.content?.toLowerCase() || false;
  if (!confirm || ![ 'yes', 'y' ].includes(confirm)) return message.channel.send(localize('dialog', 'en', 'BAN_CANCELLED', []));
  const reason = args.length > 1 ? args.slice(1).join(' ') : false;

  try {
    await target.send(localize('dialog', 'en', 'BAN_DM_MESSAGE', [[ '{{GUILD}}', message.guild!.name ], [ '{{REASON}}', reason ? `.\nReason: \`${reason}\`.` : '.' ]]));
  } finally {
    target.ban({ reason: localize('dialog', 'en', 'BAN_AUDIT_REASON', [[ '{{TAG}}', message.author.tag ], [ '{{REASON}}', reason ? `.\nReason: \`${reason}\`.` : '.' ]]) })
      .catch(err => message.channel.send(err.message));
  }
  return message.channel.send(localize('dialog', 'en', 'BAN_CONFIRM', [[ '{{MEMBER}}', target.toString() ], [ '{{REASON}}', reason ? ` with reason \`${reason}\`.` : '.' ]]));
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