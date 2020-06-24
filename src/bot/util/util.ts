import * as Constants from './constants';
import { BlacklistEntry, CheckedPermissions, Prefix, PrefixOrRegex } from './interfaces'; // eslint-disable-line no-unused-vars
import { GuildMember, Message, PermissionString, Snowflake } from 'discord.js'; // eslint-disable-line no-unused-vars
import { promisify } from 'util';
import { permission as readable } from './constants';
import { readdir } from 'fs';
import tipakBot from '../tipakBot'; // eslint-disable-line no-unused-vars

export const ls = promisify(readdir);

export const wait = promisify(setTimeout);

export async function checkBlacklist(client: tipakBot, id: Snowflake): Promise<BlacklistEntry> {
  if (id === process.env.OWNER) return { id, blacklisted: false }; // eslint-disable-line sort-keys
  const data = await client.redis.get(`UBL:${id}`);
  if (!data) return { id, blacklisted: false }; // eslint-disable-line sort-keys
  await client.redis.set(`UBL:${id}`, 'true');
  return { id, blacklisted: true, notified: data === 'true' }; // eslint-disable-line sort-keys
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

export async function getPrefix(client: tipakBot, message: Message): Promise<Prefix | null> {
  let guildPrefixes: string[], userPrefix: string | null;
  try {
    guildPrefixes = message.channel.type !== 'dm' ? await client.redis.lrange(`g:prefix:${message.guild!.id}`, 0, -1) : [];
    userPrefix = await client.redis.get(`u:prefix:${message.author.id}`);
  } catch (err) {
    console.error('Error@getPrefix:\n', err);
    return null;
  }
  const prefixList: PrefixOrRegex[] = [{ prefix: process.env.PREFIX!, type: 'default' }]; // TODO: Allow to disable default prefix - there's mention.
  const clear = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (guildPrefixes.length) for (const p of guildPrefixes) prefixList.push({ prefix: p, type: 'guild' });
  if (userPrefix) prefixList.push({ prefix: userPrefix, type: 'user' });
  for (let i = 0; i !== prefixList.length; i++) {
    prefixList[i].prefix = new RegExp(`^${clear(prefixList[i].prefix as string)}\\s*`);
  }
  prefixList.push({ prefix: new RegExp(`^<@!?${client.user!.id}>\\s*`), type: 'mention' });
  for (const prefix of prefixList) {
    const match = message.content.match(prefix.prefix);
    if (match) return { prefix: match[0], type: prefix.type };
  }
  return null;
}

export function localize<
    T extends 'error',
    L extends keyof typeof Constants[T],
    S extends keyof typeof Constants[T][L],
    Z extends keyof typeof Constants[T][L][S]
  >(type: T, lang: L, str: S, reps: [string | RegExp, string][], str2: Z): string;
export function localize<
    T extends Exclude<keyof typeof Constants, 'error'>,
    L extends keyof typeof Constants[T],
    S extends keyof typeof Constants[T][L],
    Z extends keyof typeof Constants[T][L][S]
  >(type: T, lang: L, str: S, reps: [string | RegExp, string][], str2?: Z): string;

export function localize<
    T extends keyof typeof Constants,
    L extends keyof typeof Constants[T],
    S extends keyof typeof Constants[T][L],
    Z extends keyof typeof Constants[T][L][S]
  >(type: T, lang: L, str: S, reps: [string | RegExp, string][], str2?: Z) {

  let c = (str2 ? Constants[type][lang][str][str2] : Constants[type][lang][str]) as unknown as string;
  for (const rep of reps) {
    c = c.replace(rep[0], rep[1]);
  }
  return c;
}