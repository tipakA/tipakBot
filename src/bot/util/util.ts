import { promisify } from 'util';
import { readdir } from 'fs';
import { Message } from 'discord.js';
import { Prefix } from './interfaces';

export const wait = promisify(setTimeout);

export const ls = promisify(readdir);

export function getPrefix(message: Message)<Prefix> {
  const prefix = 'tr+';
  
  return {
    prefix,
    type: 'default',
  };
}