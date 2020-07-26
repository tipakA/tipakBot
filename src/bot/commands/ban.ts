import { Command } from '../util/interfaces'; // eslint-disable-line no-unused-vars
import { localize } from '../util/util';
import { Message } from 'discord.js'; // eslint-disable-line no-unused-vars

async function banCommand(message: Message, args: string[]): Promise<Message | undefined> {
  const target = message.mentions.members?.first() ?? message.guild!.members.cache.get(args[0]);
  if (!target) return message.reply(localize('error', 'en', 'command', [], 'NO_TARGET'));
  if (target.user.id === message.author.id) return message.reply(localize('error', 'en', 'command', [], 'NOT_BANNABLE_SELF'));
  if (message.guild!.ownerID !== message.member!.id) return message.reply(localize('error', 'en', 'command', [], 'NOT_BANNABLE_OWNER'))
  if (!target.bannable) return message.reply(localize('error', 'en', 'command', [], 'NOT_BANNABLE_ME'));
  if (target.roles.highest.position >= message.member!.roles.highest.position) {
    return message.reply(localize('error', 'en', 'command', [], 'NOT_BANNABLE'));
  }

  await message.channel.send(localize('dialog', 'en', 'CONFIRM_BAN', [[ '{{MEMBER}}', target.toString() ]]));
  const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, { idle: 10000 });

  collector.on('collect', (message: Message) => {
    if ([ 'y', 'yes' ].includes(message.content.toLowerCase())) return collector.stop('confirmed');
    if ([ 'c', 'cancel' ].includes(message.content.toLowerCase())) return collector.stop('cancelled');
  });

  collector.on('end', async (collected, endReason) => {
    if (endReason === 'confirmed') {
      const reason = args.length > 1 ? args.slice(1).join(' ') : false;

      try {
        await target.send(localize('dialog', 'en', 'BAN_DM_MESSAGE', [[ '{{GUILD}}', message.guild!.name ], [ '{{REASON}}', reason ? `.\nReason: \`${reason}\`.` : '.' ]]));
      } catch {}
      finally {
        target.ban({ reason: localize('dialog', 'en', 'BAN_AUDIT_REASON', [[ '{{TAG}}', message.author.tag ], [ '{{REASON}}', reason ? `.\nReason: \`${reason}\`.` : '.' ]]) })
          .catch(err => message.channel.send(err.message));
      }
      return message.channel.send(localize('dialog', 'en', 'BAN_CONFIRM', [[ '{{MEMBER}}', target.toString() ], [ '{{REASON}}', reason ? ` with reason \`${reason}\`.` : '.' ]]));
    }
    if (endReason === 'cancelled') return message.reply(localize('dialog', 'en', 'BAN_CANCELLED', []));
    if (endReason === 'time') return message.reply(localize('dialog', 'en', 'BAN_TIMEOUT', []));
  });
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