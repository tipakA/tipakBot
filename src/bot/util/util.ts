import { CheckedPermissions, Prefix } from './interfaces'; // eslint-disable-line no-unused-vars
import { GuildMember, Message, PermissionString } from 'discord.js'; // eslint-disable-line no-unused-vars
import { promisify } from 'util';
import { permissions as readable } from './constants';
import { readdir } from 'fs';

export const wait = promisify(setTimeout);

export const ls = promisify(readdir);

export function getPrefix(message: Message): Prefix {
  const prefix = 'tr+';

  return {
    prefix,
    type: 'default',
  } as Prefix;
}

export function getPermissions(member: GuildMember | null, permissions: PermissionString[]): CheckedPermissions {
  const res: CheckedPermissions = { missing: [], missingReadable: [] };
  if (!member) return { ...res, _error: 'MEMBER_NULL' };
  if (!permissions.length) return res;

  const missing = member.permissions.missing(permissions);
  for (const p of missing) {
    res.missing.push(p);
    res.missingReadable.push(readable.en[p]);
  }
  return res;
}