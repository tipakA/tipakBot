import { Message, PermissionString, Snowflake } from 'discord.js'; // eslint-disable-line no-unused-vars
import { permissions } from './constants'; // eslint-disable-line no-unused-vars
import { default as tipakBot } from '../tipakBot'; // eslint-disable-line no-unused-vars

export interface Command {
  run(message: Message, args: string[]): Promise<Message>;
  name: string;
  aliases: string[];
  category: string;
  guildOnly: boolean;
  ownerOnly: boolean;
  ownerSilentError?: boolean;
  permissions: PermissionString[];
  permissionsSilentError?: boolean
  args: boolean;
  disabled?: boolean;
  disabledIn?: Snowflake[];
  enabledIn?: Snowflake[];
  initRun?(client: tipakBot): boolean;
}

export interface CheckedPermissions {
  missing: CheckedPerm[];
  missingReadable: string[];
  _error?: PermError;
}

export type CheckedPerm =
  | 'CREATE_INSTANT_INVITE'
  | 'KICK_MEMBERS'
  | 'BAN_MEMBERS'
  | 'ADMINISTRATOR'
  | 'MANAGE_CHANNELS'
  | 'MANAGE_GUILD'
  | 'ADD_REACTIONS'
  | 'VIEW_AUDIT_LOG'
  | 'PRIORITY_SPEAKER'
  | 'STREAM'
  | 'VIEW_CHANNEL'
  | 'SEND_MESSAGES'
  | 'SEND_TTS_MESSAGES'
  | 'MANAGE_MESSAGES'
  | 'EMBED_LINKS'
  | 'ATTACH_FILES'
  | 'READ_MESSAGE_HISTORY'
  | 'MENTION_EVERYONE'
  | 'USE_EXTERNAL_EMOJIS'
  | 'VIEW_GUILD_INSIGHTS'
  | 'CONNECT'
  | 'SPEAK'
  | 'MUTE_MEMBERS'
  | 'DEAFEN_MEMBERS'
  | 'MOVE_MEMBERS'
  | 'USE_VAD'
  | 'CHANGE_NICKNAME'
  | 'MANAGE_NICKNAMES'
  | 'MANAGE_ROLES'
  | 'MANAGE_WEBHOOKS'
  | 'MANAGE_EMOJIS'

export interface Event {
  run(client: tipakBot, ...args: any[]): any;
  type: EventType;
}

export type EventType =
  | 'ready'
  | 'message';

export type PermError =
  | 'MEMBER_NULL';

export interface Prefix {
  prefix: string;
  type: PrefixType;
}

export type PrefixType =
  | 'default'
  | 'guild'
  | 'user'
  | 'mention';