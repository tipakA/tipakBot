import { Message, PermissionString, Snowflake } from 'discord.js'; // eslint-disable-line no-unused-vars
import tipakBot from '../tipakBot'; // eslint-disable-line no-unused-vars

export interface BlacklistEntry {
  id: Snowflake;
  blacklisted: boolean;
  notified?: boolean;
}

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
  missing: PermissionString[];
  missingReadable: string[];
  _error?: PermError;
}

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
  _error?: null | string;
}

export interface PrefixOrRegex {
  prefix: string | RegExp;
  type: PrefixType;
}

export type PrefixType =
  | 'default'
  | 'guild'
  | 'user'
  | 'mention';