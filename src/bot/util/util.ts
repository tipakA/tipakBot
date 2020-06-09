import { promisify } from 'util';
import { readdir } from 'fs';

export const wait = promisify(setTimeout);

export const ls = promisify(readdir);