import { Message } from 'discord.js'; // eslint-disable-line no-unused-vars
import { Prefix } from './interfaces'; // eslint-disable-line no-unused-vars
import { promisify } from 'util';
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