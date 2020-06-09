import { Message, PermissionString } from 'discord.js'; // eslint-disable-line no-unused-vars
import { default as tipakBot } from '../tipakBot'; // eslint-disable-line no-unused-vars

export interface Command {
  run(message: Message, args: string[]): Promise<Message>;
  name: string;
  aliases: string[];
  category: string;
  guildOnly: boolean;
  ownerOnly: boolean;
  permissions: PermissionString[];
  args: boolean;
  disabled?: boolean;
  initRun?(client: tipakBot): boolean;
}

export interface Event {
  run(client: tipakBot, ...args: any[]): any;
  type: EventType
}

export type EventType =
  | 'ready';