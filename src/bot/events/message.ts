import { checkBlacklist, getPermissions, getPrefix, localize } from '../util/util';
import { Event } from '../util/interfaces'; // eslint-disable-line no-unused-vars
import { Message } from 'discord.js'; // eslint-disable-line no-unused-vars
import tipakBot from '../tipakBot'; // eslint-disable-line no-unused-vars

async function messageEvent(client: tipakBot, message: Message) {
  if (message.author.bot) return;
  const prefix = await getPrefix(client, message);
  if (!prefix) return;

  const args = message.content.slice(prefix.prefix.length).split(/ +/);
  const cmd = args.shift()!.toLowerCase();
  const command = client.commands.get(cmd) ?? client.commands.find(c => c.aliases.includes(cmd));
  if (!command) return;

  const blacklisted = await checkBlacklist(client, message.author.id);
  if (blacklisted.blacklisted) {
    if (!blacklisted.notified) return message.reply(localize('error', 'en', 'eventHandler', [], 'USER_BLACKLISTED'));
    return;
  }

  if (message.author.id !== process.env.OWNER && (command.disabled || command.enabledIn?.length || command.disabledIn?.length)) {
    if (command.disabled) return message.channel.send(localize('error', 'en', 'eventHandler', [], 'COMMAND_DISABLED'));
    if (message.channel.type !== 'text') {
      if (command.enabledIn) return message.channel.send(localize('error', 'en', 'eventHandler', [], 'COMMAND_NOT_ENABLED'));
    } else {
      if (command.disabledIn?.includes(message.guild!.id)) return message.channel.send(localize('error', 'en', 'eventHandler', [], 'COMMAND_DISABLED_GUILD'));
      if (!command.enabledIn?.includes(message.guild!.id)) return message.channel.send(localize('error', 'en', 'eventHandler', [], 'COMMAND_NOT_ENABLED_GUILD'));
    }
  }
  if (command.guildOnly && message.channel.type !== 'text') return message.channel.send(localize('error', 'en', 'eventHandler', [], 'GUILD_ONLY'));
  if (command.ownerOnly && message.author.id !== process.env.OWNER) {
    if (command.ownerSilentError) return;
    return message.channel.send(localize('error', 'en', 'eventHandler', [], 'OWNER_ONLY'));
  }
  if (message.author.id !== process.env.OWNER && command.permissions.length) {
    const perms = getPermissions(message.member, command.permissions);
    if (perms._error) {
      console.log('Error while checking permissions', perms._error);
      return message.channel.send([ 'Error while checking permissions:', localize('error', 'en', 'util', [], perms._error) ]);
    }
    if (perms.missing.length) {
      if (command.permissionsSilentError) return;
      return message.channel.send([ localize('error', 'en', 'eventHandler', [], 'NO_PERMS'), `\`${perms.missingReadable.join('`, `')}\`` ]);
    }

  }
  if (command.args && !args.length) return message.channel.send(localize('error', 'en', 'eventHandler', [], 'ARGS_REQUIRED'));

  command.run(message, args);
}

export = {
  run: messageEvent,
  type: 'message',
} as Event;