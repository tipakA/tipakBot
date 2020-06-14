import { checkBlacklist, getPermissions, getPrefix } from '../util/util';
import { errors } from '../util/constants';
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
    if (!blacklisted.notified) return message.reply(errors['en'].USER_BLACKLISTED);
    return;
  }

  if (message.author.id !== process.env.OWNER && (command.disabled || command.enabledIn?.length || command.disabledIn?.length)) {
    if (command.disabled) return message.channel.send(errors['en'].COMMAND_DISABLED);
    if (message.channel.type !== 'text') {
      if (command.enabledIn) return message.channel.send(errors['en'].COMMAND_NOT_ENABLED);
    } else {
      if (command.disabledIn?.includes(message.guild!.id)) return message.channel.send(errors['en'].COMMAND_DISABLED_GUILD);
      if (!command.enabledIn?.includes(message.guild!.id)) return message.channel.send(errors['en'].COMMAND_NOT_ENABLED_GUILD);
    }
  }
  if (command.guildOnly && message.channel.type !== 'text') return message.channel.send(errors['en'].GUILD_ONLY);
  if (command.ownerOnly && message.author.id !== process.env.OWNER) {
    if (command.ownerSilentError) return;
    return message.channel.send(errors['en'].OWNER_ONLY);
  }
  if (message.author.id !== process.env.OWNER && command.permissions.length) {
    const perms = getPermissions(message.member, command.permissions);
    if (perms._error) {
      console.log('Error while checking permissions', perms._error);
      if (errors['en'][perms._error]) return message.channel.send([ 'Error while checking permissions:', errors['en'][perms._error] ]);
      return message.channel.send('Unknown error occured.');
    }
    if (perms.missing.length) {
      if (command.permissionsSilentError) return;
      return message.channel.send([ errors['en'].NO_PERMS, `\`${perms.missingReadable.join('`, `')}\`` ]);
    }

  }
  if (command.args && !args.length) return message.channel.send(errors['en'].ARGS_REQUIRED);

  command.run(message, args);
}

export = {
  run: messageEvent,
  type: 'message',
} as Event;