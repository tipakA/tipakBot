import { Client, Collection } from 'discord.js';
import { Command, Event } from './util/interfaces'; // eslint-disable-line no-unused-vars
import { ls } from './util/util';
import { Pool } from 'pg';
import { default as Redis } from 'ioredis';
require('dotenv').config();

export default class tipakBot extends Client {
  public constructor() {
    super({
      presence: { activity: { name: 'Yawn, i just woke up ٩(^ᴗ^)۶', type: 'PLAYING' } },
      // All intents
      ws: { intents: 32767 },
    });
  }
  public db = new Pool({
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    password: process.env.DBPASS,
    port: Number(process.env.DBPORT),
    user: process.env.DBUSER,
  });
  public redis = new Redis();
  public commands = new Collection<string, Command>();

  private async _init() {
    console.log('Initializing...');

    const cmdFiles = await ls(`${__dirname}/commands`).then(d => d.filter(f => f.endsWith('.js')));
    console.log(`Loading ${cmdFiles.length} commands...`);
    for (const file of cmdFiles.filter(f => f.endsWith('.js'))) {
      const name = file.split('.')[0];
      if (Number(process.env.DEBUGLEVEL) >= 1) console.log(`Loading command ${name}.`);
      const command: Command = require(`${__dirname}/commands/${name}.js`); // eslint-disable-line global-require
      if (Number(process.env.DEBUGLEVEL) >= 2) console.log(command);
      if (command.initRun) command.initRun(this);
      this.commands.set(command.name, command);
    }

    const evtFiles = await ls(`${__dirname}/events`).then(d => d.filter(f => f.endsWith('.js')));
    console.log(`Loading ${evtFiles.length} events...`);
    for (const file of evtFiles.filter(f => f.endsWith('js'))) {
      const name = file.split('.')[0];
      if (Number(process.env.DEBUGLEVEL) >= 1) console.log(`Loading event ${name}.`);
      const event: Event = require(`${__dirname}/events/${name}.js`); // eslint-disable-line global-require
      if (Number(process.env.DEBUGLEVEL) >= 2) console.log(event);
      this.on(event.type, event.run.bind(null, this));
    }
  }

  public async start() {
    await this._init();
    return this.login(process.env.TOKEN);
  }
}

const client = new tipakBot();
client.start();